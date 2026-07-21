"use client";

import { useEffect, useState, useCallback } from "react";
import { getISOWeek, labelMinggu } from "@/lib/utils";

interface Wilayah { id: string; nama: string; }
interface DetailKonfirmasi {
  id: string;
  ada_jentik: boolean;
  catatan: string | null;
  titik: { id: string; nama: string } | null;
}
interface Konfirmasi {
  id: string;
  nama_warga: string;
  alamat: string | null;
  tanggal_konfirmasi: string;
  catatan: string | null;
  wilayah: { id: string; nama: string } | null;
  detail_konfirmasi: DetailKonfirmasi[];
}

export default function LaporanPage() {
  const now = new Date();
  const { week: thisWeek, year: thisYear } = getISOWeek(now);

  const [wilayahList, setWilayahList] = useState<Wilayah[]>([]);
  const [filterMinggu, setFilterMinggu] = useState(thisWeek);
  const [filterTahun, setFilterTahun] = useState(thisYear);
  const [filterWilayah, setFilterWilayah] = useState("");
  const [data, setData] = useState<Konfirmasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("/api/wilayah").then((r) => r.json()).then((d) => setWilayahList(Array.isArray(d) ? d : []));
  }, []);

  const load = useCallback(() => {
    setLoading(true);
    setExpanded(null);
    let url = `/api/laporan?minggu=${filterMinggu}&tahun=${filterTahun}&page=${page}`;
    if (filterWilayah) url += `&wilayah_id=${filterWilayah}`;
    fetch(url)
      .then((r) => r.json())
      .then((res) => {
        setData(res.data || []);
        setTotalPages(res.totalPages || 1);
        setTotal(res.total || 0);
      })
      .finally(() => setLoading(false));
  }, [filterMinggu, filterTahun, filterWilayah, page]);

  useEffect(() => { load(); }, [load]);

  // Reset ke page 1 saat filter berubah
  const applyFilter = (fn: () => void) => {
    setPage(1);
    fn();
  };

  const exportExcel = async () => {
    // Untuk export, ambil semua data tanpa paginasi
    setLoading(true);
    let url = `/api/laporan?minggu=${filterMinggu}&tahun=${filterTahun}&page=1`;
    if (filterWilayah) url += `&wilayah_id=${filterWilayah}`;

    // Ambil semua halaman
    const allData: Konfirmasi[] = [];
    let currentPage = 1;
    let pages = 1;

    do {
      const res = await fetch(`/api/laporan?minggu=${filterMinggu}&tahun=${filterTahun}&page=${currentPage}${filterWilayah ? `&wilayah_id=${filterWilayah}` : ""}`);
      const json = await res.json();
      allData.push(...(json.data || []));
      pages = json.totalPages || 1;
      currentPage++;
    } while (currentPage <= pages);

    setLoading(false);

    const { utils, writeFile } = await import("xlsx");
    const rows: (string | number | boolean)[][] = [
      ["No", "Nama Warga", "Alamat", "Wilayah", "Titik Pemeriksaan", "Ada Jentik", "Catatan Titik", "Catatan Umum", "Tanggal Konfirmasi"],
    ];

    let no = 1;
    for (const k of allData) {
      if (k.detail_konfirmasi.length === 0) {
        rows.push([no++, k.nama_warga, k.alamat || "", k.wilayah?.nama || "", "", "", "", k.catatan || "", new Date(k.tanggal_konfirmasi).toLocaleString("id-ID")]);
      } else {
        for (const d of k.detail_konfirmasi) {
          rows.push([no++, k.nama_warga, k.alamat || "", k.wilayah?.nama || "", d.titik?.nama || "", d.ada_jentik ? "Ya" : "Tidak", d.catatan || "", k.catatan || "", new Date(k.tanggal_konfirmasi).toLocaleString("id-ID")]);
        }
      }
    }

    const ws = utils.aoa_to_sheet(rows);
    ws["!cols"] = [{ wch: 5 }, { wch: 20 }, { wch: 25 }, { wch: 20 }, { wch: 25 }, { wch: 12 }, { wch: 25 }, { wch: 25 }, { wch: 20 }];
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Laporan");
    writeFile(wb, `laporan-jentik-minggu${filterMinggu}-${filterTahun}.xlsx`);
  };

  const mingguOptions = Array.from({ length: 52 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i * 7);
    const { week, year } = getISOWeek(d);
    return { week, year, label: labelMinggu(week, year) };
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Laporan Mingguan</h1>
          <p className="text-gray-500 text-sm mt-1">
            {loading ? "Memuat..." : `${total} konfirmasi ditemukan`}
          </p>
        </div>
        <button
          onClick={exportExcel}
          disabled={total === 0 || loading}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          📥 Export Excel
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5 flex flex-wrap gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Periode Minggu</label>
          <select
            value={`${filterMinggu}-${filterTahun}`}
            onChange={(e) => {
              const [w, y] = e.target.value.split("-");
              applyFilter(() => { setFilterMinggu(parseInt(w)); setFilterTahun(parseInt(y)); });
            }}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {mingguOptions.map((m) => (
              <option key={`${m.week}-${m.year}`} value={`${m.week}-${m.year}`}>{m.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Wilayah</label>
          <select
            value={filterWilayah}
            onChange={(e) => applyFilter(() => setFilterWilayah(e.target.value))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Semua Wilayah</option>
            {wilayahList.map((w) => (
              <option key={w.id} value={w.id}>{w.nama}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Memuat data...</div>
        ) : data.length === 0 ? (
          <div className="p-8 text-center text-gray-400">Tidak ada data untuk filter ini.</div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Warga</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium hidden lg:table-cell">Alamat</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Wilayah</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Hasil</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium hidden md:table-cell">Waktu</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((k) => {
                  const jentikCount = k.detail_konfirmasi.filter((d) => d.ada_jentik).length;
                  const isExpanded = expanded === k.id;
                  return (
                    <>
                      <tr key={k.id} className="hover:bg-gray-50">
                        <td className="px-5 py-3 font-medium text-gray-800">{k.nama_warga}</td>
                        <td className="px-5 py-3 text-gray-500 hidden lg:table-cell">{k.alamat || "-"}</td>
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
                        <td className="px-5 py-3 text-gray-400 hidden md:table-cell">
                          {new Date(k.tanggal_konfirmasi).toLocaleString("id-ID", {
                            day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                          })}
                        </td>
                        <td className="px-5 py-3">
                          <button
                            onClick={() => setExpanded(isExpanded ? null : k.id)}
                            className="text-blue-500 hover:underline text-xs"
                          >
                            {isExpanded ? "Tutup" : "Lihat"}
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr key={`${k.id}-detail`}>
                          <td colSpan={5} className="px-5 py-3 bg-gray-50">
                            <div className="text-xs text-gray-600 space-y-1">
                              {k.detail_konfirmasi.map((d) => (
                                <div key={d.id} className="flex items-center gap-2">
                                  <span className={d.ada_jentik ? "text-red-500" : "text-green-600"}>
                                    {d.ada_jentik ? "🦟" : "✓"}
                                  </span>
                                  <span className="font-medium">{d.titik?.nama}</span>
                                  {d.catatan && <span className="text-gray-400">— {d.catatan}</span>}
                                </div>
                              ))}
                              {k.catatan && <p className="text-gray-400 mt-1 italic">Catatan: {k.catatan}</p>}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-sm">
                <p className="text-gray-400">
                  Halaman {page} dari {totalPages} ({total} total)
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                    className="px-2 py-1 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                  >
                    «
                  </button>
                  <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 1}
                    className="px-3 py-1 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                  >
                    ‹ Prev
                  </button>
                  {/* Nomor halaman */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                    const p = start + i;
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-3 py-1 rounded text-sm ${p === page ? "bg-green-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page === totalPages}
                    className="px-3 py-1 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                  >
                    Next ›
                  </button>
                  <button
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                    className="px-2 py-1 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
