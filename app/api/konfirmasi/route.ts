import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getISOWeek } from "@/lib/utils";

// POST — publik, warga submit konfirmasi
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { nama_warga, wilayah_id, catatan, detail } = body;

  if (!nama_warga || !wilayah_id || !detail?.length) {
    return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
  }

  const now = new Date();
  const { week, year } = getISOWeek(now);

  // Simpan konfirmasi utama
  const { data: konfirmasi, error: errK } = await supabase
    .from("konfirmasi")
    .insert({ nama_warga, wilayah_id, tahun: year, minggu: week, catatan })
    .select()
    .single();

  if (errK) return NextResponse.json({ error: errK.message }, { status: 500 });

  // Simpan detail per titik
  const detailRows = detail.map((d: { titik_id: string; ada_jentik: boolean; catatan?: string }) => ({
    konfirmasi_id: konfirmasi.id,
    titik_id: d.titik_id,
    ada_jentik: d.ada_jentik,
    catatan: d.catatan || null,
  }));

  const { error: errD } = await supabase.from("detail_konfirmasi").insert(detailRows);
  if (errD) return NextResponse.json({ error: errD.message }, { status: 500 });

  return NextResponse.json({ success: true, id: konfirmasi.id, minggu: week, tahun: year }, { status: 201 });
}
