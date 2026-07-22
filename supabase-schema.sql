-- ============================================================
-- JENTIK MONITOR — Schema Supabase (lengkap, termasuk semua kolom)
-- Jalankan file ini di SQL Editor Supabase untuk setup awal
-- ============================================================

-- 1. Wilayah (area/RT/RW/kelurahan)
CREATE TABLE IF NOT EXISTS wilayah (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  lat DECIMAL(10, 8) DEFAULT -6.2000,
  lng DECIMAL(11, 8) DEFAULT 106.8166,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Titik pemeriksaan — didaftarkan admin per wilayah
CREATE TABLE IF NOT EXISTS titik_pemeriksaan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wilayah_id UUID NOT NULL REFERENCES wilayah(id) ON DELETE CASCADE,
  nama VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  urutan INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Konfirmasi mingguan warga
CREATE TABLE IF NOT EXISTS konfirmasi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_warga VARCHAR(100) NOT NULL,
  alamat VARCHAR(200),
  wilayah_id UUID NOT NULL REFERENCES wilayah(id),
  tahun INTEGER NOT NULL,
  minggu INTEGER NOT NULL,
  tanggal_konfirmasi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  catatan TEXT
);

-- 4. Detail per titik dalam satu konfirmasi
CREATE TABLE IF NOT EXISTS detail_konfirmasi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  konfirmasi_id UUID NOT NULL REFERENCES konfirmasi(id) ON DELETE CASCADE,
  titik_id UUID NOT NULL REFERENCES titik_pemeriksaan(id),
  ada_jentik BOOLEAN DEFAULT FALSE,
  catatan TEXT
);

-- Index
CREATE INDEX IF NOT EXISTS idx_titik_wilayah    ON titik_pemeriksaan(wilayah_id);
CREATE INDEX IF NOT EXISTS idx_konfirmasi_minggu ON konfirmasi(tahun, minggu);
CREATE INDEX IF NOT EXISTS idx_konfirmasi_wilayah ON konfirmasi(wilayah_id);
CREATE INDEX IF NOT EXISTS idx_detail_konfirmasi ON detail_konfirmasi(konfirmasi_id);
CREATE INDEX IF NOT EXISTS idx_detail_titik      ON detail_konfirmasi(titik_id);

-- Nonaktifkan RLS (akses dikontrol via service role key di server)
ALTER TABLE wilayah             DISABLE ROW LEVEL SECURITY;
ALTER TABLE titik_pemeriksaan   DISABLE ROW LEVEL SECURITY;
ALTER TABLE konfirmasi          DISABLE ROW LEVEL SECURITY;
ALTER TABLE detail_konfirmasi   DISABLE ROW LEVEL SECURITY;
