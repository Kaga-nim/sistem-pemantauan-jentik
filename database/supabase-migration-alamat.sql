-- Migration: tambah kolom alamat ke tabel konfirmasi
-- Jalankan di SQL Editor Supabase

ALTER TABLE konfirmasi ADD COLUMN IF NOT EXISTS alamat VARCHAR(200);
