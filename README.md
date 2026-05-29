# Sistem Marketplace Broker

Halo semuanya! 👋

Project ini adalah **Sistem Marketplace Broker** yang dibuat untuk membantu proses pengelolaan broker, seller, buyer, produk, transaksi, negosiasi, komisi broker, dan riwayat transaksi dalam satu sistem dashboard.

Project ini dibangun menggunakan **Laravel 12** sebagai backend, **ReactJS** sebagai frontend, dan **MySQL** sebagai database.

**Live Demo:** https://sistemmarketplacebroker.vercel.app/

---

## 🛠️ Tech Stack

Project ini dibuat menggunakan teknologi berikut:

- **Laravel 12** - Backend API
- **ReactJS** - Frontend user interface
- **MySQL** - Database
- **JavaScript** - Bahasa utama frontend
- **Tailwind CSS** - Styling frontend
- **Vite** - Development server frontend
- **Composer** - Dependency manager Laravel
- **npm** - Dependency manager frontend

---

## User Roles

| Role       | Access                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------- |
| **Admin**  | Mengelola data broker, seller, buyer, produk, transaksi, negosiasi, komisi, dan riwayat transaksi |
| **Broker** | Melihat dan mengelola data yang berkaitan dengan broker                                           |
| **Seller** | Mengelola data produk dan transaksi yang berkaitan dengan seller                                  |
| **Buyer**  | Melihat produk dan melakukan transaksi atau negosiasi                                             |

---

## Getting Started

### Prerequisites

Pastikan sudah menginstall:

- PHP `>= 8.2`
- Composer
- Node.js `>= 18.x`
- npm
- MySQL
- Git

---

## 1. Clone Repository

```bash
git clone https://github.com/ki1bot/sistem-marketplace-broker.git
cd sistem-marketplace-broker
```

---

## 2. Setup Backend Laravel

Masuk ke folder backend:

```bash
cd backend
```

Install dependency Laravel:

```bash
composer install
```

Copy file environment:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

Atur konfigurasi database di file `.env`:

```env
APP_NAME="Sistem Marketplace Broker"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sistem_marketplace_broker
DB_USERNAME=root
DB_PASSWORD=
```

Buat database MySQL:

```sql
CREATE DATABASE sistem_marketplace_broker;
```

Jalankan migration:

```bash
php artisan migrate
```

Jalankan seeder jika tersedia:

```bash
php artisan db:seed
```

Jalankan server Laravel:

```bash
php artisan serve
```

Backend akan berjalan di:

```txt
http://localhost:8000
```

---

## 3. Setup Frontend React

Buka terminal baru, lalu masuk ke folder frontend:

```bash
cd frontend
```

Install dependency frontend:

```bash
npm install
```

Buat file `.env` di folder frontend:

```env
VITE_API_URL=http://localhost:8000/api
```

Jalankan frontend:

```bash
npm run dev
```

Frontend akan berjalan di:

```txt
http://localhost:5173
```

---

### Admin Dashboard

- **Dashboard Utama** — Ringkasan data sistem marketplace broker
- **Manajemen Broker** — Tambah, edit, hapus, dan lihat data broker
- **Manajemen Seller** — Mengelola data seller
- **Manajemen Buyer** — Mengelola data buyer
- **Data Produk** — Mengelola produk marketplace
- **Transaksi** — Mengelola transaksi buyer, seller, broker, dan produk
- **Negosiasi** — Mengelola proses tawar-menawar harga
- **Komisi Broker** — Mengelola komisi yang diterima broker
- **Riwayat Transaksi** — Melihat histori transaksi
- **Visualisasi Data** — Grafik produk dan status transaksi

---

## API Endpoint

Contoh endpoint backend:

```txt
GET    /api/products
POST   /api/products
GET    /api/products/{id}
PUT    /api/products/{id}
DELETE /api/products/{id}

GET    /api/brokers
POST   /api/brokers
GET    /api/sellers
POST   /api/sellers
GET    /api/buyers
POST   /api/buyers

GET    /api/transactions
POST   /api/transactions

GET    /api/negotiations
POST   /api/negotiations

GET    /api/commissions
POST   /api/commissions
```

Sesuaikan endpoint di atas dengan route yang ada di file Laravel:

```txt
routes/api.php
```

---

## Build for Production

### Backend Laravel

Optimasi Laravel:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Frontend React

Build frontend:

```bash
cd frontend
npm run build
```

Hasil build frontend akan berada di folder:

```txt
frontend/dist
```

---

## Troubleshooting

- Pastikan MySQL sudah berjalan.
- Pastikan database `sistem_marketplace_broker` sudah dibuat.
- Pastikan konfigurasi `.env` backend sudah benar.
- Jalankan ulang server setelah mengubah `.env`.
- Jika frontend gagal mengambil data, cek `VITE_API_URL`.
- Jika migration error, cek koneksi database dan struktur tabel.
- Jika CORS error, cek konfigurasi CORS pada Laravel.
- Jika package error, hapus `node_modules` lalu jalankan ulang `npm install`.

---

## Credits & Contact

**Rifqi Susanto**

GitHub: [ki1bot](https://github.com/ki1bot)

⭐ Jika project ini membantu atau menarik, jangan lupa beri star di GitHub!
