# SiGesit — Sistem Informasi Pemantauan Jentik

Aplikasi web untuk pemantauan jentik nyamuk mingguan berbasis wilayah (RT/RW). Warga mengisi konfirmasi tanpa login; admin mengelola data dan memantau sebaran lewat peta interaktif.

## Fitur

- **Warga**: isi nama, alamat, dan wilayah → konfirmasi tiap titik pemeriksaan → selesai
- **Admin**: kelola wilayah & titik, lihat laporan mingguan, export Excel, pantau peta sebaran jentik
- Deteksi duplikat konfirmasi per minggu dengan opsi kirim ulang
- Peta interaktif (Leaflet + CartoDB) dengan status warna & alert wilayah berisiko
- Rate limiting, validasi input server-side, autentikasi admin via JWT (HTTP-only cookie)

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, TypeScript)
- [Supabase](https://supabase.com/) (PostgreSQL)
- [Tailwind CSS](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/) (peta)
- [jose](https://github.com/panva/jose) (JWT)
- [xlsx](https://sheetjs.com/) (export Excel)

## Struktur Folder

```
app/
├── admin/              # Halaman admin (login + protected pages)
│   └── (protected)/   # Dashboard, laporan, wilayah, titik, peta
├── api/                # API routes (konfirmasi, laporan, peta, dll.)
├── konfirmasi/         # Halaman pengisian konfirmasi warga
└── page.tsx            # Halaman utama (form identitas warga)
components/
└── MapView.tsx         # Komponen peta Leaflet
lib/
├── auth.ts             # JWT helper
├── supabase.ts         # Supabase client (service role)
└── utils.ts            # ISO week, format tanggal
database/
├── supabase-schema.sql # DDL lengkap — jalankan pertama kali di Supabase
└── supabase-seeder.sql # Data contoh untuk testing
```

## Setup

Lihat [SETUP.md](SETUP.md) untuk panduan lengkap (Supabase, env vars, lokal, Vercel).
