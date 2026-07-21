"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function SuksesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const nama = searchParams.get("nama") || "";
  const wilayah = searchParams.get("wilayah") || "";
  const minggu = searchParams.get("minggu") || "";
  const tahun = searchParams.get("tahun") || "";
  const jentik = parseInt(searchParams.get("jentik") || "0");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm text-center">
        {/* Ikon sukses */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-5">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Konfirmasi Terkirim!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Terima kasih, <strong>{nama}</strong>. Laporan Anda telah berhasil disimpan.
        </p>

        {/* Ringkasan */}
        <div className="bg-white rounded-2xl shadow-md p-5 text-left space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Wilayah</span>
            <span className="font-medium text-gray-800">{wilayah}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Periode</span>
            <span className="font-medium text-gray-800">Minggu {minggu}, {tahun}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Titik ada jentik</span>
            <span className={`font-bold ${jentik > 0 ? "text-red-500" : "text-green-600"}`}>
              {jentik > 0 ? `${jentik} titik` : "Tidak ada ✓"}
            </span>
          </div>
        </div>

        {jentik > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-5 text-sm text-orange-700">
            <strong>Ditemukan jentik!</strong> Segera kuras/bersihkan tempat yang tergenang dan taburkan
            abate jika diperlukan. Petugas kesehatan akan ditindaklanjuti.
          </div>
        )}

        <button
          onClick={() => router.push("/")}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}

export default function SuksesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Memuat...</p></div>}>
      <SuksesContent />
    </Suspense>
  );
}
