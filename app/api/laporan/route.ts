import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { checkAdminAuth } from "@/lib/auth";
import { getISOWeek } from "@/lib/utils";

const PAGE_SIZE = 20;

export async function GET(request: NextRequest) {
  if (!(await checkAdminAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { week, year } = getISOWeek(new Date());
  const minggu = parseInt(request.nextUrl.searchParams.get("minggu") || String(week));
  const tahun = parseInt(request.nextUrl.searchParams.get("tahun") || String(year));
  const wilayahId = request.nextUrl.searchParams.get("wilayah_id");
  const page = Math.max(1, parseInt(request.nextUrl.searchParams.get("page") || "1"));
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let countQuery = supabase
    .from("konfirmasi")
    .select("id", { count: "exact", head: true })
    .eq("tahun", tahun)
    .eq("minggu", minggu);

  let dataQuery = supabase
    .from("konfirmasi")
    .select(`
      id,
      nama_warga,
      alamat,
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
    .order("tanggal_konfirmasi", { ascending: false })
    .range(from, to);

  if (wilayahId) {
    countQuery = countQuery.eq("wilayah_id", wilayahId);
    dataQuery = dataQuery.eq("wilayah_id", wilayahId);
  }

  const [{ count, error: errC }, { data, error: errD }] = await Promise.all([countQuery, dataQuery]);

  if (errC || errD) {
    return NextResponse.json({ error: errC?.message || errD?.message }, { status: 500 });
  }

  const total = count ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return NextResponse.json({ data, minggu, tahun, page, totalPages, total, pageSize: PAGE_SIZE });
}
