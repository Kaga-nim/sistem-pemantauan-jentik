import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getISOWeek } from "@/lib/utils";

// Rate limiter sederhana (in-memory): max 10 submit per IP per jam
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// POST — publik, warga submit konfirmasi
export async function POST(request: NextRequest) {
  // Rate limit
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Coba lagi dalam 1 jam." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const { nama_warga, wilayah_id, alamat, catatan, detail, force } = body;

  if (!nama_warga || !wilayah_id || !detail?.length) {
    return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
  }

  // Sanitasi & validasi nama
  const namaBersih = String(nama_warga).trim().slice(0, 100);
  if (namaBersih.length < 2) return NextResponse.json({ error: "Nama minimal 2 karakter" }, { status: 400 });
  if (/<|>|script/i.test(namaBersih)) return NextResponse.json({ error: "Nama tidak valid" }, { status: 400 });

  // Sanitasi alamat (opsional)
  const alamatBersih = alamat ? String(alamat).trim().slice(0, 200) : null;
  if (alamatBersih && /<|>|script/i.test(alamatBersih)) {
    return NextResponse.json({ error: "Alamat tidak valid" }, { status: 400 });
  }

  // Sanitasi catatan
  const catatanBersih = catatan ? String(catatan).trim().slice(0, 500) : null;

  const now = new Date();
  const { week, year } = getISOWeek(now);

  // Cek duplikasi (kecuali force=true)
  if (!force) {
    const { data: existing } = await supabase
      .from("konfirmasi")
      .select("id")
      .eq("nama_warga", namaBersih)
      .eq("wilayah_id", wilayah_id)
      .eq("tahun", year)
      .eq("minggu", week)
      .limit(1)
      .single();

    if (existing) {
      return NextResponse.json({ duplicate: true, minggu: week, tahun: year }, { status: 409 });
    }
  }

  // Simpan konfirmasi utama
  const { data: konfirmasi, error: errK } = await supabase
    .from("konfirmasi")
    .insert({ nama_warga: namaBersih, wilayah_id, alamat: alamatBersih, tahun: year, minggu: week, catatan: catatanBersih })
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
