import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { checkAdminAuth } from "@/lib/auth";

// GET — publik, filter by wilayah_id
export async function GET(request: NextRequest) {
  const wilayahId = request.nextUrl.searchParams.get("wilayah_id");

  let query = supabase
    .from("titik_pemeriksaan")
    .select("*, wilayah:wilayah_id(nama)")
    .order("urutan")
    .order("created_at");

  if (wilayahId) query = query.eq("wilayah_id", wilayahId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — admin only
export async function POST(request: NextRequest) {
  if (!(await checkAdminAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { wilayah_id, nama, deskripsi, urutan } = body;

  if (!wilayah_id || !nama) {
    return NextResponse.json({ error: "Wilayah dan nama wajib diisi" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("titik_pemeriksaan")
    .insert({ wilayah_id, nama, deskripsi, urutan: urutan || 0 })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
