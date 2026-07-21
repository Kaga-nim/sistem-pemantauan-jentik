import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { checkAdminAuth } from "@/lib/auth";

// GET — publik (untuk form warga)
export async function GET() {
  const { data, error } = await supabase
    .from("wilayah")
    .select("*")
    .order("nama");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — admin only
export async function POST(request: NextRequest) {
  if (!(await checkAdminAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { nama, deskripsi, lat, lng } = body;

  if (!nama) return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });

  const { data, error } = await supabase
    .from("wilayah")
    .insert({ nama, deskripsi, lat: lat || -6.2, lng: lng || 106.8166 })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
