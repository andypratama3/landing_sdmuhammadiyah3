# Mode Maintenance — Landing Page

## 🎯 Tujuan

Menonaktifkan seluruh halaman landing SD Muhammadiyah 3 Samarinda dan menampilkan
halaman "Sedang Dalam Perawatan" dengan **HTTP 503** (bukan 200), agar:

- Pengunjung melihat pesan pemeliharaan, bukan halaman error.
- Search engine tahu situs ini sedang tidak tersedia sementara (503 = temporary),
  bukan dihapus permanen (410).

**Tidak memengaruhi:** API backend (`app.sdmuhammadiyah3smd.com`),
dashboard, dan halaman `/maintenance` itu sendiri.

---

## ⚙️ Cara Kerja

| Bagian | Lokasi | Fungsi |
|---|---|---|
| Flag | `.env` → `MAINTENANCE_MODE` | Sumber kebenaran (`true` / `1` = aktif) |
| Gate | `middleware.ts` | Semua request di-rewrite ke `/maintenance` dengan status 503 |
| Tampilan | `app/maintenance/page.tsx` | Halaman yang dilihat pengunjung |
| Auto-reload | `app/maintenance/auto-refresh.tsx` | Muat ulang otomatis tiap 60 detik (tanpa teks countdown) |

Route yang **tidak** di-gate: `/maintenance` (harus bisa diakses),
seluruh `/api/*` (webhook revalidasi tetap jalan), dan aset statis `/_next/*`.

Header yang dikirim saat aktif: `X-Maintenance-Mode: on` dan `Retry-After: 3600`.

---

## 🚀 Mengaktifkan Maintenance

```bash
cd /var/www/sdmuhammadiyah3smd.com/landing_sdmuhammadiyah3

# 1. Pastikan flag ada (hanya perlu sekali)
grep -q '^MAINTENANCE_MODE=' .env || echo 'MAINTENANCE_MODE=false' >> .env

# 2. Nyalakan
sed -i 's/^MAINTENANCE_MODE=.*/MAINTENANCE_MODE=true/' .env

# 3. Restart agar .env dibaca ulang
pm2 restart landing-nextjs --update-env

# 4. WAJIB — bersihkan cache nginx (lihat catatan di bawah)
find /var/cache/nginx/microcache -type f -delete

# 5. Verifikasi
curl -s -o /dev/null -w '%{http_code}\n' https://sdmuhammadiyah3smd.com/
# harus keluar: 503
```

---

## ✅ Menonaktifkan Maintenance

```bash
cd /var/www/sdmuhammadiyah3smd.com/landing_sdmuhammadiyah3

# 1. Matikan
sed -i 's/^MAINTENANCE_MODE=.*/MAINTENANCE_MODE=false/' .env

# 2. Restart
pm2 restart landing-nextjs --update-env

# 3. Bersihkan cache nginx
find /var/cache/nginx/microcache -type f -delete

# 4. Verifikasi
curl -s -o /dev/null -w '%{http_code}\n' https://sdmuhammadiyah3smd.com/
# harus keluar: 200
```

---

## ⚠️ WAJIB: Bersihkan Nginx Microcache

`/etc/nginx/sites-enabled/landing_sdmuhammadiyah3smd.conf` punya dua baris yang
**saling merusak**:

```nginx
proxy_ignore_headers Cache-Control Expires Set-Cookie;   # baris 112
proxy_cache_use_stale error timeout updating http_500 http_502 http_503;  # baris 107
```

Artinya nginx **mengabaikan** `Cache-Control: no-store` yang dikirim Next.js, lalu
**menyajikan respons 200 lama** dari cache setiap kali origin membalas 503.

Gejalanya: flag sudah `true` dan `pm2 restart` sudah dijalankan, tapi `/`, `/guru`,
`/kontak` masih balas **200** dengan konten lama — sementara `/berita` (belum pernah
di-cache) sudah benar-benar 503.

**Deteksi cepat:**

```bash
curl -sI https://sdmuhammadiyah3smd.com/ | grep -i x-cache-status
# x-cache-status: STALE  <- ada cache basi yang menutupi 503
```

Karena itu `find /var/cache/nginx/microcache -type f -delete` **wajib** dijalankan
setiap kali menyalakan atau mematikan maintenance mode.

---

## 🔍 Verifikasi

```bash
# Semua halaman publik harus 503
for p in / /guru /kontak /berita /profil /galeri /fasilitas /tenaga-pendidikan; do
  printf '%-22s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' https://sdmuhammadiyah3smd.com$p)"
done

# Halaman maintenance sendiri tetap 200
curl -s -o /dev/null -w '%{http_code}\n' https://sdmuhammadiyah3smd.com/maintenance

# Header penanda aktif
curl -sI https://sdmuhammadiyah3smd.com/ | grep -i x-maintenance-mode
```

---

## 🛠️ Deploy di Server Baru

`.env` **tidak** masuk git (`.gitignore` → `.env*`). Setelah clone/pull, tambahkan
manual sebelum aplikasi dijalankan:

```bash
echo 'MAINTENANCE_MODE=false' >> .env
pm2 restart landing-nextjs --update-env
```

Defaultnya **tidak aktif** — kalau `MAINTENANCE_MODE` tidak ada, situs berjalan normal.

---

## ❓ Troubleshooting

| Gejala | Penyebab & Solusi |
|---|---|
| Semua halaman masih 200 padahal flag `true` | Microcache nginx masih menyimpan 200 lama → `find /var/cache/nginx/microcache -type f -delete` |
| `X-Cache-Status: STALE` | Sama seperti di atas |
| `/maintenance` juga balas 503 | Flag tidak terbaca → pastikan `MAINTENANCE_MODE=true` **tanpa spasi**, lalu restart |
| Perubahan tidak berlaku setelah `pm2 reload` | `.env` hanya dibaca saat start → pakai `pm2 restart` |
| 308 di sebagian halaman | Normal. Next.js me-redirect trailing slash sebelum middleware jalan; tujuan redirect-nya sudah 503 |
| `/api/*` masih bisa diakses | Sengaja — webhook revalidasi butuh tetap hidup |
| Laman `/` korup/terpotong di layar pendek | Sudah diperbaiki: wrapper memakai `overflow-y-auto` + `min-h-full` agar konten bisa di-scroll |

---

## 🔐 Catatan Keamanan

- Flag hanya ada di `.env` server, tidak di-commit ke repository.
- Halaman maintenance sudah `noindex, nofollow`, jadi tidak masuk indeks mesin pencari.
- Informasi kontak (telepon, WhatsApp, email, alamat) diambil dari `lib/school-info.ts`,
  bukan ditulis manual di halaman.