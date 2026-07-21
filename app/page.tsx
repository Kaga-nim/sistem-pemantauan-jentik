"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Wilayah {
  id: string;
  nama: string;
}

export default function HomePage() {
  const router = useRouter();
  const [wilayahList, setWilayahList] = useState<Wilayah[]>([]);
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [wilayahId, setWilayahId] = useState("");
  const [loading, setLoading] = useState(false);
  const [validasi, setValidasi] = useState({ nama: "", alamat: "" });
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    fetch("/api/wilayah")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setWilayahList(data);
        else setFetchError("Gagal memuat data wilayah.");
      })
      .catch(() => setFetchError("Gagal terhubung ke server."));
  }, []);

  const validate = () => {
    const err = { nama: "", alamat: "" };
    const namaTrim = nama.trim();
    if (namaTrim.length < 2) err.nama = "Nama minimal 2 karakter.";
    else if (namaTrim.length > 100) err.nama = "Nama maksimal 100 karakter.";
    else if (!/^[\w\s'.,-]+$/i.test(namaTrim)) err.nama = "Nama mengandung karakter tidak valid.";

    const alamatTrim = alamat.trim();
    if (alamatTrim.length > 200) err.alamat = "Alamat maksimal 200 karakter.";
    else if (alamatTrim && /<|>|script/i.test(alamatTrim)) err.alamat = "Alamat mengandung karakter tidak valid.";

    setValidasi(err);
    return !err.nama && !err.alamat;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !wilayahId) return;
    setLoading(true);
    router.push(
      `/konfirmasi?nama=${encodeURIComponent(nama.trim())}&wilayah_id=${wilayahId}&alamat=${encodeURIComponent(alamat.trim())}`
    );
  };

  const wilayahTerpilih = wilayahList.find((w) => w.id === wilayahId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Jentik Monitor</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Pemantauan jentik nyamuk mingguan warga
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">Konfirmasi Mingguan</h2>
          <p className="text-sm text-gray-400 mb-5">
            Periksa titik-titik rawan di rumah Anda dan laporkan hasilnya.
          </p>

          {fetchError && (
            <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mb-4">{fetchError}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => { setNama(e.target.value); setValidasi((v) => ({ ...v, nama: "" })); }}
                placeholder="Masukkan nama Anda"
                required
                maxLength={100}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-400 ${validasi.nama ? "border-red-400 bg-red-50" : "border-gray-200"}`}
              />
              {validasi.nama && <p className="text-red-500 text-xs mt-1">{validasi.nama}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alamat / No. Rumah <span className="text-gray-400 font-normal">(opsional)</span>
              </label>
              <input
                type="text"
                value={alamat}
                onChange={(e) => { setAlamat(e.target.value); setValidasi((v) => ({ ...v, alamat: "" })); }}
                placeholder="cth: Jl. Melati No. 5"
                maxLength={200}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-400 ${validasi.alamat ? "border-red-400 bg-red-50" : "border-gray-200"}`}
              />
              {validasi.alamat && <p className="text-red-500 text-xs mt-1">{validasi.alamat}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wilayah Tempat Tinggal <span className="text-red-400">*</span>
              </label>
              <select
                value={wilayahId}
                onChange={(e) => setWilayahId(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 bg-white"
              >
                <option value="">-- Pilih Wilayah --</option>
                {wilayahList.map((w) => (
                  <option key={w.id} value={w.id}>{w.nama}</option>
                ))}
              </select>
              {wilayahList.length === 0 && !fetchError && (
                <p className="text-xs text-gray-400 mt-1">Memuat daftar wilayah...</p>
              )}
            </div>

            {wilayahTerpilih && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700">
                Anda akan mengisi konfirmasi untuk wilayah{" "}
                <strong>{wilayahTerpilih.nama}</strong>.
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !nama.trim() || !wilayahId || !!validasi.nama || !!validasi.alamat}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
            >
              {loading ? "Memuat..." : "Mulai Konfirmasi →"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Sudah pernah konfirmasi minggu ini?{" "}
          <span className="text-green-600">Data lama akan tetap tersimpan.</span>
        </p>

        <div className="text-center mt-3">
          <a href="/admin" className="text-xs text-gray-400 hover:text-gray-600 underline">
            Masuk sebagai Admin
          </a>
        </div>
      </div>
    </div>
  );
}
