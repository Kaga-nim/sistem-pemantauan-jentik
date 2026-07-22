"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface WilayahData {
  id: string;
  nama: string;
  deskripsi: string | null;
  lat: number;
  lng: number;
  total_konfirmasi: number;
  total_jentik: number;
}

type Status = "danger" | "warning" | "clean" | "none";

function getStatus(w: WilayahData): Status {
  if (w.total_konfirmasi === 0) return "none";
  if (w.total_jentik === 0) return "clean";
  if (w.total_jentik <= 2) return "warning";
  return "danger";
}

const STATUS_COLOR: Record<Status, { fill: string; border: string; text: string }> = {
  danger:  { fill: "#fee2e2", border: "#ef4444", text: "#dc2626" },
  warning: { fill: "#ffedd5", border: "#f97316", text: "#ea580c" },
  clean:   { fill: "#dcfce7", border: "#22c55e", text: "#16a34a" },
  none:    { fill: "#f3f4f6", border: "#9ca3af", text: "#6b7280" },
};

function createCircleIcon(w: WilayahData) {
  const status = getStatus(w);
  const { fill, border } = STATUS_COLOR[status];
  const isPulse = status === "danger";

  // Label singkat di dalam lingkaran
  const label =
    status === "none" ? "?" :
    status === "clean" ? "✓" :
    String(w.total_jentik);

  const pulse = isPulse
    ? `<span style="
        position:absolute;inset:0;border-radius:50%;
        border:2px solid ${border};
        animation:jentik-ping 1.4s ease-out infinite;
        opacity:0;
      "></span>`
    : "";

  const html = `
    <div style="position:relative;width:36px;height:36px">
      ${pulse}
      <div style="
        position:absolute;inset:0;
        background:${fill};
        border:2.5px solid ${border};
        border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        font-size:13px;font-weight:700;color:${border};
        box-shadow:0 2px 6px rgba(0,0,0,.15);
        font-family:sans-serif;
      ">${label}</div>
    </div>`;

  return L.divIcon({
    html,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -22],
    className: "",
  });
}

function popupHtml(w: WilayahData): string {
  const status = getStatus(w);
  const { border, text } = STATUS_COLOR[status];

  const statusLine =
    status === "none"
      ? `<span style="color:#9ca3af">Belum ada laporan minggu ini</span>`
      : status === "clean"
      ? `<span style="color:#16a34a">✓ Bersih · ${w.total_konfirmasi} laporan</span>`
      : `<span style="color:${text};font-weight:600">🦟 ${w.total_jentik} titik jentik · ${w.total_konfirmasi} laporan</span>`;

  return `
    <div style="min-width:170px;font-family:system-ui,sans-serif;line-height:1.4">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
        <div style="width:10px;height:10px;border-radius:50%;background:${border};flex-shrink:0"></div>
        <span style="font-weight:700;color:#111827;font-size:13px">${w.nama}</span>
      </div>
      ${w.deskripsi ? `<p style="color:#6b7280;font-size:11px;margin:0 0 4px 16px">${w.deskripsi}</p>` : ""}
      <p style="margin:0 0 6px 16px;font-size:12px">${statusLine}</p>
      <a
        href="https://www.google.com/maps?q=${w.lat},${w.lng}"
        target="_blank"
        rel="noopener noreferrer"
        style="
          display:inline-flex;align-items:center;gap:4px;
          margin-left:16px;font-size:11px;color:#2563eb;text-decoration:none;
          background:#eff6ff;border:1px solid #bfdbfe;border-radius:5px;
          padding:3px 8px;font-weight:500;
        "
      >📍 Buka Google Maps</a>
    </div>`;
}

// Inject keyframes sekali
function injectStyles() {
  if (document.getElementById("jentik-map-styles")) return;
  const style = document.createElement("style");
  style.id = "jentik-map-styles";
  style.textContent = `
    @keyframes jentik-ping {
      0%   { transform: scale(1);   opacity: .6; }
      100% { transform: scale(2.2); opacity: 0;  }
    }
    .leaflet-popup-content-wrapper {
      border-radius: 10px !important;
      box-shadow: 0 4px 16px rgba(0,0,0,.12) !important;
      padding: 0 !important;
    }
    .leaflet-popup-content {
      margin: 12px 14px !important;
    }
    .leaflet-popup-tip-container { margin-top: -1px; }
  `;
  document.head.appendChild(style);
}

export default function MapView({ data }: { data: WilayahData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    injectStyles();

    const map = L.map(containerRef.current, {
      center: [-6.2, 106.8166],
      zoom: 12,
      zoomControl: true,
    });

    // CartoDB Positron — bersih, minimalis, kontras tinggi
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }
    ).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (data.length === 0) return;

    const latLngs: L.LatLng[] = [];

    // Urutkan: danger di atas (render terakhir = tampil paling depan)
    const sorted = [...data].sort((a, b) => {
      const order: Record<Status, number> = { none: 0, clean: 1, warning: 2, danger: 3 };
      return order[getStatus(a)] - order[getStatus(b)];
    });

    for (const w of sorted) {
      const marker = L.marker([w.lat, w.lng], {
        icon: createCircleIcon(w),
        zIndexOffset: getStatus(w) === "danger" ? 1000 : 0,
      })
        .bindPopup(popupHtml(w), { maxWidth: 220 })
        .addTo(map);

      markersRef.current.push(marker);
      latLngs.push(L.latLng(w.lat, w.lng));
    }

    if (latLngs.length === 1) {
      map.setView(latLngs[0], 14);
    } else {
      map.fitBounds(L.latLngBounds(latLngs), { padding: [50, 50], maxZoom: 15 });
    }
  }, [data]);

  return (
    <div
      ref={containerRef}
      style={{ height: "100%", width: "100%" }}
      className="rounded-xl"
    />
  );
}
