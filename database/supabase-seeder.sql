-- ============================================================
-- JENTIK MONITOR — Data Contoh (Seeder)
-- Jalankan SETELAH supabase-schema.sql sudah dijalankan
-- Data ini untuk keperluan demo/testing
-- ============================================================

DO $$
DECLARE
  -- Wilayah
  w1 UUID := gen_random_uuid();
  w2 UUID := gen_random_uuid();
  w3 UUID := gen_random_uuid();

  -- Titik wilayah 1
  t1a UUID := gen_random_uuid();
  t1b UUID := gen_random_uuid();
  t1c UUID := gen_random_uuid();
  t1d UUID := gen_random_uuid();

  -- Titik wilayah 2
  t2a UUID := gen_random_uuid();
  t2b UUID := gen_random_uuid();
  t2c UUID := gen_random_uuid();
  t2d UUID := gen_random_uuid();

  -- Titik wilayah 3
  t3a UUID := gen_random_uuid();
  t3b UUID := gen_random_uuid();
  t3c UUID := gen_random_uuid();

  -- Konfirmasi
  k1 UUID := gen_random_uuid();
  k2 UUID := gen_random_uuid();
  k3 UUID := gen_random_uuid();
  k4 UUID := gen_random_uuid();
  k5 UUID := gen_random_uuid();

  -- Minggu & tahun saat ini
  v_minggu INTEGER;
  v_tahun  INTEGER;

BEGIN
  -- Hitung ISO week number saat ini
  v_tahun  := EXTRACT(YEAR FROM NOW())::INTEGER;
  v_minggu := EXTRACT(WEEK FROM NOW())::INTEGER;

  -- ── WILAYAH ─────────────────────────────────────────────
  INSERT INTO wilayah (id, nama, deskripsi, lat, lng) VALUES
    (w1, 'RT 01 / RW 03', 'Kel. Kebonbaru, Kec. Kejaksan', -6.7280, 108.5522),
    (w2, 'RT 02 / RW 03', 'Kel. Kebonbaru, Kec. Kejaksan', -6.7295, 108.5540),
    (w3, 'RT 03 / RW 03', 'Kel. Kebonbaru, Kec. Kejaksan', -6.7265, 108.5508);

  -- ── TITIK PEMERIKSAAN ───────────────────────────────────
  -- Wilayah 1
  INSERT INTO titik_pemeriksaan (id, wilayah_id, nama, deskripsi, urutan) VALUES
    (t1a, w1, 'Bak mandi kamar mandi utama',  'Periksa dinding dan dasar bak',          1),
    (t1b, w1, 'Ember penampungan air',         'Di dapur atau kamar mandi',              2),
    (t1c, w1, 'Pot tanaman / vas bunga',       'Periksa air yang tergenang di tatakan',  3),
    (t1d, w1, 'Tempayan / gentong',            'Penampungan cadangan air bersih',        4);

  -- Wilayah 2
  INSERT INTO titik_pemeriksaan (id, wilayah_id, nama, deskripsi, urutan) VALUES
    (t2a, w2, 'Bak mandi',                    'Kamar mandi depan dan belakang',         1),
    (t2b, w2, 'Talang air / saluran atap',    'Periksa sumbatan dan genangan',          2),
    (t2c, w2, 'Penampungan air AC',            'Wadah pembuangan kondensasi AC',         3),
    (t2d, w2, 'Pot / kolam hias',             'Kolam ikan atau pot air mancur',         4);

  -- Wilayah 3
  INSERT INTO titik_pemeriksaan (id, wilayah_id, nama, deskripsi, urutan) VALUES
    (t3a, w3, 'Bak mandi',                    NULL,                                     1),
    (t3b, w3, 'Ember dan gayung',             'Semua wadah penampungan air',            2),
    (t3c, w3, 'Ban bekas / wadah terbuka',    'Di halaman atau samping rumah',          3);

  -- ── KONFIRMASI MINGGU INI ───────────────────────────────
  -- Warga 1 — Wilayah 1 — ada jentik di bak mandi & ember
  INSERT INTO konfirmasi (id, nama_warga, alamat, wilayah_id, tahun, minggu, catatan)
  VALUES (k1, 'Siti Rahayu', 'Jl. Melati No. 3', w1, v_tahun, v_minggu, NULL);

  INSERT INTO detail_konfirmasi (konfirmasi_id, titik_id, ada_jentik, catatan) VALUES
    (k1, t1a, TRUE,  'Banyak jentik di sudut bak'),
    (k1, t1b, TRUE,  NULL),
    (k1, t1c, FALSE, NULL),
    (k1, t1d, FALSE, NULL);

  -- Warga 2 — Wilayah 1 — bersih semua
  INSERT INTO konfirmasi (id, nama_warga, alamat, wilayah_id, tahun, minggu, catatan)
  VALUES (k2, 'Budi Santoso', 'Jl. Melati No. 7', w1, v_tahun, v_minggu, 'Sudah dikuras minggu kemarin');

  INSERT INTO detail_konfirmasi (konfirmasi_id, titik_id, ada_jentik, catatan) VALUES
    (k2, t1a, FALSE, NULL),
    (k2, t1b, FALSE, NULL),
    (k2, t1c, FALSE, NULL),
    (k2, t1d, FALSE, NULL);

  -- Warga 3 — Wilayah 2 — ada jentik di talang & AC
  INSERT INTO konfirmasi (id, nama_warga, alamat, wilayah_id, tahun, minggu, catatan)
  VALUES (k3, 'Ahmad Fauzi', 'Jl. Mawar No. 12', w2, v_tahun, v_minggu, 'Talang tersumbat daun');

  INSERT INTO detail_konfirmasi (konfirmasi_id, titik_id, ada_jentik, catatan) VALUES
    (k3, t2a, FALSE, NULL),
    (k3, t2b, TRUE,  'Banyak genangan di talang belakang'),
    (k3, t2c, TRUE,  NULL),
    (k3, t2d, FALSE, NULL);

  -- Warga 4 — Wilayah 2 — bersih
  INSERT INTO konfirmasi (id, nama_warga, alamat, wilayah_id, tahun, minggu, catatan)
  VALUES (k4, 'Dewi Lestari', 'Jl. Mawar No. 5', w2, v_tahun, v_minggu, NULL);

  INSERT INTO detail_konfirmasi (konfirmasi_id, titik_id, ada_jentik, catatan) VALUES
    (k4, t2a, FALSE, NULL),
    (k4, t2b, FALSE, NULL),
    (k4, t2c, FALSE, NULL),
    (k4, t2d, FALSE, NULL);

  -- Warga 5 — Wilayah 3 — belum ada laporan lain (hanya satu)
  INSERT INTO konfirmasi (id, nama_warga, alamat, wilayah_id, tahun, minggu, catatan)
  VALUES (k5, 'Hendra Wijaya', 'Jl. Kenanga No. 2', w3, v_tahun, v_minggu, NULL);

  INSERT INTO detail_konfirmasi (konfirmasi_id, titik_id, ada_jentik, catatan) VALUES
    (k5, t3a, FALSE, NULL),
    (k5, t3b, FALSE, NULL),
    (k5, t3c, TRUE,  'Ban bekas di depan rumah berisi air hujan');

END $$;
