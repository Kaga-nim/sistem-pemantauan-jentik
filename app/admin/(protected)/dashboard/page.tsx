"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { labelMinggu } from "@/lib/utils";

interface Konfirmasi {
  id: string;
  nama_warga: string;
  tanggal_konfirmasi: string;
  wilayah: { nama: string } | null;
  detail_konfirmasi: { ada_jentik: boolean }[];
}

const INTERVAL_MS = 30_000; // refresh setiap 30 detik

export default function DashboardPage() {
  const [data, setData] = useState<Konfirmasi[]>([]);
  const [minggu, setMinggu] = useState(0);
  const [tahun, setTahun] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [secondsAgo, setSecondsAgo] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
    try {
      const res = await fetch("/api/laporan");
      const json = await res.json();
      setData(json.data || []);
      setMinggu(json.minggu);
      setTahun(json.tahun);
      setLastUpdated(new Date());
      setSecondsAgo(0);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Fetch awal
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh setiap 30 detik
  useEffect(() => {
    timerRef.current = setInterval(() => fetchData(), INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [fetchData]);

  // Counter "X detik lalu"
  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsAgo((s) => s + 1);
    }, 1000);
    return () => clearInterval(tick);
  }, [lastUpdated]);

  const totalKonfirmasi = data.length;
  const totalJentik = data.reduce((acc, k) => acc + k.detail_konfirmasi.filter((d) => d.ada_jentik).length, 0);
  const adaJentikCount = data.filter((k) => k.detail_konfirmasi.some((d) => d.ada_jentik)).length;

  const updatedLabel = lastUpdated
    ? secondsAgo < 5
      ? "Baru diperbarui"
      : secondsAgo < 60
      ? `${secondsAgo} detik lalu`
      : `${Math.floor(secondsAgo / 60)} menit lalu`
    : "";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          {minggu > 0 && (
            <p className="text-gray-500 text-sm mt-1">{labelMinggu(minggu, tahun)}</p>
          )}
        </div>

        {/* Status realtime */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="flex items-center gap-1.5 justify-end">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-green-600 font-medium">Live</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{updatedLabel}</p>
          </div>
          <button
            onClick={() => fetchData(true)}
            disabled={isRefreshing}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
            title="Refresh manual"
          >
            <svg
              className={`w-4 h-4 text-gray-500 ${isRefreshing ? "animate-spin" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon="📋" label="Total Konfirmasi" value={loading ? "..." : String(totalKonfirmasi)} color="blue" />
        <StatCard icon="🦟" label="Laporan Ada Jentik" value={loading ? "..." : String(adaJentikCount)} color="red" />
        <StatCard icon="📍" label="Total Titik Berjentik" value={loading ? "..." : String(totalJentik)} color="orange" />
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-700">Konfirmasi Terbaru Minggu Ini</h2>
          {isRefreshing && (
            <span className="text-xs text-gray-400 animate-pulse">Memperbarui...</span>
          )}
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">Memuat...</div>
        ) : data.length === 0 ? (
          <div className="p-8 text-center text-gray-400">Belum ada konfirmasi minggu ini.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Warga</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Wilayah</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Jentik</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.slice(0, 10).map((k) => {
                  const jentikCount = k.detail_konfirmasi.filter((d) => d.ada_jentik).length;
                  return (
                    <tr key={k.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 font-medium text-gray-800">{k.nama_warga}</td>
                      <td className="px-5 py-3 text-gray-600">{k.wilayah?.nama || "-"}</td>
                      <td className="px-5 py-3">
                        {jentikCount > 0 ? (
                          <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                            🦟 {jentikCount} titik
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                            ✓ Bersih
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-gray-400">
                        {new Date(k.tanggal_konfirmasi).toLocaleString("id-ID", {
                          day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        Data diperbarui otomatis setiap 30 detik
      </p>
    </div>
  );
}

function StatCard({ icon, label, value, color }: {
  icon: string; label: string; value: string; color: "blue" | "red" | "orange";
}) {
  const colors = { blue: "bg-blue-50 border-blue-200", red: "bg-red-50 border-red-200", orange: "bg-orange-50 border-orange-200" };
  return (
    <div className={`rounded-xl border p-5 ${colors[color]}`}>
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}
