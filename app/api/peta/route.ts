import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getISOWeek } from "@/lib/utils";

// Publik — data per wilayah untuk peta (minggu ini)
export async function GET(request: NextRequest) {
  const { week, year } = getISOWeek(new Date());
  const minggu = parseInt(request.nextUrl.searchParams.get("minggu") || String(week));
  const tahun = parseInt(request.nextUrl.searchParams.get("tahun") || String(year));

  // Ambil semua wilayah
  const { data: wilayahList, error: errW } = await supabase
    .from("wilayah")
    .select("*")
    .order("nama");

  if (errW) return NextResponse.json({ error: errW.message }, { status: 500 });

  // Ambil agregasi jentik per wilayah untuk minggu tersebut
  const { data: konfirmasiList, error: errK } = await supabase
    .from("konfirmasi")
    .select(`
      wilayah_id,
      detail_konfirmasi(ada_jentik)
    `)
    .eq("tahun", tahun)
    .eq("minggu", minggu);

  if (errK) return NextResponse.json({ error: errK.message }, { status: 500 });

  // Hitung per wilayah: total konfirmasi, total jentik ditemukan
  const statMap: Record<string, { total_konfirmasi: number; total_jentik: number }> = {};

  for (const k of konfirmasiList || []) {
    const wid = k.wilayah_id;
    if (!statMap[wid]) statMap[wid] = { total_konfirmasi: 0, total_jentik: 0 };
    statMap[wid].total_konfirmasi += 1;

    const details = k.detail_konfirmasi as { ada_jentik: boolean }[];
    statMap[wid].total_jentik += details.filter((d) => d.ada_jentik).length;
  }

  const result = (wilayahList || []).map((w) => ({
    ...w,
    ...(statMap[w.id] || { total_konfirmasi: 0, total_jentik: 0 }),
  }));

  return NextResponse.json({ data: result, minggu, tahun });
}
