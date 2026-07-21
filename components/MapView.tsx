"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet default icon di Next.js
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface WilayahData {
  id: string;
  nama: string;
  deskripsi: string | null;
  lat: number;
  lng: number;
  total_konfirmasi: number;
  total_jentik: number;
}

function getMarkerColor(w: WilayahData): string {
  if (w.total_konfirmasi === 0) return "gray";
  if (w.total_jentik === 0) return "green";
  if (w.total_jentik <= 2) return "orange";
  return "red";
}

function createColorIcon(color: string) {
  const colors: Record<string, string> = {
    gray: "#9ca3af",
    green: "#16a34a",
    orange: "#ea580c",
    red: "#dc2626",
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24S24 21 24 12C24 5.4 18.6 0 12 0z" fill="${colors[color] || colors.gray}"/>
    <circle cx="12" cy="12" r="5" fill="white"/>
  </svg>`;
  return L.divIcon({
    html: svg,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
    className: "",
  });
}

function AutoFitBounds({ data }: { data: WilayahData[] }) {
  const map = useMap();
  useEffect(() => {
    if (data.length === 0) return;
    const bounds = L.latLngBounds(data.map((w) => [w.lat, w.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [data, map]);
  return null;
}

export default function MapView({ data }: { data: WilayahData[] }) {
  const center: [number, number] = data.length > 0
    ? [data[0].lat, data[0].lng]
    : [-6.2, 106.8166];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      className="rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AutoFitBounds data={data} />
      {data.map((w) => (
        <Marker
          key={w.id}
          position={[w.lat, w.lng]}
          icon={createColorIcon(getMarkerColor(w))}
        >
          <Popup>
            <div className="text-sm min-w-[160px]">
              <p className="font-bold text-gray-800 mb-1">{w.nama}</p>
              {w.deskripsi && <p className="text-gray-500 text-xs mb-2">{w.deskripsi}</p>}
              <div className="space-y-0.5">
                <p>Total konfirmasi: <strong>{w.total_konfirmasi}</strong></p>
                <p className={w.total_jentik > 0 ? "text-red-600 font-medium" : "text-green-600"}>
                  Titik ada jentik: <strong>{w.total_jentik}</strong>
                </p>
              </div>
              {w.total_jentik === 0 && w.total_konfirmasi > 0 && (
                <p className="text-green-600 text-xs mt-1">✓ Bersih minggu ini</p>
              )}
              {w.total_konfirmasi === 0 && (
                <p className="text-gray-400 text-xs mt-1">Belum ada laporan minggu ini</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
