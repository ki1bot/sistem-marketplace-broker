-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 10, 2026 at 11:23 AM
-- Server version: 8.4.3
-- PHP Version: 8.5.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistemmarketplacebroker`
--

-- --------------------------------------------------------

--
-- Table structure for table `broker`
--

CREATE TABLE `broker` (
  `id_broker` int NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `tingkatan` enum('junior','senior') DEFAULT NULL,
  `id_broker_senior` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `broker`
--

INSERT INTO `broker` (`id_broker`, `nama`, `no_hp`, `email`, `tingkatan`, `id_broker_senior`) VALUES
(1, 'Hendra Wijaya', '081234567801', 'hendra.wijaya@email.com', 'senior', NULL),
(2, 'Fajar Ramadhan', '081234567802', 'fajar.ramadhan@email.com', 'junior', 17),
(3, 'Dewi Anggraini', '081234567803', 'dewi.anggraini@email.com', 'senior', NULL),
(4, 'Gilang Maulana', '081234567804', 'gilang.maulana@email.com', 'junior', 3),
(5, 'Rudi Hartono', '081234567805', 'rudi.hartono@email.com', 'senior', NULL),
(6, 'Indra Saputra', '081234567806', 'indra.saputra@email.com', 'junior', 25),
(7, 'Joko Susilo', '081234567807', 'joko.susilo@email.com', 'junior', 8),
(8, 'Citra Lestari', '081234567808', 'citra.lestari@email.com', 'senior', NULL),
(9, 'Kurniawan Hakim', '081234567809', 'kurniawan.hakim@email.com', 'junior', 12),
(10, 'Nanda Putri', '081234567810', 'nanda.putri@email.com', 'junior', 29),
(11, 'Oscar Gunawan', '081234567811', 'oscar.gunawan@email.com', 'junior', 5),
(12, 'Eko Prasetyo', '081234567812', 'eko.prasetyo@email.com', 'senior', NULL),
(13, 'Putra Nugraha', '081234567813', 'putra.nugraha@email.com', 'junior', 21),
(14, 'Lina Marlina', '081234567814', 'lina.marlina@email.com', 'senior', NULL),
(15, 'Rani Amelia', '081234567815', 'rani.amelia@email.com', 'junior', 1),
(16, 'Siska Wulandari', '081234567816', 'siska2.wulandari@email.com', 'junior', 14),
(17, 'Ahmad Fauzi', '081234567817', 'ahmad.fauzi@email.com', 'senior', NULL),
(18, 'Taufik Hidayat', '081234567818', 'taufik.hidayat@email.com', 'junior', 17),
(19, 'Yoga Firmansyah', '081234567819', 'yoga.firmansyah@email.com', 'junior', 3),
(20, 'Andika Pratama', '081234567820', 'andika.pratama@email.com', 'junior', 25),
(21, 'Sari Wulandari', '081234567821', 'sari.wulandari@email.com', 'senior', NULL),
(22, 'Brenda Natalia', '081234567822', 'brenda.natalia@email.com', 'junior', 8),
(23, 'Chandra Wijaya', '081234567823', 'chandra.wijaya@email.com', 'junior', 12),
(24, 'Della Maharani', '081234567824', 'della.maharani@email.com', 'junior', 29),
(25, 'Budi Santoso', '081234567825', 'budi.santoso@email.com', 'senior', NULL),
(26, 'Erlangga Putra', '081234567826', 'erlangga.putra@email.com', 'junior', 5),
(27, 'Febri Kurniawan', '081234567827', 'febri.kurniawan@email.com', 'junior', 21),
(28, 'Gracia Amanda', '081234567828', 'gracia.amanda@email.com', 'junior', 1),
(29, 'Maya Kartika', '081234567829', 'maya.kartika@email.com', 'senior', NULL),
(30, 'Hafiz Maulana', '081234567830', 'hafiz.maulana@email.com', 'junior', 14),
(31, 'Aditya Pranata', '081239000031', 'aditya.pranata@email.com', 'senior', NULL),
(32, 'Fikri Ananda', '081239000032', 'fikri.ananda@email.com', 'junior', 34),
(33, 'Bayu Firmansyah', '081239000033', 'bayu.firmansyah@email.com', 'junior', 42),
(34, 'Melinda Kartika', '081239000034', 'melinda.kartika@email.com', 'senior', NULL),
(35, 'Haris Setiawan', '081239000035', 'haris.setiawan@email.com', 'junior', 31),
(36, 'Dimas Nugroho', '081239000036', 'dimas.nugroho@email.com', 'junior', 38),
(37, 'Kevin Prakoso', '081239000037', 'kevin.prakoso@email.com', 'junior', 45),
(38, 'Nabila Putri', '081239000038', 'nabila.putri@email.com', 'senior', NULL),
(39, 'Gita Ramadhani', '081239000039', 'gita.ramadhani@email.com', 'junior', 42),
(40, 'Cindy Amelia', '081239000040', 'cindy.amelia@email.com', 'junior', 31),
(41, 'Laras Ayuningtyas', '081239000041', 'laras.ayuningtyas@email.com', 'junior', 34),
(42, 'Rizal Mahendra', '081239000042', 'rizal.mahendra@email.com', 'senior', NULL),
(43, 'Intan Lestari', '081239000043', 'intan.lestari@email.com', 'junior', 38),
(44, 'Elsa Maharani', '081239000044', 'elsa.maharani@email.com', 'junior', 45),
(45, 'Wahyu Saputra', '081239000045', 'wahyu.saputra@email.com', 'senior', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `buyer`
--

CREATE TABLE `buyer` (
  `id_buyer` int NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `perusahaan` varchar(100) DEFAULT NULL,
  `kontak` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `buyer`
--

INSERT INTO `buyer` (`id_buyer`, `nama`, `perusahaan`, `kontak`) VALUES
(1, 'Adi Nugraha', 'PT Energi Abadi', 'adi@energiabadi.com'),
(2, 'Bella Kartika', 'PT Industri Logam', 'bella@industrilogam.com'),
(3, 'Candra Lesmana', 'PT Perhiasan Nusantara', 'candra@perhiasan.com'),
(4, 'Dimas Ardiansyah', 'CV Bangunan Jaya', 'dimas@bangunanjaya.com'),
(5, 'Elisa Putri', 'PT Kabel Nasional', 'elisa@kabelnasional.com'),
(6, 'Fikri Ramadhan', 'PT Alumina Global', 'fikri@aluminaglobal.com'),
(7, 'Gilang Saputra', 'PT Solder Prima', 'gilang@solderprima.com'),
(8, 'Hana Maharani', 'CV Material Sejahtera', 'hana@materialsejahtera.com'),
(9, 'Iqbal Firmansyah', 'PT Energi Mandiri', 'iqbal@energimandiri.com'),
(10, 'Jihan Nabila', 'PT Manufaktur Logam', 'jihan@manufakturlogam.com'),
(11, 'Kevin Sanjaya', 'PT Retail Elektronik', 'kevin@retailelektronik.com'),
(12, 'Lina Marlina', 'CV Interior Rumah', 'lina@interiorrumah.com'),
(13, 'Maman Suherman', 'PT Fashion Global', 'maman@fashionglobal.com'),
(14, 'Nabila Sari', 'PT Mekanik Jaya', 'nabila@mekanikjaya.com'),
(15, 'Omar Saputra', 'CV Distributor Agro', 'omar@distributoragro.com'),
(16, 'Priska Amelia', 'PT Developer Properti', 'priska@developerproperti.com'),
(17, 'Raka Mahendra', 'CV Sparepart Motor', 'raka@sparepartmotor.com'),
(18, 'Salsa Febriani', 'PT Kemasan Plastik', 'salsa@kemasanplastik.com'),
(19, 'Toni Hartono', 'CV Supermarket Sehat', 'toni@supermarketsehat.com'),
(20, 'Ulfa Azzahra', 'PT Infrastruktur Nasional', 'ulfa@infrastruktur.com'),
(21, 'Vito Prakoso', 'PT Energi Nusantara', 'vito@energinusantara.com'),
(22, 'Wulan Pertiwi', 'PT Industri Baja Nasional', 'wulan@industribaja.com'),
(23, 'Xavier Mahendra', 'CV Material Bangunan Abadi', 'xavier@materialabadi.com'),
(24, 'Yudha Saputra', 'PT Manufaktur Logam Timur', 'yudha@logamtimurbuyer.com'),
(25, 'Zahra Amelia', 'PT Ekspor Mineral Asia', 'zahra@ekspormineral.com'),
(26, 'Ariel Firmansyah', 'PT Baterai Kendaraan Listrik', 'ariel@bateraiev.com'),
(27, 'Bianca Lestari', 'PT Perhiasan Global', 'bianca@perhiasanglobal.com'),
(28, 'Cesar Nugroho', 'PT Konstruksi Baja Raya', 'cesar@konstruksibaja.com'),
(29, 'Dinda Maharani', 'CV Batu Alam Sentosa', 'dinda@batualamsentosa.com'),
(30, 'Egi Ramadhan', 'PT Kimia Industri Prima', 'egi@kimiaindustri.com'),
(31, 'Irfan Saputra', 'PT Manufaktur Abadi', 'irfan@manufakturabadi.com'),
(32, 'Clara Febriani', 'CV Interior Modern Jaya', 'clara@interiormodernjaya.com'),
(33, 'Oscar Wijaya', 'PT Perhiasan Eksklusif Indonesia', 'oscar@perhiasan-eksklusif.com'),
(34, 'Miko Firmansyah', 'CV Otomotif Sentosa', 'miko@otomotifsentosa.com'),
(35, 'Gina Maharani', 'PT Properti Urban Sejahtera', 'gina@propertiurban.com'),
(36, 'Salsa Oktaviani', 'CV Supermarket Grosir Sehat', 'salsa@supermarketgrosir.com'),
(37, 'Kamal Hidayat', 'PT Konstruksi Beton Nasional', 'kamal@konstruksibeton.com'),
(38, 'Qiana Safitri', 'PT Kabel Elektrik Nasional', 'qiana@kabelelektrik.com'),
(39, 'Evelyn Kartika', 'PT Retail Komoditas Nasional', 'evelyn@retailkomoditas.com'),
(40, 'Ulfa Permatasari', 'PT Infrastruktur Megah Raya', 'ulfa@infrastrukturmegah.com'),
(41, 'Hafiz Nugroho', 'PT Mesin Produksi Nusantara', 'hafiz@mesinproduksi.com'),
(42, 'Rendi Kurniawan', 'PT Alumina Teknologi Asia', 'rendi@aluminateknologi.com'),
(43, 'Livia Andini', 'PT Kemasan Plastik Global', 'livia@kemasanplastikglobal.com'),
(44, 'Daffa Mahendra', 'PT Industri Baja Timur', 'daffa@industri-baja-timur.com'),
(45, 'Tio Nugraha', 'PT Developer Properti Mandiri', 'tio@developerproperti.com'),
(46, 'Nadia Putri', 'PT Pangan Distribusi Raya', 'nadia@pangandistribusi.com'),
(47, 'Bagus Pratama', 'PT Energi Global Mandiri', 'bagus@energiglobal.com'),
(48, 'Jasmine Amelia', 'CV Fashion Grosir Mandiri', 'jasmine@fashiongrosir.com'),
(49, 'Pandu Maulana', 'CV Sparepart Motor Abadi', 'pandu@sparepartabadi.com'),
(50, 'Fariz Ramadhan', 'CV Material Bangunan Prima', 'fariz@materialprima.com');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `komisi`
--

CREATE TABLE `komisi` (
  `id_komisi` int NOT NULL,
  `id_transaksi` int NOT NULL,
  `persentase` decimal(5,2) DEFAULT NULL,
  `jumlah` decimal(15,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `komisi`
--

INSERT INTO `komisi` (`id_komisi`, `id_transaksi`, `persentase`, `jumlah`) VALUES
(1, 1, 1.50, 10950000.00),
(2, 2, 2.35, 22442500.00),
(3, 3, 2.20, 7370000.00),
(4, 4, 1.75, 2940000.00),
(5, 5, 1.65, 19965000.00),
(6, 6, 2.00, 12400000.00),
(7, 7, 1.85, 23772500.00),
(8, 8, 2.10, 5040000.00),
(9, 9, 2.70, 54000000.00),
(10, 10, 1.95, 5557500.00),
(11, 11, 1.60, 54080000.00),
(12, 12, 1.55, 9455000.00),
(13, 13, 1.80, 15030000.00),
(14, 14, 2.00, 13800000.00),
(15, 15, 1.70, 8755000.00),
(16, 16, 2.50, 10750000.00),
(17, 17, 2.50, 55000000.00),
(18, 18, 1.80, 18900000.00),
(19, 19, 2.30, 19550000.00),
(20, 20, 1.75, 13125000.00),
(21, 21, 2.45, 10535000.00),
(22, 22, 2.75, 16775000.00),
(23, 23, 2.05, 11070000.00),
(24, 24, 2.60, 25220000.00),
(25, 25, 2.40, 37920000.00),
(26, 26, 2.25, 19912500.00),
(27, 27, 2.15, 53320000.00),
(28, 28, 2.10, 28980000.00),
(29, 29, 2.25, 15525000.00),
(30, 30, 1.90, 8930000.00),
(31, 31, 1.75, 17237500.00),
(32, 32, 1.85, 22015000.00),
(33, 33, 1.55, 51537500.00),
(34, 34, 2.45, 17517500.00),
(35, 35, 1.65, 22770000.00),
(36, 36, 2.00, 10200000.00),
(37, 37, 1.80, 11070000.00),
(38, 38, 2.05, 19680000.00),
(39, 39, 2.25, 34875000.00),
(40, 40, 2.60, 51480000.00),
(41, 41, 2.15, 10062000.00),
(42, 42, 1.95, 5577000.00),
(43, 43, 1.60, 10640000.00),
(44, 44, 1.90, 4522000.00),
(45, 45, 2.20, 48070000.00),
(46, 46, 2.00, 16500000.00),
(47, 47, 2.40, 59400000.00),
(48, 48, 2.50, 31500000.00),
(49, 49, 1.75, 7350000.00),
(50, 50, 1.80, 5976000.00),
(51, 51, 2.25, 13545000.00),
(52, 52, 1.70, 14314000.00),
(53, 53, 2.35, 3971500.00),
(54, 54, 1.85, 9897500.00),
(55, 55, 2.10, 13125000.00),
(56, 56, 2.30, 9844000.00);

-- --------------------------------------------------------

--
-- Table structure for table `log_aktivitas`
--

CREATE TABLE `log_aktivitas` (
  `id_log` int NOT NULL,
  `aktivitas` text,
  `waktu` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_04_25_211351_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `negosiasi`
--

CREATE TABLE `negosiasi` (
  `id_negosiasi` int NOT NULL,
  `id_transaksi` int NOT NULL,
  `tanggal` datetime DEFAULT NULL,
  `penawaran_harga` decimal(15,2) DEFAULT NULL,
  `catatan` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `negosiasi`
--

INSERT INTO `negosiasi` (`id_negosiasi`, `id_transaksi`, `tanggal`, `penawaran_harga`, `catatan`) VALUES
(1, 1, '2026-01-04 09:07:00', 708100000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Batu Bara Kalori Tinggi.'),
(2, 2, '2026-01-07 10:14:00', 926350000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Emas Batangan 24K.'),
(3, 3, '2026-01-09 11:21:00', 324950000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Server Rack Enterprise.'),
(4, 4, '2026-01-11 12:28:00', 159600000.00, 'Buyer masih menunggu konfirmasi internal sebelum melanjutkan transaksi. Produk: Meja Kantor Premium.'),
(5, 5, '2026-01-17 13:35:00', 1161600000.00, 'Harga dan ketentuan pembayaran masih dalam proses negosiasi. Produk: Bijih Nikel Laterit.'),
(6, 6, '2026-01-21 14:42:00', 601400000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Beras Premium 50 Ton.'),
(7, 7, '2026-01-26 15:49:00', 1246450000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Timah Ingot.'),
(8, 8, '2026-01-31 16:56:00', 232800000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Laptop Bisnis Seri X.'),
(9, 9, '2026-02-02 08:03:00', 1900000000.00, 'Buyer masih menunggu konfirmasi internal sebelum melanjutkan transaksi. Produk: Mesin CNC Industri.'),
(10, 10, '2026-02-04 09:10:00', 276450000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Kain Katun Ekspor.'),
(11, 11, '2026-02-08 10:17:00', 3244800000.00, 'Harga dan ketentuan pembayaran masih dalam proses negosiasi. Produk: Unit Ruko Komersial.'),
(12, 12, '2026-02-12 11:24:00', 585600000.00, 'Harga dan ketentuan pembayaran masih dalam proses negosiasi. Produk: Mangan Ore.'),
(13, 13, '2026-02-17 12:31:00', 809950000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Bauksit Mentah.'),
(14, 14, '2026-02-22 13:38:00', 669300000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Konsentrat Seng.'),
(15, 15, '2026-02-28 14:45:00', 489250000.00, 'Buyer masih menunggu konfirmasi internal sebelum melanjutkan transaksi. Produk: Pasir Kuarsa Industri.'),
(16, 16, '2026-03-09 15:52:00', 417100000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Pasir Silika Industri.'),
(17, 17, '2026-03-17 16:59:00', 2134000000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Konsentrat Tembaga Premium.'),
(18, 18, '2026-03-20 17:06:00', 1018500000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Konsentrat Nikel Sulfida.'),
(19, 19, '2026-03-23 09:13:00', 807500000.00, 'Buyer masih menunggu konfirmasi internal sebelum melanjutkan transaksi. Produk: Bijih Besi Magnetit.'),
(20, 20, '2026-03-25 10:20:00', 712500000.00, 'Buyer masih menunggu konfirmasi internal sebelum melanjutkan transaksi. Produk: Minyak Goreng Curah.'),
(21, 21, '2026-03-28 11:27:00', 404200000.00, 'Transaksi dibatalkan karena syarat dari salah satu pihak tidak terpenuhi. Produk: Tanah Kavling Komersial.'),
(22, 22, '2026-03-31 12:34:00', 585600000.00, 'Harga dan ketentuan pembayaran masih dalam proses negosiasi. Produk: Ban Motor Grosir.'),
(23, 23, '2026-04-03 13:41:00', 523800000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Biji Plastik PP.'),
(24, 24, '2026-04-06 14:48:00', 931200000.00, 'Harga dan ketentuan pembayaran masih dalam proses negosiasi. Produk: Resin Plastik Industri.'),
(25, 25, '2026-04-09 15:55:00', 1532600000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Nikel Matte.'),
(26, 26, '2026-04-11 16:02:00', 858450000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Pakaian Jadi Ekspor.'),
(27, 27, '2026-04-14 17:09:00', 2405600000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Panel Beton Jalan Raya.'),
(28, 28, '2026-04-17 09:16:00', 1324800000.00, 'Harga dan ketentuan pembayaran masih dalam proses negosiasi. Produk: Lemari Arsip Besi.'),
(29, 29, '2026-04-20 10:23:00', 648600000.00, 'Transaksi dibatalkan karena syarat dari salah satu pihak tidak terpenuhi. Produk: Bijih Emas Kadar Tinggi.'),
(30, 30, '2026-04-24 11:30:00', 455900000.00, 'Harga disepakati setelah proses negosiasi dan pengecekan kelengkapan dokumen. Produk: Mineral Dolomit Industri.');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id_produk` int NOT NULL,
  `nama_produk` varchar(100) DEFAULT NULL,
  `jenis` varchar(50) DEFAULT NULL,
  `harga_awal` decimal(15,2) DEFAULT NULL,
  `id_seller` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id_produk`, `nama_produk`, `jenis`, `harga_awal`, `id_seller`) VALUES
(1, 'Batu Bara Kalori Tinggi', 'Tambang', 750000000.00, 1),
(2, 'Server Rack Enterprise', 'Non-Tambang', 350000000.00, 21),
(3, 'Emas Batangan 24K', 'Tambang', 980000000.00, 3),
(4, 'Meja Kantor Premium', 'Non-Tambang', 175000000.00, 12),
(5, 'Bijih Nikel Laterit', 'Tambang', 1250000000.00, 2),
(6, 'Laptop Bisnis Seri X', 'Non-Tambang', 250000000.00, 11),
(7, 'Timah Ingot', 'Tambang', 1320000000.00, 7),
(8, 'Mesin CNC Industri', 'Non-Tambang', 2100000000.00, 14),
(9, 'Bijih Besi Magnetit', 'Tambang', 875000000.00, 28),
(10, 'Beras Premium 50 Ton', 'Non-Tambang', 650000000.00, 15),
(11, 'Pasir Kuarsa Industri', 'Tambang', 540000000.00, 23),
(12, 'Kain Katun Ekspor', 'Non-Tambang', 300000000.00, 13),
(13, 'Mangan Ore', 'Tambang', 640000000.00, 8),
(14, 'Bauksit Mentah', 'Tambang', 870000000.00, 6),
(15, 'Konsentrat Seng', 'Tambang', 710000000.00, 10),
(16, 'Unit Ruko Komersial', 'Non-Tambang', 3500000000.00, 16),
(17, 'Pasir Silika Industri', 'Tambang', 450000000.00, 4),
(18, 'Konsentrat Tembaga Premium', 'Tambang', 2300000000.00, 24),
(19, 'Minyak Goreng Curah', 'Non-Tambang', 780000000.00, 19),
(20, 'Panel Beton Jalan Raya', 'Non-Tambang', 2600000000.00, 20),
(21, 'Konsentrat Nikel Sulfida', 'Tambang', 1100000000.00, 21),
(22, 'Nikel Matte', 'Tambang', 1650000000.00, 26),
(23, 'Resin Plastik Industri', 'Non-Tambang', 1010000000.00, 18),
(24, 'Tanah Kavling Komersial', 'Non-Tambang', 450000000.00, 16),
(25, 'Bijih Emas Kadar Tinggi', 'Tambang', 720000000.00, 25),
(26, 'Pakaian Jadi Ekspor', 'Non-Tambang', 920000000.00, 13),
(27, 'Ban Motor Grosir', 'Non-Tambang', 640000000.00, 17),
(28, 'Biji Plastik PP', 'Non-Tambang', 560000000.00, 18),
(29, 'Lemari Arsip Besi', 'Non-Tambang', 1450000000.00, 12),
(30, 'Mineral Dolomit Industri', 'Tambang', 490000000.00, 30),
(31, 'Bijih Nikel Saprolit', 'Tambang', 1420000000.00, 26),
(32, 'Pasir Zirkon', 'Tambang', 930000000.00, 23),
(33, 'Konsentrat Timah Ekspor', 'Tambang', 1560000000.00, 7),
(34, 'Pasir Silika Grade A', 'Tambang', 575000000.00, 4),
(35, 'Batu Bara Kalori Rendah', 'Tambang', 610000000.00, 22),
(36, 'Bijih Besi Hematit', 'Tambang', 990000000.00, 28),
(37, 'Konsentrat Seng Premium', 'Tambang', 845000000.00, 10),
(38, 'Batu Kapur Industri', 'Tambang', 385000000.00, 29),
(39, 'Konsentrat Tembaga Sulfida', 'Tambang', 2420000000.00, 24),
(40, 'Bijih Mangan Premium', 'Tambang', 735000000.00, 8),
(41, 'Konsentrat Bauksit Premium', 'Tambang', 1180000000.00, 6),
(42, 'Batu Andesit Split', 'Tambang', 420000000.00, 29),
(43, 'Konsentrat Emas Sulfida', 'Tambang', 1875000000.00, 27),
(44, 'Mineral Kuarsa Putih', 'Tambang', 645000000.00, 23),
(45, 'Kain Denim Roll Ekspor', 'Non-Tambang', 560000000.00, 33),
(46, 'Kabel Tembaga Industri', 'Non-Tambang', 690000000.00, 38),
(47, 'Komponen Elektronik Grosir', 'Non-Tambang', 470000000.00, 31),
(48, 'Mesin Packing Otomatis', 'Non-Tambang', 820000000.00, 32);

-- --------------------------------------------------------

--
-- Table structure for table `produk_nontambang`
--

CREATE TABLE `produk_nontambang` (
  `id_produknontambang` int NOT NULL,
  `kategori` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `produk_nontambang`
--

INSERT INTO `produk_nontambang` (`id_produknontambang`, `kategori`) VALUES
(2, 'Teknologi Informasi'),
(4, 'Furnitur'),
(6, 'Elektronik'),
(8, 'Mesin Industri'),
(10, 'Agrikultur'),
(12, 'Tekstil'),
(16, 'Properti'),
(19, 'Pangan'),
(20, 'Konstruksi'),
(23, 'Bahan Plastik'),
(24, 'Properti'),
(26, 'Fashion'),
(27, 'Otomotif'),
(28, 'Bahan Plastik'),
(29, 'Furnitur Kantor'),
(45, 'Tekstil'),
(46, 'Komponen Listrik'),
(47, 'Elektronik'),
(48, 'Mesin Industri');

-- --------------------------------------------------------

--
-- Table structure for table `produk_tambang`
--

CREATE TABLE `produk_tambang` (
  `id_produktambang` int NOT NULL,
  `jenis_material` varchar(100) DEFAULT NULL,
  `kadar` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `produk_tambang`
--

INSERT INTO `produk_tambang` (`id_produktambang`, `jenis_material`, `kadar`) VALUES
(1, 'Batu Bara', 'GAR 5800 kcal/kg'),
(3, 'Emas', 'Au 99.99%'),
(5, 'Nikel Laterit', 'Ni 1.8%'),
(7, 'Timah', 'Sn 99.9%'),
(9, 'Bijih Besi Magnetit', 'Fe 65%'),
(11, 'Pasir Kuarsa', 'SiO2 98%'),
(13, 'Mangan', 'Mn 42%'),
(14, 'Bauksit', 'Al2O3 48%'),
(15, 'Seng', 'Zn 55%'),
(17, 'Pasir Silika', 'SiO2 96%'),
(18, 'Tembaga', 'Cu 28%'),
(21, 'Nikel Sulfida', 'Ni 2.1%'),
(22, 'Nikel Matte', 'Ni 75%'),
(25, 'Bijih Emas', 'Au 12 g/t'),
(30, 'Dolomit', 'MgO 20%'),
(31, 'Nikel Saprolit', 'Ni 2.0%'),
(32, 'Zirkon', 'ZrO2 65%'),
(33, 'Timah', 'Sn 98.7%'),
(34, 'Pasir Silika', 'SiO2 99%'),
(35, 'Batu Bara', 'GAR 4200 kcal/kg'),
(36, 'Bijih Besi Hematit', 'Fe 64%'),
(37, 'Seng', 'Zn 58%'),
(38, 'Batu Kapur', 'CaCO3 92%'),
(39, 'Tembaga Sulfida', 'Cu 31%'),
(40, 'Mangan', 'Mn 48%'),
(41, 'Bauksit', 'Al2O3 52%'),
(42, 'Batu Andesit', 'Ukuran split 1/2 dan 2/3'),
(43, 'Emas Sulfida', 'Au 18 g/t'),
(44, 'Kuarsa Putih', 'SiO2 97%');

-- --------------------------------------------------------

--
-- Table structure for table `riwayat_transaksi`
--

CREATE TABLE `riwayat_transaksi` (
  `id_riwayat` int NOT NULL,
  `id_transaksi` int NOT NULL,
  `id_buyer` int NOT NULL,
  `id_seller` int NOT NULL,
  `tanggal_riwayat` datetime DEFAULT CURRENT_TIMESTAMP,
  `status_riwayat` enum('pending','nego','deal','batal','dibayar','selesai') NOT NULL,
  `keterangan` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `riwayat_transaksi`
--

INSERT INTO `riwayat_transaksi` (`id_riwayat`, `id_transaksi`, `id_buyer`, `id_seller`, `tanggal_riwayat`, `status_riwayat`, `keterangan`) VALUES
(1, 1, 21, 1, '2026-01-05 11:05:00', 'selesai', 'Transaksi Batu Bara Kalori Tinggi sudah selesai diproses.'),
(2, 2, 3, 3, '2026-01-08 12:10:00', 'dibayar', 'Pembayaran transaksi Emas Batangan 24K sudah diterima sebagian atau penuh.'),
(3, 3, 11, 21, '2026-01-10 13:15:00', 'dibayar', 'Pembayaran transaksi Server Rack Enterprise sudah diterima sebagian atau penuh.'),
(4, 4, 12, 12, '2026-01-12 14:20:00', 'pending', 'Transaksi Meja Kantor Premium masih menunggu keputusan lanjutan.'),
(5, 5, 2, 2, '2026-01-18 15:25:00', 'nego', 'Transaksi Bijih Nikel Laterit masih berada pada tahap negosiasi.'),
(6, 6, 19, 15, '2026-01-22 16:30:00', 'dibayar', 'Pembayaran transaksi Beras Premium 50 Ton sudah diterima sebagian atau penuh.'),
(7, 7, 7, 7, '2026-01-27 17:35:00', 'selesai', 'Transaksi Timah Ingot sudah selesai diproses.'),
(8, 8, 11, 11, '2026-02-01 10:40:00', 'dibayar', 'Pembayaran transaksi Laptop Bisnis Seri X sudah diterima sebagian atau penuh.'),
(9, 9, 14, 14, '2026-02-03 11:45:00', 'pending', 'Transaksi Mesin CNC Industri masih menunggu keputusan lanjutan.'),
(10, 10, 13, 13, '2026-02-05 12:50:00', 'selesai', 'Transaksi Kain Katun Ekspor sudah selesai diproses.'),
(11, 11, 16, 16, '2026-02-09 13:55:00', 'nego', 'Transaksi Unit Ruko Komersial masih berada pada tahap negosiasi.'),
(12, 12, 8, 8, '2026-02-13 14:00:00', 'nego', 'Transaksi Mangan Ore masih berada pada tahap negosiasi.'),
(13, 13, 6, 6, '2026-02-18 15:05:00', 'deal', 'Transaksi Bauksit Mentah berhasil mencapai kesepakatan harga.'),
(14, 14, 10, 10, '2026-02-23 16:10:00', 'deal', 'Transaksi Konsentrat Seng berhasil mencapai kesepakatan harga.'),
(15, 15, 23, 23, '2026-03-01 17:15:00', 'pending', 'Transaksi Pasir Kuarsa Industri masih menunggu keputusan lanjutan.'),
(16, 16, 4, 4, '2026-03-10 10:20:00', 'dibayar', 'Pembayaran transaksi Pasir Silika Industri sudah diterima sebagian atau penuh.'),
(17, 17, 24, 24, '2026-03-18 11:25:00', 'deal', 'Transaksi Konsentrat Tembaga Premium berhasil mencapai kesepakatan harga.'),
(18, 18, 25, 21, '2026-03-21 12:30:00', 'dibayar', 'Pembayaran transaksi Konsentrat Nikel Sulfida sudah diterima sebagian atau penuh.'),
(19, 19, 28, 28, '2026-03-24 13:35:00', 'pending', 'Transaksi Bijih Besi Magnetit masih menunggu keputusan lanjutan.'),
(20, 20, 19, 19, '2026-03-26 14:40:00', 'pending', 'Transaksi Minyak Goreng Curah masih menunggu keputusan lanjutan.'),
(21, 21, 29, 16, '2026-03-29 15:45:00', 'batal', 'Transaksi Tanah Kavling Komersial dibatalkan dan tidak dilanjutkan.'),
(22, 22, 17, 17, '2026-04-01 16:50:00', 'nego', 'Transaksi Ban Motor Grosir masih berada pada tahap negosiasi.'),
(23, 23, 18, 18, '2026-04-04 17:55:00', 'deal', 'Transaksi Biji Plastik PP berhasil mencapai kesepakatan harga.'),
(24, 24, 18, 18, '2026-04-07 10:00:00', 'nego', 'Transaksi Resin Plastik Industri masih berada pada tahap negosiasi.'),
(25, 25, 26, 26, '2026-04-10 11:05:00', 'selesai', 'Transaksi Nikel Matte sudah selesai diproses.'),
(26, 26, 13, 13, '2026-04-12 12:10:00', 'selesai', 'Transaksi Pakaian Jadi Ekspor sudah selesai diproses.'),
(27, 27, 20, 20, '2026-04-15 13:15:00', 'deal', 'Transaksi Panel Beton Jalan Raya berhasil mencapai kesepakatan harga.'),
(28, 28, 12, 12, '2026-04-18 14:20:00', 'nego', 'Transaksi Lemari Arsip Besi masih berada pada tahap negosiasi.'),
(29, 29, 25, 25, '2026-04-21 15:25:00', 'batal', 'Transaksi Bijih Emas Kadar Tinggi dibatalkan dan tidak dilanjutkan.'),
(30, 30, 30, 30, '2026-04-25 16:30:00', 'deal', 'Transaksi Mineral Dolomit Industri berhasil mencapai kesepakatan harga.'),
(31, 31, 43, 18, '2026-05-01 14:45:00', 'selesai', 'Transaksi resin plastik industri sudah selesai diproses oleh broker.'),
(32, 41, 30, 30, '2026-05-13 12:00:00', 'selesai', 'Transaksi mineral dolomit industri sudah selesai dan terdokumentasi.'),
(33, 36, 23, 23, '2026-05-07 10:25:00', 'pending', 'Transaksi pasir kuarsa industri menunggu hasil validasi kualitas produk.'),
(34, 34, 47, 1, '2026-05-05 15:30:00', 'deal', 'Transaksi batu bara kalori tinggi berhasil disepakati oleh buyer dan seller.'),
(35, 39, 42, 26, '2026-05-11 13:20:00', 'nego', 'Transaksi nikel matte masih membahas skema pembayaran dan pengiriman.'),
(36, 42, 48, 13, '2026-05-14 14:10:00', 'dibayar', 'Pembayaran transaksi kain katun ekspor sudah diterima oleh seller.'),
(37, 43, 25, 25, '2026-05-15 17:05:00', 'batal', 'Transaksi bijih emas kadar tinggi dibatalkan karena syarat pengiriman tidak disetujui.'),
(38, 47, 40, 20, '2026-05-19 16:30:00', 'deal', 'Transaksi panel beton jalan raya berhasil mencapai kesepakatan harga.'),
(39, 50, 11, 21, '2026-05-26 13:15:00', 'selesai', 'Transaksi server rack enterprise sudah selesai diproses.'),
(40, 55, 46, 15, '2026-06-07 11:50:00', 'nego', 'Transaksi beras premium masih dinegosiasikan terkait volume pembelian.'),
(41, 57, 25, 21, '2026-06-10 16:40:00', 'dibayar', 'Pembayaran transaksi konsentrat nikel sulfida sudah diterima sebagian.'),
(42, 60, 36, 19, '2026-06-15 15:10:00', 'nego', 'Transaksi minyak goreng curah masih dalam tahap negosiasi harga dan pengiriman.'),
(43, 61, 50, 20, '2026-07-04 14:20:00', 'dibayar', 'Pembayaran awal transaksi panel beton jalan raya sudah diterima oleh seller.'),
(44, 62, 26, 26, '2026-07-09 12:30:00', 'nego', 'Transaksi bijih nikel saprolit masih dalam tahap negosiasi harga dan volume.'),
(45, 64, 27, 27, '2026-07-18 15:10:00', 'selesai', 'Transaksi konsentrat emas sulfida telah selesai diproses dan terdokumentasi.'),
(46, 65, 14, 14, '2026-07-23 16:15:00', 'dibayar', 'Pembayaran transaksi mesin CNC industri sudah diterima sebagian.'),
(47, 66, 24, 24, '2026-07-27 17:05:00', 'deal', 'Transaksi konsentrat tembaga premium berhasil mencapai kesepakatan harga.'),
(48, 68, 44, 24, '2026-08-06 16:35:00', 'deal', 'Transaksi konsentrat tembaga sulfida berhasil deal dengan nilai transaksi tinggi.'),
(49, 72, 7, 7, '2026-08-25 13:25:00', 'selesai', 'Transaksi konsentrat timah ekspor sudah selesai diproses oleh broker.'),
(50, 73, 45, 16, '2026-08-29 11:45:00', 'nego', 'Negosiasi unit ruko komersial masih berjalan karena nilai transaksi sangat besar.');

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `id_seller` int NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `perusahaan` varchar(100) DEFAULT NULL,
  `kontak` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`id_seller`, `nama`, `perusahaan`, `kontak`) VALUES
(1, 'Agus Salim', 'PT Batu Bara Nusantara', 'agus@bbn.com'),
(2, 'Bagas Prakoso', 'PT Nikel Indonesia', 'bagas@nikelindo.com'),
(3, 'Cahyo Wibowo', 'PT Emas Sejahtera', 'cahyo@emassejahtera.com'),
(4, 'Dian Puspita', 'PT Pasir Mineral', 'dian@pasirmineral.com'),
(5, 'Erna Susanti', 'PT Tembaga Raya', 'erna@tembagaraya.com'),
(6, 'Farhan Akbar', 'PT Bauksit Makmur', 'farhan@bauksitmakmur.com'),
(7, 'Galih Ramadhan', 'PT Timah Sentosa', 'galih@timahsentosa.com'),
(8, 'Hani Safitri', 'PT Mineral Jaya', 'hani@mineraljaya.com'),
(9, 'Ilham Fauzi', 'PT Tambang Mandiri', 'ilham@tambangmandiri.com'),
(10, 'Julia Anjani', 'PT Logam Prima', 'julia@logamprima.com'),
(11, 'Kurniawan', 'CV Elektronik Maju', 'kurniawan@elektronikmaju.com'),
(12, 'Laras Dewanti', 'PT Furnitur Indah', 'laras@furniturindah.com'),
(13, 'Miko Saputra', 'CV Tekstil Nusantara', 'miko@tekstilnusantara.com'),
(14, 'Nia Ramadhani', 'PT Mesin Global', 'nia@mesinglobal.com'),
(15, 'Oscar Wijaya', 'CV Agro Lestari', 'oscar@agrolestari.com'),
(16, 'Pandu Hidayat', 'PT Properti Makmur', 'pandu@propertimakmur.com'),
(17, 'Qori Pratama', 'CV Otomotif Jaya', 'qori@otomotifjaya.com'),
(18, 'Rani Kusuma', 'PT Plastik Sentosa', 'rani@plastiksentosa.com'),
(19, 'Surya Darma', 'CV Pangan Sehat', 'surya@pangansehat.com'),
(20, 'Tiara Amelia', 'PT Konstruksi Raya', 'tiara@konstruksiraya.com'),
(21, 'Umar Maulana', 'PT Mineral Sulawesi', 'umar@mineralsulawesi.com'),
(22, 'Vina Kartika', 'PT Batubara Kalimantan', 'vina@batubarakalimantan.com'),
(23, 'Wahyu Prasetyo', 'PT Silika Mandiri', 'wahyu@silikamandiri.com'),
(24, 'Yuni Lestari', 'PT Logam Timur', 'yuni@logamtimur.com'),
(25, 'Zaki Ramadhan', 'PT Tambang Papua', 'zaki@tambangpapua.com'),
(26, 'Arif Budiman', 'PT Nikel Sejahtera', 'arif@nikelsejahtera.com'),
(27, 'Bunga Amelia', 'PT Emas Prima', 'bunga@emasprima.com'),
(28, 'Coki Firmansyah', 'PT Besi Sentosa', 'coki@besisentosa.com'),
(29, 'Dara Maharani', 'PT Batu Alam Raya', 'dara@batualamraya.com'),
(30, 'Oki Pranata', 'PT Infrastruktur Beton', 'oki@infrastrukturbeton.com'),
(31, 'Ayu Pramesti', 'CV Sumber Makmur Jaya', 'ayu@sumbermakmurjaya.com'),
(32, 'Novi Kartika', 'PT Peralatan Industri Global', 'novi@peralatanindustri.com'),
(33, 'Fadli Ramadhan', 'PT Tekstil Ekspor Indonesia', 'fadli@tekstil-ekspor.com'),
(34, 'Mira Anggraeni', 'PT Baja Konstruksi Mandiri', 'mira@bajakonstruksi.com'),
(35, 'Putri Lestari', 'CV Furnitur Berkah Abadi', 'putri@furniturberkah.com'),
(36, 'Rama Wijaya', 'PT Logistik Mineral Asia', 'rama@logistikmineralasia.com'),
(37, 'Satrio Nugroho', 'PT Tambang Energi Timur', 'satrio@tambangenergitimur.com'),
(38, 'Yusuf Maulana', 'PT Plastik Inovasi Mandiri', 'yusuf@plastikinovasi.com'),
(39, 'Doni Saputra', 'PT Komoditas Prima Nusantara', 'doni@komoditasprima.com'),
(40, 'Reza Hidayat', 'CV Agro Niaga Sentosa', 'reza@agroniaga.com');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int NOT NULL,
  `tanggal` date DEFAULT NULL,
  `harga_deal` decimal(15,2) DEFAULT NULL,
  `status` enum('pending','nego','deal','batal') DEFAULT NULL,
  `id_produk` int NOT NULL,
  `id_buyer` int NOT NULL,
  `id_broker` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `tanggal`, `harga_deal`, `status`, `id_produk`, `id_buyer`, `id_broker`) VALUES
(1, '2026-01-05', 730000000.00, 'deal', 1, 21, 15),
(2, '2026-01-08', 955000000.00, 'deal', 3, 3, 7),
(3, '2026-01-10', 335000000.00, 'deal', 2, 11, 20),
(4, '2026-01-12', 168000000.00, 'pending', 4, 12, 19),
(5, '2026-01-18', 1210000000.00, 'nego', 5, 2, 26),
(6, '2026-01-22', 620000000.00, 'deal', 10, 19, 11),
(7, '2026-01-27', 1285000000.00, 'deal', 7, 7, 18),
(8, '2026-02-01', 240000000.00, 'deal', 6, 11, 28),
(9, '2026-02-03', 2000000000.00, 'pending', 8, 14, 29),
(10, '2026-02-05', 285000000.00, 'deal', 12, 13, 10),
(11, '2026-02-09', 3380000000.00, 'nego', 16, 16, 6),
(12, '2026-02-13', 610000000.00, 'nego', 13, 8, 12),
(13, '2026-02-18', 835000000.00, 'deal', 14, 6, 9),
(14, '2026-02-23', 690000000.00, 'deal', 15, 10, 17),
(15, '2026-03-01', 515000000.00, 'pending', 11, 23, 16),
(16, '2026-03-10', 430000000.00, 'deal', 17, 4, 3),
(17, '2026-03-18', 2200000000.00, 'deal', 18, 24, 2),
(18, '2026-03-21', 1050000000.00, 'deal', 21, 25, 8),
(19, '2026-03-24', 850000000.00, 'pending', 9, 28, 13),
(20, '2026-03-26', 750000000.00, 'pending', 19, 19, 14),
(21, '2026-03-29', 430000000.00, 'batal', 24, 29, 21),
(22, '2026-04-01', 610000000.00, 'nego', 27, 17, 22),
(23, '2026-04-04', 540000000.00, 'deal', 28, 18, 23),
(24, '2026-04-07', 970000000.00, 'nego', 23, 18, 27),
(25, '2026-04-10', 1580000000.00, 'deal', 22, 26, 24),
(26, '2026-04-12', 885000000.00, 'deal', 26, 13, 1),
(27, '2026-04-15', 2480000000.00, 'deal', 20, 20, 5),
(28, '2026-04-18', 1380000000.00, 'nego', 29, 12, 25),
(29, '2026-04-21', 690000000.00, 'batal', 25, 25, 30),
(30, '2026-04-25', 470000000.00, 'deal', 30, 30, 4),
(31, '2026-05-01', 985000000.00, 'deal', 23, 43, 35),
(32, '2026-05-03', 1190000000.00, 'nego', 5, 38, 41),
(33, '2026-05-04', 3325000000.00, 'pending', 16, 45, 22),
(34, '2026-05-05', 715000000.00, 'deal', 1, 47, 33),
(35, '2026-05-06', 1380000000.00, 'batal', 29, 32, 44),
(36, '2026-05-07', 510000000.00, 'pending', 11, 23, 36),
(37, '2026-05-08', 615000000.00, 'deal', 27, 49, 14),
(38, '2026-05-10', 960000000.00, 'deal', 3, 33, 40),
(39, '2026-05-11', 1550000000.00, 'nego', 22, 42, 31),
(40, '2026-05-12', 1980000000.00, 'pending', 8, 41, 6),
(41, '2026-05-13', 468000000.00, 'deal', 30, 30, 4),
(42, '2026-05-14', 286000000.00, 'deal', 12, 48, 37),
(43, '2026-05-15', 665000000.00, 'batal', 25, 25, 18),
(44, '2026-05-16', 238000000.00, 'deal', 6, 31, 28),
(45, '2026-05-17', 2185000000.00, 'deal', 18, 24, 2),
(46, '2026-05-18', 825000000.00, 'nego', 14, 6, 9),
(47, '2026-05-19', 2475000000.00, 'deal', 20, 40, 5),
(48, '2026-05-21', 1260000000.00, 'pending', 7, 7, 15),
(49, '2026-05-23', 420000000.00, 'batal', 24, 35, 21),
(50, '2026-05-26', 332000000.00, 'deal', 2, 11, 20),
(51, '2026-05-30', 602000000.00, 'nego', 13, 8, 12),
(52, '2026-06-02', 842000000.00, 'pending', 9, 44, 13),
(53, '2026-06-04', 169000000.00, 'deal', 4, 12, 19),
(54, '2026-06-05', 535000000.00, 'deal', 28, 43, 23),
(55, '2026-06-07', 625000000.00, 'nego', 10, 46, 11),
(56, '2026-06-09', 428000000.00, 'deal', 17, 4, 3),
(57, '2026-06-10', 1065000000.00, 'deal', 21, 25, 8),
(58, '2026-06-12', 875000000.00, 'deal', 26, 13, 1),
(59, '2026-06-14', 675000000.00, 'pending', 15, 10, 17),
(60, '2026-06-15', 740000000.00, 'nego', 19, 36, 39),
(61, '2026-07-04', 2595000000.00, 'deal', 20, 50, 42),
(62, '2026-07-09', 1515000000.00, 'nego', 31, 26, 33),
(63, '2026-07-13', 965000000.00, 'pending', 36, 28, 37),
(64, '2026-07-18', 1820000000.00, 'deal', 43, 27, 38),
(65, '2026-07-23', 2040000000.00, 'deal', 8, 14, 29),
(66, '2026-07-27', 2265000000.00, 'deal', 18, 24, 44),
(67, '2026-08-02', 1695000000.00, 'nego', 22, 49, 36),
(68, '2026-08-06', 2385000000.00, 'deal', 39, 44, 31),
(69, '2026-08-10', 1185000000.00, 'batal', 41, 42, 34),
(70, '2026-08-14', 875000000.00, 'pending', 48, 41, 45),
(71, '2026-08-19', 1480000000.00, 'deal', 29, 12, 25),
(72, '2026-08-25', 1275000000.00, 'deal', 33, 7, 40),
(73, '2026-08-29', 3425000000.00, 'nego', 16, 45, 35);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `broker`
--
ALTER TABLE `broker`
  ADD PRIMARY KEY (`id_broker`),
  ADD KEY `id_broker_senior` (`id_broker_senior`);

--
-- Indexes for table `buyer`
--
ALTER TABLE `buyer`
  ADD PRIMARY KEY (`id_buyer`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `komisi`
--
ALTER TABLE `komisi`
  ADD PRIMARY KEY (`id_transaksi`,`id_komisi`);

--
-- Indexes for table `log_aktivitas`
--
ALTER TABLE `log_aktivitas`
  ADD PRIMARY KEY (`id_log`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `negosiasi`
--
ALTER TABLE `negosiasi`
  ADD PRIMARY KEY (`id_negosiasi`),
  ADD KEY `id_transaksi` (`id_transaksi`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id_produk`),
  ADD KEY `id_seller` (`id_seller`);

--
-- Indexes for table `produk_nontambang`
--
ALTER TABLE `produk_nontambang`
  ADD PRIMARY KEY (`id_produknontambang`);

--
-- Indexes for table `produk_tambang`
--
ALTER TABLE `produk_tambang`
  ADD PRIMARY KEY (`id_produktambang`);

--
-- Indexes for table `riwayat_transaksi`
--
ALTER TABLE `riwayat_transaksi`
  ADD PRIMARY KEY (`id_riwayat`),
  ADD KEY `id_transaksi` (`id_transaksi`),
  ADD KEY `id_buyer` (`id_buyer`),
  ADD KEY `id_seller` (`id_seller`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`id_seller`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `id_produk` (`id_produk`),
  ADD KEY `id_buyer` (`id_buyer`),
  ADD KEY `id_broker` (`id_broker`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `broker`
--
ALTER TABLE `broker`
  MODIFY `id_broker` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `buyer`
--
ALTER TABLE `buyer`
  MODIFY `id_buyer` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `log_aktivitas`
--
ALTER TABLE `log_aktivitas`
  MODIFY `id_log` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `negosiasi`
--
ALTER TABLE `negosiasi`
  MODIFY `id_negosiasi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id_produk` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `riwayat_transaksi`
--
ALTER TABLE `riwayat_transaksi`
  MODIFY `id_riwayat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `seller`
--
ALTER TABLE `seller`
  MODIFY `id_seller` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `broker`
--
ALTER TABLE `broker`
  ADD CONSTRAINT `broker_ibfk_1` FOREIGN KEY (`id_broker_senior`) REFERENCES `broker` (`id_broker`);

--
-- Constraints for table `komisi`
--
ALTER TABLE `komisi`
  ADD CONSTRAINT `komisi_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`);

--
-- Constraints for table `negosiasi`
--
ALTER TABLE `negosiasi`
  ADD CONSTRAINT `negosiasi_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`);

--
-- Constraints for table `produk`
--
ALTER TABLE `produk`
  ADD CONSTRAINT `produk_ibfk_1` FOREIGN KEY (`id_seller`) REFERENCES `seller` (`id_seller`);

--
-- Constraints for table `produk_nontambang`
--
ALTER TABLE `produk_nontambang`
  ADD CONSTRAINT `produk_nontambang_ibfk_1` FOREIGN KEY (`id_produknontambang`) REFERENCES `produk` (`id_produk`);

--
-- Constraints for table `produk_tambang`
--
ALTER TABLE `produk_tambang`
  ADD CONSTRAINT `produk_tambang_ibfk_1` FOREIGN KEY (`id_produktambang`) REFERENCES `produk` (`id_produk`);

--
-- Constraints for table `riwayat_transaksi`
--
ALTER TABLE `riwayat_transaksi`
  ADD CONSTRAINT `riwayat_transaksi_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`),
  ADD CONSTRAINT `riwayat_transaksi_ibfk_2` FOREIGN KEY (`id_buyer`) REFERENCES `buyer` (`id_buyer`),
  ADD CONSTRAINT `riwayat_transaksi_ibfk_3` FOREIGN KEY (`id_seller`) REFERENCES `seller` (`id_seller`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`),
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_buyer`) REFERENCES `buyer` (`id_buyer`),
  ADD CONSTRAINT `transaksi_ibfk_3` FOREIGN KEY (`id_broker`) REFERENCES `broker` (`id_broker`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
