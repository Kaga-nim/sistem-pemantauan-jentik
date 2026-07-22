"use client";

import { useEffect, useState } from "react";

interface Wilayah {
  id: string;
  nama: string;
  deskripsi: string | null;
  lat: number;
  lng: number;
}

const EMPTY_FORM = { nama: "", deskripsi: "", lat: "-6.2000", lng: "106.8166" };

export default function WilayahPage() {
  const [list, setList] = useState<Wilayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Wilayah | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    fetch("/api/wilayah")
      .then((r) => r.json())
      .then((d) => setList(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setError("");
    setShowModal(true);
  };

  const openEdit = (w: Wilayah) => {
    setEditing(w);
    setForm({ nama: w.nama, deskripsi: w.deskripsi || "", lat: String(w.lat), lng: String(w.lng) });
    setError("");
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    const url = editing ? `/api/wilayah/${editing.id}` : "/api/wilayah";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, lat: parseFloat(form.lat), lng: parseFloat(form.lng) }),
    });

    if (res.ok) {
      setShowModal(false);
      load();
    } else {
      const d = await res.json();
      setError(d.error || "Gagal menyimpan.");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, nama: string) => {
    if (!confirm(`Hapus wilayah "${nama}"? Semua titik dan konfirmasi terkait akan ikut terhapus.`)) return;
    await fetch(`/api/wilayah/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Wilayah</h1>
          <p className="text-gray-500 text-sm mt-1">Daftar wilayah/area yang terdaftar</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg text-sm"
        >
          + Tambah Wilayah
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Memuat...</div>
        ) : list.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            Belum ada wilayah. Tambahkan wilayah pertama.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Nama Wilayah</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden md:table-cell">Deskripsi</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden lg:table-cell">Koordinat</th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map((w) => (
                <tr key={w.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-800">{w.nama}</td>
                  <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{w.deskripsi || "-"}</td>
                  <td className="px-5 py-3 text-gray-400 font-mono text-xs hidden lg:table-cell">
                    {w.lat}, {w.lng}
                  </td>
                  <td className="px-5 py-3 text-right space-x-2">
                    <a
                      href={`https://www.google.com/maps?q=${w.lat},${w.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline text-xs"
                    >
                      📍 Maps
                    </a>
                    <button
                      onClick={() => openEdit(w)}
                      className="text-blue-600 hover:underline text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(w.id, w.nama)}
                      className="text-red-500 hover:underline text-xs"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {editing ? "Edit Wilayah" : "Tambah Wilayah"}
            </h2>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Wilayah *</label>
                <input
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  placeholder="cth: RT 01/RW 05"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <input
                  value={form.deskripsi}
                  onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                  placeholder="cth: Kelurahan Menteng, Jakarta Pusat"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input
                    value={form.lat}
                    onChange={(e) => setForm({ ...form, lat: e.target.value })}
                    placeholder="-6.2000"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input
                    value={form.lng}
                    onChange={(e) => setForm({ ...form, lng: e.target.value })}
                    placeholder="106.8166"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400">
                Cari koordinat di{" "}
                <a href="https://maps.google.com" target="_blank" className="text-blue-500 underline">
                  Google Maps
                </a>{" "}
                → klik lokasi → salin lat,lng
              </p>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.nama}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-2 rounded-lg text-sm font-medium"
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
