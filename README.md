# 🚨 ALERTA
### Advanced Location-based Emergency Response and Threat Alert System

ALERTA adalah ekosistem sistem kebencanaan terintegrasi berbasis lokasi waktu-nyata (*real-time location-based*) yang dirancang untuk mempercepat koordinasi tanggap darurat, monitoring kebencanaan, serta penyebaran peringatan dini secara akurat antara otoritas penanggulangan bencana dan masyarakat luas.

---

## 🧭 Arsitektur Sistem

ALERTA dibangun menggunakan arsitektur monorepo modular yang membagi fungsionalitas ke dalam 3 komponen utama:

```mermaid
graph TD
    A[Mobile Client - Expo/React Native] <-->|REST API / JSON| B[Backend API - NestJS]
    C[Web CMS Control Panel - Next.js] <-->|REST API / JSON| B
    B <-->|Prisma ORM| D[(Database - PostgreSQL)]
```

1. **Backend API (`/alerta-apps/api`)**  
   Mesin utama berbasis **NestJS** yang mengelola otentikasi JWT, CRUD artikel mitigasi, registrasi pengguna, sinkronisasi pengaturan sistem, dan persistensi database menggunakan **Prisma ORM** dengan PostgreSQL.
2. **Web CMS Dashboard (`/alerta-apps/website-cms`)**  
   Panel kontrol administrator berbasis **Next.js** dan **Tailwind CSS** untuk mengelola laporan kebencanaan, artikel edukasi mitigasi bencana, otorisasi manajemen pengguna (ADMIN/USER), dan konfigurasi global sistem secara premium dan interaktif.
3. **Mobile Client (`/alerta-apps/mobile`)**  
   Aplikasi mobile berbasis **React Native (Expo)** yang digunakan masyarakat untuk menerima push notification siaga bencana berdasarkan geolokasi secara real-time, membaca artikel mitigasi, serta mengirim laporan kebencanaan.

---

## ⚡ Fitur Utama

### 🖥️ Panel Kontrol Web CMS
* **Dashboard Monitor Premium**: Visualisasi statistik jumlah kebencanaan, grafik laporan, dan indikator aktivitas dinamis.
* **Manajemen Pengguna (User Management)**: Manajemen CRUD akun dinamis untuk Admin panel & User mobile, dilengkapi fitur proteksi akun administrator utama (`admin@alerta.go.id`) dan identitas avatar dengan warna dinamis.
* **Manajemen Artikel Edukasi**: Pembuatan konten edukatif mitigasi bencana (Banjir, Gempa Bumi, Kebakaran Hutan) dengan status draf/publikasi.
* **Pengaturan Sistem (System Settings)**: Kontrol konfigurasi global terpusat berbasis tab interaktif (*General*, *Alerts*, *Security*). Menyediakan slider radius deteksi bencana, switch toggle **Mode Pemeliharaan (Maintenance)** aplikasi mobile, dan aktivasi Google login.

### 📱 Aplikasi Mobile (Masyarakat)
* **Peringatan Dini Berbasis Lokasi**: Menerima peringatan darurat seketika (*instant alert push notification*) yang dihitung berdasarkan radius geolokasi terdekat pengguna dari pusat bencana.
* **Laporan Kebencanaan Mandiri**: Memungkinkan masyarakat mengirim laporan bencana secara instan (dilengkapi detail deskripsi, kategori, koordinat lokasi).
* **Edukasi Kebencanaan**: Akses membaca modul mitigasi kebencanaan terverifikasi secara terstruktur.

---

## ⚙️ Spesifikasi Teknologi (Tech Stack)

* **Backend**: NestJS, TypeScript, Passport.js (JWT Auth), bcrypt.
* **ORM & Database**: Prisma ORM, PostgreSQL, `@prisma/adapter-pg` (PG-Pool).
* **Frontend Web**: Next.js (App Router), React, Tailwind CSS, Lucide Icons, Axios.
* **Mobile App**: React Native, Expo, Expo Router.

---

## 🚀 Panduan Instalasi & Pengoperasian

### Prerequisites
Pastikan perangkat Anda telah terinstal:
* [Node.js](https://nodejs.org/) (Versi 18 atau lebih baru)
* [PostgreSQL](https://www.postgresql.org/) (Sistem database berjalan di port `5432`)

---

### Step 1: Konfigurasi & Inisialisasi Backend API
1. Buka terminal dan masuk ke direktori backend:
   ```bash
   cd alerta-apps/api
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
   npm run start:dev
   ```
   *Backend otomatis berjalan di alamat: **`http://localhost:3000`***

---

### Step 2: Konfigurasi & Jalankan Web CMS Dashboard
1. Buka terminal baru dan masuk ke direktori CMS:
   ```bash
   cd alerta-apps/website-cms
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
1. Buka terminal baru dan masuk ke direktori mobile app:
   ```bash
   cd alerta-apps/mobile
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

## 🔐 Kredensial Akses Awal (Default Credentials)

Saat backend dijalankan pertama kali, sistem akan mendeteksi database kosong dan otomatis melakukan **auto-seed** untuk akun administrator awal panel CMS:

* **Email**: `admin@alerta.go.id`
* **Password**: `admin123`

---

## 📄 Lisensi
Hak Cipta © 2026 Proyek ALERTA. Seluruh hak cipta dilindungi undang-undang.
