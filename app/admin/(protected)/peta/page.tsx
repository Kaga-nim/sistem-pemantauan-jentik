"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { getISOWeek, labelMinggu } from "@/lib/utils";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

interface WilayahData {
  id: string;
  nama: string;
  deskripsi: string | null;
  lat: number;
  lng: number;
  total_konfirmasi: number;
  total_jentik: number;
}

export default function PetaPage() {
  const { week: thisWeek, year: thisYear } = getISOWeek(new Date());
  const [filterMinggu, setFilterMinggu] = useState(thisWeek);
  const [filterTahun, setFilterTahun] = useState(thisYear);
  const [data, setData] = useState<WilayahData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/peta?minggu=${filterMinggu}&tahun=${filterTahun}`)
      .then((r) => r.json())
      .then((res) => setData(res.data || []))
      .finally(() => setLoading(false));
  }, [filterMinggu, filterTahun]);

  const mingguOptions = Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i * 7);
    const { week, year } = getISOWeek(d);
    return { week, year, label: labelMinggu(week, year) };
  });

  const alertList = useMemo(
    () => data.filter((w) => w.total_jentik > 0).sort((a, b) => b.total_jentik - a.total_jentik),
    [data]
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Peta Sebaran Jentik</h1>
          <p className="text-gray-500 text-sm mt-1">{labelMinggu(filterMinggu, filterTahun)}</p>
        </div>
        <select
          value={`${filterMinggu}-${filterTahun}`}
          onChange={(e) => {
            const [w, y] = e.target.value.split("-");
            setFilterMinggu(parseInt(w));
            setFilterTahun(parseInt(y));
          }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {mingguOptions.map((m) => (
            <option key={`${m.week}-${m.year}`} value={`${m.week}-${m.year}`}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Peta */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div style={{ height: "520px" }}>
            {loading ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-sm">Memuat peta...</p>
                </div>
              </div>
            ) : (
              <MapView data={data} />
            )}
          </div>
        </div>

        {/* Panel kanan */}
        <div className="space-y-4">
          {/* Legenda */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h3 className="font-semibold text-gray-700 mb-3 text-sm">Legenda</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                <span className="text-gray-600">Banyak jentik (&gt; 2 titik)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500 shrink-0" />
                <span className="text-gray-600">Ada jentik (1-2 titik)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-600 shrink-0" />
                <span className="text-gray-600">Bersih (tidak ada jentik)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-400 shrink-0" />
                <span className="text-gray-600">Belum ada laporan</span>
              </div>
            </div>
          </div>

          {/* Alert */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h3 className="font-semibold text-gray-700 mb-3 text-sm flex items-center gap-1">
              🚨 Wilayah Perlu Tindak Lanjut
            </h3>
            {alertList.length === 0 ? (
              <p className="text-sm text-green-600">✓ Tidak ada wilayah berisiko minggu ini.</p>
            ) : (
              <div className="space-y-2">
                {alertList.map((w) => (
                  <div key={w.id} className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="font-medium text-red-700 text-sm">{w.nama}</p>
                    <p className="text-xs text-red-500 mt-0.5">
                      {w.total_jentik} titik berjentik dari {w.total_konfirmasi} laporan
                    </p>
                    <a
                      href={`https://www.google.com/maps?q=${w.lat},${w.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-xs text-blue-600 bg-white border border-blue-200 rounded px-2 py-1 hover:bg-blue-50 transition-colors"
                    >
                      📍 Buka Google Maps
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Semua wilayah */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h3 className="font-semibold text-gray-700 mb-3 text-sm">Rekap Wilayah</h3>
            <div className="space-y-2">
              {data.map((w) => (
                <div key={w.id} className="flex justify-between items-center text-sm py-1 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700 truncate flex-1">{w.nama}</span>
                  <span className={`text-xs font-medium ml-2 shrink-0 ${
                    w.total_jentik > 0 ? "text-red-500" : w.total_konfirmasi > 0 ? "text-green-600" : "text-gray-400"
                  }`}>
                    {w.total_konfirmasi === 0 ? "Belum lapor" : w.total_jentik > 0 ? `🦟 ${w.total_jentik}` : "✓ Bersih"}
                  </span>
                </div>
              ))}
              {data.length === 0 && (
                <p className="text-sm text-gray-400">Belum ada wilayah terdaftar.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
