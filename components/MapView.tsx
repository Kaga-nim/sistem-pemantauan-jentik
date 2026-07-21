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

function getMarkerColor(w: WilayahData): string {
  if (w.total_konfirmasi === 0) return "#9ca3af";   // abu — belum lapor
  if (w.total_jentik === 0) return "#16a34a";        // hijau — bersih
  if (w.total_jentik <= 2) return "#ea580c";         // oranye — sedikit
  return "#dc2626";                                  // merah — banyak
}

function createIcon(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24S24 21 24 12C24 5.4 18.6 0 12 0z" fill="${color}"/>
    <circle cx="12" cy="12" r="5" fill="white"/>
  </svg>`;
  return L.divIcon({
    html: svg,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -38],
    className: "",
  });
}

function popupHtml(w: WilayahData): string {
  const statusHtml =
    w.total_konfirmasi === 0
      ? `<p style="color:#9ca3af;font-size:11px;margin-top:4px">Belum ada laporan minggu ini</p>`
      : w.total_jentik > 0
      ? `<p style="color:#dc2626;font-weight:600;font-size:12px;margin-top:4px">🦟 ${w.total_jentik} titik berjentik dari ${w.total_konfirmasi} laporan</p>`
      : `<p style="color:#16a34a;font-size:12px;margin-top:4px">✓ Bersih — ${w.total_konfirmasi} laporan</p>`;

  return `
    <div style="min-width:160px;font-family:sans-serif">
      <p style="font-weight:700;color:#1f2937;margin:0">${w.nama}</p>
      ${w.deskripsi ? `<p style="color:#6b7280;font-size:11px;margin:2px 0 0">${w.deskripsi}</p>` : ""}
      ${statusHtml}
    </div>`;
}

export default function MapView({ data }: { data: WilayahData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Inisialisasi map sekali — cleanup saat unmount
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [-6.2, 106.8166],
      zoom: 12,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, []);

  // Update marker setiap kali data berubah
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Hapus marker lama
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (data.length === 0) return;

    const latLngs: L.LatLng[] = [];

    for (const w of data) {
      const marker = L.marker([w.lat, w.lng], { icon: createIcon(getMarkerColor(w)) })
        .bindPopup(popupHtml(w))
        .addTo(map);
      markersRef.current.push(marker);
      latLngs.push(L.latLng(w.lat, w.lng));
    }

    map.fitBounds(L.latLngBounds(latLngs), { padding: [40, 40], maxZoom: 14 });
  }, [data]);

  return (
    <div
      ref={containerRef}
      style={{ height: "100%", width: "100%" }}
      className="rounded-xl"
    />
  );
}
