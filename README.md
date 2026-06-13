# 🚨 ALERTA
### Advanced Location-based Emergency Response and Threat Alert System

ALERTA adalah ekosistem sistem kebencanaan terintegrasi berbasis lokasi waktu-nyata (*real-time location-based*) yang dirancang untuk mempercepat koordinasi tanggap darurat, monitoring kebencanaan, serta penyebaran peringatan dini secara akurat antara otoritas penanggulangan bencana (BPBD) dan masyarakat luas.

---

## 🧭 Arsitektur Sistem

ALERTA dibangun menggunakan arsitektur monorepo modular yang membagi fungsionalitas ke dalam 3 komponen utama:

```mermaid
graph TD
    A[Mobile Client - Expo/React Native] <-->|REST API / JSON| B[Backend API - NestJS]
    C[Web CMS Control Panel - Next.js] <-->|REST API / JSON| B
    B <-->|Prisma ORM| D[(Database - PostgreSQL)]
```

1. **Backend API (`/api`)**  
   Mesin utama berbasis **NestJS** yang mengelola otentikasi JWT, CRUD artikel mitigasi, registrasi pengguna, manajemen bencana/laporan (`Report` schema), sinkronisasi pengaturan sistem, dan persistensi database menggunakan **Prisma ORM** dengan PostgreSQL.
2. **Web CMS Dashboard (`/website-cms`)**  
   Panel kontrol administrator berbasis **Next.js** dan **Tailwind CSS** untuk memantau data satelit bencana terverifikasi, mengelola laporan masuk dari pengguna mobile, membuat artikel edukasi mitigasi bencana, otorisasi manajemen pengguna (ADMIN/USER), dan konfigurasi global sistem secara premium dan interaktif.
3. **Mobile Client (`/mobile`)**  
   Aplikasi mobile berbasis **React Native (Expo)** yang digunakan masyarakat untuk memantau titik lokasi bencana Lampung secara real-time pada peta interaktif, menerima peringatan dini berdasarkan geolokasi, mengirim laporan kebencanaan mandiri, dan membaca artikel edukasi mitigasi.

---

## ⚡ Fitur Utama

### 🖥️ Panel Kontrol Web CMS
* **Dashboard Monitor Premium**: Visualisasi statistik jumlah kebencanaan, grafik laporan bulanan/harian SVG, dan lini masa aktivitas relawan dinamis.
* **Manajemen Laporan Bencana (Report Management)**:
  - Menyajikan tabel laporan real-time yang dikirim langsung dari aplikasi mobile masyarakat.
  - Otorisasi aksi verifikasi status laporan (`MENUNGGU` ➡️ `TERVERIFIKASI` / `DITOLAK`).
  - Hotspot Heatmap visual, peringatan sistem radius dekat, dan ekspor laporan ke format XLS.
* **Pusat Pemantauan Bencana (Disaster Monitoring)**:
  - Peta Lampung satelit interaktif (Google Maps iframe) terintegrasi dengan penanda berkategori (Banjir, Kebakaran, Gempa Bumi, Angin Kencang).
  - Floating pills filter untuk menyaring penanda bencana aktif di peta secara real-time.
  - Alert running text banner ("WARNING") dinamis murni animasi CSS.
* **Manajemen Pengguna (User Management)**: Manajemen akun dinamis untuk Admin panel & User mobile, dilengkapi fitur proteksi akun administrator utama (`admin@alerta.go.id`).
* **Pengaturan Sistem (System Settings)**: Kontrol konfigurasi global terpusat (slider radius deteksi bencana, switch toggle Mode Pemeliharaan, dan aktivasi Google login).

### 📱 Aplikasi Mobile (Masyarakat)
* **Beranda Dinamis (Home Screen)**:
  - Peringatan dini bencana aktif khusus wilayah **Bandar Lampung** ("Siaga Banjir Bandar Lampung").
  - Tombol aksi megaphone "Lapor Kejadian Sekarang" dengan navigasi instan ke tab input laporan.
  - Kartu status kerawanan wilayah ("Waspada Moderat") dan widget jumlah bencana aktif dinamis (Banjir & Kebakaran).
  - Horizontal scroll tips mitigasi bencana dan daftar berita terkini (BMKG & Metro News).
* **Peta Kebencanaan (Disaster Map)**:
  - Peta interaktif Lampung yang secara otomatis memetakan titik bencana dinamis berstatus `TERVERIFIKASI` dari database backend.
  - Penanda bencana visual dengan ripple animation yang halus (gelombang untuk Banjir, denyutan api untuk Kebakaran).
  - Tombol zoom (+ / -) melayang, tombol GPS Compass fokus lokasi, filter pil kategori melayang, dan kartu detail informasi bencana saat penanda diklik.
* **Laporan Kebencanaan Mandiri (Quick Report Form)**: Memungkinkan masyarakat mengirim laporan bencana secara instan (dilengkapi detail deskripsi, kategori, koordinat lokasi).
* **Edukasi Mitigasi**: Akses membaca modul mitigasi kebencanaan terverifikasi secara terstruktur.

---

## ⚙️ Spesifikasi Teknologi (Tech Stack)

* **Backend**: NestJS, TypeScript, Passport.js (JWT Auth), bcrypt.
* **ORM & Database**: Prisma ORM, PostgreSQL.
* **Frontend Web**: Next.js (App Router), React, Tailwind CSS, Lucide Icons, Axios.
* **Mobile App**: React Native, Expo, Expo Router, Lucide-React-Native.

---

## 🚀 Panduan Instalasi & Pengoperasian

### Prerequisites
Pastikan perangkat Anda telah terinstal:
* [Node.js](https://nodejs.org/) (Versi 18 atau lebih baru)
* [PostgreSQL](https://www.postgresql.org/) (Sistem database berjalan di port `5432`)

---

### Step 1: Konfigurasi & Inisialisasi Backend API
1. Masuk ke direktori backend:
   ```bash
   cd api
   ```
2. Instal dependensi node:
   ```bash
   npm install
   ```
3. Buat berkas konfigurasi `.env` di dalam direktori `api` dan isi alamat koneksi PostgreSQL Anda:
   ```env
   DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/db_project-alerta?schema=public"
   PORT=3000
   ```
4. Jalankan sinkronisasi skema database menggunakan Prisma:
   ```bash
   npx prisma db push
   npx prisma generate
   ```
5. Jalankan server pengembangan NestJS:
   ```bash
   npm start dev
   ```
   *Backend otomatis berjalan di alamat: **`http://localhost:3000`***

---

### Step 2: Konfigurasi & Jalankan Web CMS Dashboard
1. Masuk ke direktori CMS:
   ```bash
   cd website-cms
   ```
2. Instal dependensi node:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan Next.js:
   ```bash
   npm run dev
   ```
   *Dashboard Web CMS otomatis berjalan di alamat: **`http://localhost:3001`***

---

### Step 3: Konfigurasi & Jalankan Aplikasi Mobile (Expo)
1. Masuk ke direktori mobile app:
   ```bash
   cd mobile
   ```
2. Instal dependensi node:
   ```bash
   npm install
   ```
3. Jalankan server Expo:
   ```bash
   npx expo start
   ```
4. Pindai kode QR menggunakan aplikasi **Expo Go** pada ponsel pintar Anda (iOS atau Android) untuk membuka aplikasi secara langsung.

---

## 📄 Lisensi
Hak Cipta © 2026 Proyek ALERTA. Seluruh hak cipta dilindungi undang-undang.
