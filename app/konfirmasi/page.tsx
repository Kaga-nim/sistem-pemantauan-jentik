"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Titik {
  id: string;
  nama: string;
  deskripsi: string | null;
}

interface DetailState {
  titik_id: string;
  ada_jentik: boolean;
  catatan: string;
}

function KonfirmasiForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const nama = searchParams.get("nama") || "";
  const wilayahId = searchParams.get("wilayah_id") || "";
  const [wilayahNama, setWilayahNama] = useState("");
  const [titikList, setTitikList] = useState<Titik[]>([]);
  const [detail, setDetail] = useState<DetailState[]>([]);
  const [catatan, setCatatan] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!nama || !wilayahId) {
      router.push("/");
      return;
    }

    // Ambil nama wilayah + titik sekaligus
    Promise.all([
      fetch("/api/wilayah").then((r) => r.json()),
      fetch(`/api/titik?wilayah_id=${wilayahId}`).then((r) => r.json()),
    ])
      .then(([wilayahData, titikData]) => {
        if (Array.isArray(wilayahData)) {
          const w = wilayahData.find((x: { id: string; nama: string }) => x.id === wilayahId);
          if (w) setWilayahNama(w.nama);
        }
        if (Array.isArray(titikData)) {
          setTitikList(titikData);
          setDetail(titikData.map((t: Titik) => ({ titik_id: t.id, ada_jentik: false, catatan: "" })));
        } else {
          setError("Tidak ada titik pemeriksaan untuk wilayah ini. Hubungi admin.");
        }
      })
      .catch(() => setError("Gagal memuat data. Coba lagi."))
      .finally(() => setLoading(false));
  }, [nama, wilayahId, router]);

  const updateDetail = (titikId: string, field: keyof DetailState, value: boolean | string) => {
    setDetail((prev) =>
      prev.map((d) => (d.titik_id === titikId ? { ...d, [field]: value } : d))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/konfirmasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama_warga: nama, wilayah_id: wilayahId, catatan, detail }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan konfirmasi.");

      router.push(
        `/konfirmasi/sukses?nama=${encodeURIComponent(nama)}&wilayah=${encodeURIComponent(wilayahNama)}&minggu=${data.minggu}&tahun=${data.tahun}&jentik=${detail.filter((d) => d.ada_jentik).length}`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Memuat titik pemeriksaan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="bg-green-600 text-white px-4 py-5 sticky top-0 z-10 shadow">
        <div className="max-w-xl mx-auto">
          <button onClick={() => router.push("/")} className="text-green-200 text-sm mb-1 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali
          </button>
          <h1 className="text-lg font-bold">{wilayahNama || "Konfirmasi"}</h1>
          <p className="text-green-100 text-sm">Halo, <strong>{nama}</strong> — tandai setiap titik yang diperiksa</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 mt-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-4 text-sm">{error}</div>
        )}

        {titikList.length === 0 && !error ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-center">
            <p className="text-yellow-700 font-medium">Belum ada titik pemeriksaan</p>
            <p className="text-yellow-600 text-sm mt-1">Admin belum mendaftarkan titik untuk wilayah ini.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-sm text-gray-500 mb-4">
              Periksa setiap lokasi berikut di rumah Anda dan tandai apakah ditemukan jentik.
            </p>

            <div className="space-y-3">
              {titikList.map((titik, idx) => {
                const d = detail.find((x) => x.titik_id === titik.id);
                if (!d) return null;
                return (
                  <div
                    key={titik.id}
                    className={`bg-white rounded-xl border-2 p-4 transition-colors ${
                      d.ada_jentik ? "border-red-300 bg-red-50" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          <span className="text-gray-400 text-sm mr-1">{idx + 1}.</span> {titik.nama}
                        </p>
                        {titik.deskripsi && (
                          <p className="text-sm text-gray-400 mt-0.5">{titik.deskripsi}</p>
                        )}
                      </div>
                      {/* Toggle */}
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateDetail(titik.id, "ada_jentik", !d.ada_jentik)}
                          className={`w-14 h-7 rounded-full relative transition-colors ${
                            d.ada_jentik ? "bg-red-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                              d.ada_jentik ? "translate-x-8" : "translate-x-1"
                            }`}
                          />
                        </button>
                        <span className={`text-xs font-medium ${d.ada_jentik ? "text-red-500" : "text-gray-400"}`}>
                          {d.ada_jentik ? "Ada Jentik" : "Tidak Ada"}
                        </span>
                      </div>
                    </div>

                    {d.ada_jentik && (
                      <div className="mt-3">
                        <input
                          type="text"
                          placeholder="Catatan (opsional)..."
                          value={d.catatan}
                          onChange={(e) => updateDetail(titik.id, "catatan", e.target.value)}
                          className="w-full text-sm px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400 bg-white"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Catatan umum */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Catatan Umum (opsional)
              </label>
              <textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Tambahkan catatan jika ada..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Ringkasan */}
            <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4 flex justify-between text-sm">
              <div>
                <p className="text-gray-500">Total titik diperiksa</p>
                <p className="font-bold text-gray-800 text-lg">{titikList.length}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Titik ada jentik</p>
                <p className={`font-bold text-lg ${detail.filter((d) => d.ada_jentik).length > 0 ? "text-red-500" : "text-green-600"}`}>
                  {detail.filter((d) => d.ada_jentik).length}
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || titikList.length === 0}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {submitting ? "Menyimpan..." : "Kirim Konfirmasi"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function KonfirmasiPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Memuat...</p></div>}>
      <KonfirmasiForm />
    </Suspense>
  );
}
