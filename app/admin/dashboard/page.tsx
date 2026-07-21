"use client";

import { useEffect, useState } from "react";
import { labelMinggu } from "@/lib/utils";

interface Konfirmasi {
  id: string;
  nama_warga: string;
  tanggal_konfirmasi: string;
  wilayah: { nama: string } | null;
  detail_konfirmasi: { ada_jentik: boolean }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<Konfirmasi[]>([]);
  const [minggu, setMinggu] = useState(0);
  const [tahun, setTahun] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/laporan")
      .then((r) => r.json())
      .then((res) => {
        setData(res.data || []);
        setMinggu(res.minggu);
        setTahun(res.tahun);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalKonfirmasi = data.length;
  const totalJentik = data.reduce((acc, k) => acc + k.detail_konfirmasi.filter((d) => d.ada_jentik).length, 0);
  const adaJentikCount = data.filter((k) => k.detail_konfirmasi.some((d) => d.ada_jentik)).length;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        {minggu > 0 && (
          <p className="text-gray-500 text-sm mt-1">{labelMinggu(minggu, tahun)}</p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon="📋"
          label="Total Konfirmasi"
          value={loading ? "..." : String(totalKonfirmasi)}
          color="blue"
        />
        <StatCard
          icon="🦟"
          label="Laporan Ada Jentik"
          value={loading ? "..." : String(adaJentikCount)}
          color="red"
        />
        <StatCard
          icon="📍"
          label="Total Titik Berjentik"
          value={loading ? "..." : String(totalJentik)}
          color="orange"
        />
      </div>

      {/* Tabel terbaru */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">Konfirmasi Terbaru Minggu Ini</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-400">Memuat...</div>
        ) : data.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            Belum ada konfirmasi minggu ini.
          </div>
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
                    <tr key={k.id} className="hover:bg-gray-50">
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
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: string;
  color: "blue" | "red" | "orange";
}) {
  const colors = {
    blue: "bg-blue-50 border-blue-200",
    red: "bg-red-50 border-red-200",
    orange: "bg-orange-50 border-orange-200",
  };
  return (
    <div className={`rounded-xl border p-5 ${colors[color]}`}>
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}
