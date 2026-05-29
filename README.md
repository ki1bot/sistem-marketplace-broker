# Sistem Marketplace Broker

Halo semuanya! 👋

Project ini adalah **Sistem Marketplace Broker** yang dibuat untuk membantu proses pengelolaan broker, seller, buyer, produk, transaksi, negosiasi, komisi broker, dan riwayat transaksi dalam satu sistem dashboard.

Project ini dibangun menggunakan **Laravel 12** sebagai backend, **ReactJS** sebagai frontend, dan **MySQL** sebagai database.

**Live Demo:** https://sistemmarketplacebroker.vercel.app/

---

## 🛠️ Tech Stack

Project ini dibuat menggunakan teknologi berikut:

* **Laravel 12** - Backend API
* **ReactJS** - Frontend user interface
* **MySQL** - Database
* **JavaScript** - Bahasa utama frontend
* **Tailwind CSS** - Styling frontend
* **Vite** - Development server frontend
* **Composer** - Dependency manager Laravel
* **npm** - Dependency manager frontend

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

* PHP `>= 8.2`
* Composer
* Node.js `>= 18.x`
* npm
* MySQL
* Git

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

## 4. Database Setup

Jika migration belum tersedia, gunakan struktur tabel utama berikut sebagai acuan awal.

```sql
CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'broker', 'seller', 'buyer') DEFAULT 'buyer',
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE brokers (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NULL,
  address TEXT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE sellers (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NULL,
  address TEXT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE buyers (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NULL,
  address TEXT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE products (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  seller_id BIGINT UNSIGNED NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  price DECIMAL(15,2) NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 0,
  image VARCHAR(255) NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE SET NULL
);

CREATE TABLE transactions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id BIGINT UNSIGNED NULL,
  buyer_id BIGINT UNSIGNED NULL,
  seller_id BIGINT UNSIGNED NULL,
  broker_id BIGINT UNSIGNED NULL,
  quantity INT NOT NULL DEFAULT 1,
  total_price DECIMAL(15,2) NOT NULL DEFAULT 0,
  status ENUM('pending', 'process', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
  FOREIGN KEY (buyer_id) REFERENCES buyers(id) ON DELETE SET NULL,
  FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE SET NULL,
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE SET NULL
);

CREATE TABLE negotiations (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  transaction_id BIGINT UNSIGNED NULL,
  offered_price DECIMAL(15,2) NOT NULL DEFAULT 0,
  note TEXT NULL,
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE
);

CREATE TABLE commissions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  transaction_id BIGINT UNSIGNED NULL,
  broker_id BIGINT UNSIGNED NULL,
  commission_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
  status ENUM('unpaid', 'paid') DEFAULT 'unpaid',
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE SET NULL
);
```

> Jika project sudah memiliki file migration Laravel, lebih baik gunakan `php artisan migrate` daripada menjalankan query manual.

---

## Pages & Features

### Admin Dashboard

* **Dashboard Utama** — Ringkasan data sistem marketplace broker
* **Manajemen Broker** — Tambah, edit, hapus, dan lihat data broker
* **Manajemen Seller** — Mengelola data seller
* **Manajemen Buyer** — Mengelola data buyer
* **Data Produk** — Mengelola produk marketplace
* **Transaksi** — Mengelola transaksi buyer, seller, broker, dan produk
* **Negosiasi** — Mengelola proses tawar-menawar harga
* **Komisi Broker** — Mengelola komisi yang diterima broker
* **Riwayat Transaksi** — Melihat histori transaksi
* **Visualisasi Data** — Grafik produk dan status transaksi

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

* Pastikan MySQL sudah berjalan.
* Pastikan database `sistem_marketplace_broker` sudah dibuat.
* Pastikan konfigurasi `.env` backend sudah benar.
* Jalankan ulang server setelah mengubah `.env`.
* Jika frontend gagal mengambil data, cek `VITE_API_URL`.
* Jika migration error, cek koneksi database dan struktur tabel.
* Jika CORS error, cek konfigurasi CORS pada Laravel.
* Jika package error, hapus `node_modules` lalu jalankan ulang `npm install`.

---

## Catatan Keamanan

* Jangan commit file `.env`.
* Jangan menulis password database di README.
* Gunakan authentication untuk route yang bersifat admin.
* Validasi semua input dari frontend.
* Gunakan middleware untuk membatasi akses berdasarkan role user.

---

## Credits & Contact

**Rifqi Susanto**

GitHub: [ki1bot](https://github.com/ki1bot)

⭐ Jika project ini membantu atau menarik, jangan lupa beri star di GitHub!
