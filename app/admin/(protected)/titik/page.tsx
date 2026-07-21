"use client";

import { useEffect, useState } from "react";

interface Wilayah { id: string; nama: string; }
interface Titik {
  id: string;
  nama: string;
  deskripsi: string | null;
  urutan: number;
  wilayah_id: string;
  wilayah: { nama: string } | null;
}

const EMPTY_FORM = { wilayah_id: "", nama: "", deskripsi: "", urutan: "0" };

export default function TitikPage() {
  const [wilayahList, setWilayahList] = useState<Wilayah[]>([]);
  const [filterWilayah, setFilterWilayah] = useState("");
  const [titikList, setTitikList] = useState<Titik[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Titik | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/wilayah")
      .then((r) => r.json())
      .then((d) => setWilayahList(Array.isArray(d) ? d : []));
  }, []);

  const loadTitik = (wilayahId?: string) => {
    setLoading(true);
    const url = wilayahId ? `/api/titik?wilayah_id=${wilayahId}` : "/api/titik";
    fetch(url)
      .then((r) => r.json())
      .then((d) => setTitikList(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadTitik(filterWilayah || undefined); }, [filterWilayah]);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM, wilayah_id: filterWilayah });
    setError("");
    setShowModal(true);
  };

  const openEdit = (t: Titik) => {
    setEditing(t);
    setForm({ wilayah_id: t.wilayah_id, nama: t.nama, deskripsi: t.deskripsi || "", urutan: String(t.urutan) });
    setError("");
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    const url = editing ? `/api/titik/${editing.id}` : "/api/titik";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, urutan: parseInt(form.urutan) || 0 }),
    });

    if (res.ok) {
      setShowModal(false);
      loadTitik(filterWilayah || undefined);
    } else {
      const d = await res.json();
      setError(d.error || "Gagal menyimpan.");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, nama: string) => {
    if (!confirm(`Hapus titik "${nama}"?`)) return;
    await fetch(`/api/titik/${id}`, { method: "DELETE" });
    loadTitik(filterWilayah || undefined);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Titik Pemeriksaan</h1>
          <p className="text-gray-500 text-sm mt-1">Titik rawan jentik per wilayah</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg text-sm"
        >
          + Tambah Titik
        </button>
      </div>

      {/* Filter wilayah */}
      <div className="mb-4">
        <select
          value={filterWilayah}
          onChange={(e) => setFilterWilayah(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700"
        >
          <option value="">Semua Wilayah</option>
          {wilayahList.map((w) => (
            <option key={w.id} value={w.id}>{w.nama}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Memuat...</div>
        ) : titikList.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            Belum ada titik pemeriksaan.{" "}
            {wilayahList.length === 0 && "Tambahkan wilayah terlebih dahulu."}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-medium w-10">#</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Nama Titik</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden md:table-cell">Wilayah</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden lg:table-cell">Deskripsi</th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {titikList.map((t, i) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">{t.nama}</td>
                  <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{t.wilayah?.nama || "-"}</td>
                  <td className="px-5 py-3 text-gray-400 hidden lg:table-cell">{t.deskripsi || "-"}</td>
                  <td className="px-5 py-3 text-right space-x-2">
                    <button onClick={() => openEdit(t)} className="text-blue-600 hover:underline text-xs">Edit</button>
                    <button onClick={() => handleDelete(t.id, t.nama)} className="text-red-500 hover:underline text-xs">Hapus</button>
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
              {editing ? "Edit Titik" : "Tambah Titik Pemeriksaan"}
            </h2>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wilayah *</label>
                <select
                  value={form.wilayah_id}
                  onChange={(e) => setForm({ ...form, wilayah_id: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="">-- Pilih Wilayah --</option>
                  {wilayahList.map((w) => (
                    <option key={w.id} value={w.id}>{w.nama}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Titik *</label>
                <input
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  placeholder="cth: Bak mandi kamar utama"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <input
                  value={form.deskripsi}
                  onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                  placeholder="Keterangan tambahan..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Urutan tampil</label>
                <input
                  type="number"
                  value={form.urutan}
                  onChange={(e) => setForm({ ...form, urutan: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50">
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.nama || !form.wilayah_id}
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
