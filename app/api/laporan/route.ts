import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { checkAdminAuth } from "@/lib/auth";
import { getISOWeek } from "@/lib/utils";

export async function GET(request: NextRequest) {
  if (!(await checkAdminAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { week, year } = getISOWeek(new Date());
  const minggu = parseInt(request.nextUrl.searchParams.get("minggu") || String(week));
  const tahun = parseInt(request.nextUrl.searchParams.get("tahun") || String(year));
  const wilayahId = request.nextUrl.searchParams.get("wilayah_id");

  let query = supabase
    .from("konfirmasi")
    .select(`
      id,
      nama_warga,
      tanggal_konfirmasi,
      catatan,
      wilayah:wilayah_id(id, nama),
      detail_konfirmasi(
        id,
        ada_jentik,
        catatan,
        titik:titik_id(id, nama)
      )
    `)
    .eq("tahun", tahun)
    .eq("minggu", minggu)
    .order("tanggal_konfirmasi", { ascending: false });

  if (wilayahId) query = query.eq("wilayah_id", wilayahId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data, minggu, tahun });
}
