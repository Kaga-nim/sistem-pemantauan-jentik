# Jentik Monitor — Panduan Setup & Deployment

## Langkah 1: Setup Supabase

1. Buat akun gratis di [supabase.com](https://supabase.com)
2. Buat project baru
3. Masuk ke **SQL Editor** → klik **New query**
4. Salin semua isi file `supabase-schema.sql` dan jalankan (Run)
5. Setelah berhasil, pergi ke **Settings → API**
6. Catat:
   - **Project URL** → `SUPABASE_URL`
   - **service_role secret** (bukan anon) → `SUPABASE_SERVICE_ROLE_KEY`

## Langkah 2: Konfigurasi Environment Variables

Salin `.env.local.example` menjadi `.env.local`:

```bash
cp .env.local.example .env.local
```

Isi nilai di `.env.local`:

```env
SUPABASE_URL=https://xxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxxxx...
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password-rahasia-anda
JWT_SECRET=buat-string-acak-minimal-32-karakter-disini
```

## Langkah 3: Install & Jalankan Lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Langkah 4: Deploy ke Vercel (Gratis)

### Opsi A — Via GitHub (Disarankan)
1. Push project ke GitHub
2. Buka [vercel.com](https://vercel.com) → New Project → Import dari GitHub
3. Di bagian **Environment Variables**, tambahkan semua variabel dari `.env.local`
4. Klik Deploy

### Opsi B — Via Vercel CLI
```bash
npm install -g vercel
vercel
```
Saat ditanya environment variables, masukkan satu per satu.

---

## Cara Penggunaan

### Admin
- Akses `/admin` → login dengan username & password yang sudah diatur
- **Wilayah**: Daftarkan wilayah (RT/RW/kelurahan) beserta koordinat GPS
- **Titik Pemeriksaan**: Tambahkan titik rawan jentik per wilayah (bak mandi, ember, dll.)
- **Laporan**: Lihat dan export laporan mingguan ke Excel
- **Peta**: Pantau sebaran wilayah berjentik secara visual

### Warga
- Buka halaman utama → isi nama + pilih wilayah → klik Mulai Konfirmasi
- Tandai tiap titik apakah ada jentik atau tidak → Kirim

---

## Catatan

- Koordinat GPS bisa dicari di Google Maps: klik lokasi → salin lat,lng dari URL atau popup
- Week number mengikuti standar ISO (Senin = awal minggu)
- Data tidak otomatis terhapus; laporan historis tetap tersimpan
- Untuk ganti password admin: ubah `ADMIN_PASSWORD` di environment variables Vercel lalu redeploy
