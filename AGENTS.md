# ORIA Web Project Rules

## UI & Design Rules
- **TOMBOL & CTA**: JANGAN PERNAH MENGGUNAKAN ARROW (panah bertangkai) pada semua tombol, CTA, atau tautan!
- **GUNAKAN SELALU CHEVRON**: Wajib gunakan ikon Chevron (`>` / `<`) untuk semua tombol, link, dan navigasi slider.
- **HERO SLIDER**:
  - Transisi gambar meluncur dari kanan ke kiri tanpa zoom/scale.
  - Indikator slide menggunakan bar (bukan angka).
  - Kontrol navigasi menggunakan chevron.
  - Tampilan mobile: gambar penuh dan terpusat tanpa offset.

## Environment Variables & Git Rules
- **ENVIRONMENT VARIABLES**: JANGAN PERNAH menggunakan prefix `PUBLIC_` atau `import.meta.env` atau `$env/*`! Semua environment variable WAJIB menggunakan `process.env.<NAMA_VAR>` (contoh: `process.env.STRAPI_URL`, `process.env.SITE_URL`, `process.env.WA_NUMBER`) yang di-load dan di-define di `vite.config.ts`.
- **GIT PUSH**: Setiap kali push, selalu pastikan ter-push ke kedua repository (`origin` yang sudah dikonfigurasi dual push ke `markomasm01-dev/ORIA-SVELTE` dan `Nasuz092/ORIA-SVELTE`).

## Server & Deployment Rules
- **BUILD WAJIB DI LOKAL**: JANGAN PERNAH menjalankan build di server produksi! Server memiliki batasan RAM. Build selalu dilakukan di mesin lokal (`pnpm run build`), dan folder `build/` WAJIB di-commit & di-push ke Git.
- **SERVER INSTALL**: Di server produksi, SELALU gunakan `pnpm install --prod` (atau `pnpm i -P`) untuk menginstal dependensi produksi saja tanpa devDependencies berat, agar sangat ringan dan hemat RAM.
- **SERVER RESTART**: Setelah `git pull origin main`, cukup restart Phusion Passenger dengan `mkdir -p tmp && touch tmp/restart.txt`.
