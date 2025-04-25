-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 25, 2025 at 09:10 AM
-- Server version: 8.4.3
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `datn-spr2025`
--

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` bigint UNSIGNED NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `type` enum('main','intro','advertisement') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'advertisement',
  `product_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `image`, `link`, `status`, `type`, `product_id`, `created_at`, `updated_at`) VALUES
(1, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743238446/banner/rne0ndklryr2cloaqhkk.png', NULL, 'ACTIVE', 'main', NULL, NULL, NULL),
(3, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743236959/djmhbop2ctsqzaogaeo1.png', NULL, 'ACTIVE', 'advertisement', NULL, NULL, NULL),
(4, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743237285/banner/xfxw4lx1ctnjponqgjpu.png', NULL, 'ACTIVE', 'advertisement', NULL, NULL, NULL),
(5, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743411103/products/vl26ty7bt6nhya9jepon.png', NULL, 'ACTIVE', 'advertisement', NULL, NULL, '2025-03-31 08:51:41'),
(10, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743239499/banner/hea8w6ninhoujmmntukv.png', NULL, 'ACTIVE', 'main', NULL, '2025-03-07 17:07:25', '2025-03-07 17:07:28'),
(18, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1744270701/products/cjddtpyk9ewjborqjqqf.png', 'http://localhost:5173/products/38', 'ACTIVE', 'main', 38, '2025-04-10 07:38:20', '2025-04-10 07:38:20');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` bigint NOT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `product_id`, `quantity`, `color`, `size`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 41, 2, 'black', 'L', 19, '2025-04-24 04:26:18', '2025-04-24 04:26:56'),
(2, 42, 1, 'black', 'M', 19, '2025-04-24 04:26:28', '2025-04-24 04:26:28'),
(3, 41, 1, 'black', 'XL', 19, '2025-04-24 04:26:51', '2025-04-24 04:26:51');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `parent_id` bigint DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `gender` enum('women','men') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `parent_id`, `name`, `image`, `gender`, `created_at`, `updated_at`, `description`) VALUES
(1, NULL, 'Quần Áo Nam ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743406327/products/zrh7eesrf4mxnnucolmc.webp', 'men', '2025-03-01 10:00:00', '2025-03-31 07:32:06', 'All types of clothing for women'),
(2, NULL, 'Giày Nam ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743150785/Category/cu1m9dzkgjgo41pttmuc.webp', 'men', '2025-03-01 10:10:00', '2025-03-01 10:10:00', 'Different styles of shoes for women'),
(3, NULL, 'Phụ Kiện Nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743151030/Category/npmrprlcgkwnhfadhnxl.webp', 'men', '2025-03-01 10:20:00', '2025-03-01 10:20:00', 'Fashion accessories for women'),
(4, NULL, 'Quần Áo Nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743150763/Category/vhyxgqyx9t99igs8qymk.webp', 'women', '2025-03-01 10:30:00', '2025-03-01 10:30:00', 'All types of clothing for men'),
(5, NULL, 'Giày Nữ ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743150828/Category/ocy8agdzevbmggawif4x.webp', 'women', '2025-03-01 10:40:00', '2025-03-01 10:40:00', 'Different styles of shoes for men'),
(6, NULL, 'Phụ Kiện Nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743151034/Category/mx1pa3sjq04yj9g8exc6.webp', 'women', '2025-03-01 10:50:00', '2025-03-01 10:50:00', 'Fashion accessories for men'),
(114, 1, 'Áo sơ mi nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'men', NULL, NULL, 'Men\'s shirts'),
(115, 1, 'Quần tây nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'men', NULL, NULL, 'Men\'s trousers'),
(116, 1, 'Áo thun nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'men', NULL, NULL, 'Men\'s t-shirts'),
(117, 1, 'Quần jeans nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'men', NULL, NULL, 'Men\'s jeans'),
(118, 1, 'Áo khoác nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'men', NULL, NULL, 'Men\'s jackets'),
(119, 2, 'Giày thể thao nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'men', NULL, NULL, 'Men\'s sneakers'),
(120, 2, 'Giày tây nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'men', NULL, NULL, 'Men\'s dress shoes'),
(121, 2, 'Giày lười nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'men', NULL, NULL, 'Men\'s loafers'),
(122, 2, 'Dép nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'men', NULL, NULL, 'Men\'s sandals'),
(123, 3, 'Đồng hồ nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'men', NULL, NULL, 'Men\'s watches'),
(124, 3, 'Ví nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'men', NULL, NULL, 'Men\'s wallets'),
(125, 3, 'Thắt lưng nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'men', NULL, NULL, 'Men\'s belts'),
(126, 3, 'Kính râm nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'men', NULL, NULL, 'Men\'s sunglasses'),
(127, 4, 'Váy nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'women', NULL, NULL, 'Women\'s dresses'),
(128, 4, 'Áo sơ mi nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'women', NULL, NULL, 'Women\'s shirts'),
(129, 4, 'Quần jeans nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'women', NULL, NULL, 'Women\'s jeans'),
(130, 4, 'Áo thun nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'women', NULL, NULL, 'Women\'s t-shirts'),
(131, 4, 'Áo khoác nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'women', NULL, NULL, 'Women\'s jackets'),
(132, 5, 'Giày cao gót', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'women', NULL, NULL, 'High heels'),
(133, 5, 'Giày thể thao nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'women', NULL, NULL, 'Women\'s sneakers'),
(135, 5, 'Dép nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'women', NULL, NULL, 'Women\'s sandals'),
(136, 6, 'Túi xách nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'women', NULL, NULL, 'Women\'s handbags'),
(137, 6, 'Trang sức nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'women', NULL, NULL, 'Women\'s jewelry'),
(138, 6, 'Khăn choàng nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'women', NULL, NULL, 'Women\'s scarves'),
(139, 6, 'Kính râm nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1742803691/products/xx5gha1kbfs0mq3zlgan.jpg', 'women', NULL, NULL, 'Women\'s sunglasses');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` bigint UNSIGNED NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `code`, `created_at`, `updated_at`) VALUES
(1, 'red', NULL, NULL),
(2, 'blue', NULL, NULL),
(3, 'green', NULL, NULL),
(4, 'yellow', NULL, NULL),
(5, 'black', NULL, NULL),
(6, 'white', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` bigint UNSIGNED NOT NULL,
  `parent_id` bigint DEFAULT NULL,
  `product_id` bigint UNSIGNED DEFAULT NULL,
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `parent_id`, `product_id`, `content`, `rate`, `phone_number`, `created_at`, `updated_at`) VALUES
(13, NULL, 39, 'hhhhhh', 4, '0335312222', '2025-04-04 09:37:24', '2025-04-04 09:37:24'),
(14, NULL, 39, 'hhhhhhhhhhh', 5, '0335312222', '2025-04-04 09:37:37', '2025-04-04 09:37:37'),
(15, NULL, 38, 'f', 4, '0335312222', '2025-04-08 09:23:39', '2025-04-08 09:23:39'),
(16, NULL, 38, 'fffff', 4, '0335312222', '2025-04-10 13:04:59', '2025-04-10 13:04:59');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `image_product`
--

CREATE TABLE `image_product` (
  `id` bigint UNSIGNED NOT NULL,
  `products_id` bigint UNSIGNED NOT NULL,
  `image_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `image_product`
--

INSERT INTO `image_product` (`id`, `products_id`, `image_link`, `created_at`, `updated_at`) VALUES
(57, 38, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743104339/products/ghbhsicwlrogbi8mm5hu.webp', '2025-03-27 19:39:10', '2025-03-27 19:39:10'),
(58, 38, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743104341/products/hbm477gzcx047orclyth.webp', '2025-03-27 19:39:10', '2025-03-27 19:39:10'),
(59, 38, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743104344/products/pqyjut2xhblbbdix5lnv.webp', '2025-03-27 19:39:10', '2025-03-27 19:39:10'),
(60, 38, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743104347/products/e867qb4aifi2eoykvlxo.webp', '2025-03-27 19:39:10', '2025-03-27 19:39:10'),
(61, 38, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743104349/products/vllp3rug15d9ucxcfkxv.webp', '2025-03-27 19:39:10', '2025-03-27 19:39:10'),
(70, 42, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743130764/products/apoiuugjub7gdcqapfbs.webp', '2025-03-28 02:59:32', '2025-03-28 02:59:32'),
(71, 42, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743130766/products/vboaluri2shwztgoidfj.webp', '2025-03-28 02:59:32', '2025-03-28 02:59:32'),
(72, 42, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743130769/products/ra1b5g1djlkpkbimejhq.webp', '2025-03-28 02:59:32', '2025-03-28 02:59:32'),
(73, 42, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743130771/products/tjccue7dbopunex9dnhq.webp', '2025-03-28 02:59:32', '2025-03-28 02:59:32'),
(74, 43, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743130907/products/lolarmrkqckyhnotewft.webp', '2025-03-28 03:01:56', '2025-03-28 03:01:56'),
(75, 43, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743130910/products/hulyu5wmgbktiireucbv.webp', '2025-03-28 03:01:56', '2025-03-28 03:01:56'),
(76, 43, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743130912/products/oq9wzati4nsf11dyypif.webp', '2025-03-28 03:01:56', '2025-03-28 03:01:56'),
(77, 43, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743130915/products/aw8abv4ous1yhp9ndaru.webp', '2025-03-28 03:01:56', '2025-03-28 03:01:56'),
(78, 44, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131110/products/i4kf69kedk01dfj2nm5m.webp', '2025-03-28 03:05:18', '2025-03-28 03:05:18'),
(79, 44, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131112/products/ubbskx7cewrptkhr01mw.webp', '2025-03-28 03:05:18', '2025-03-28 03:05:18'),
(80, 44, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131115/products/cfwaccfjaereaebs9xqf.webp', '2025-03-28 03:05:18', '2025-03-28 03:05:18'),
(81, 44, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131117/products/gsqfqyu21cbfsc4g6pua.webp', '2025-03-28 03:05:18', '2025-03-28 03:05:18'),
(82, 45, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131304/products/v2hvm6wb9oolrukbevg8.webp', '2025-03-28 03:08:29', '2025-03-28 03:08:29'),
(83, 45, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131306/products/heowe09i4phuxv7uahip.webp', '2025-03-28 03:08:29', '2025-03-28 03:08:29'),
(84, 45, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131309/products/em30h1kbagzduzwkioof.webp', '2025-03-28 03:08:29', '2025-03-28 03:08:29'),
(85, 46, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131472/products/td5xkmfmj0vddwhxsjvc.webp', '2025-03-28 03:11:18', '2025-03-28 03:11:18'),
(86, 46, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131475/products/wdsoewttejoq6xb7vg0f.webp', '2025-03-28 03:11:18', '2025-03-28 03:11:18'),
(87, 46, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131477/products/m8afzyezdml0ydgokqce.webp', '2025-03-28 03:11:18', '2025-03-28 03:11:18'),
(88, 47, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131735/products/bc6igvk1yp2svl7tefo6.webp', '2025-03-28 03:15:41', '2025-03-28 03:15:41'),
(89, 47, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131738/products/rosbhdazrrzrldb0caiq.webp', '2025-03-28 03:15:41', '2025-03-28 03:15:41'),
(90, 47, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131740/products/xo3tikhffizk8lq4balo.webp', '2025-03-28 03:15:41', '2025-03-28 03:15:41'),
(91, 48, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131943/products/qmjylwgfcf6xbyzgaef9.webp', '2025-03-28 03:19:11', '2025-03-28 03:19:11'),
(92, 48, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131946/products/qv3ailuokafcettin4os.webp', '2025-03-28 03:19:11', '2025-03-28 03:19:11'),
(93, 48, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131948/products/mlih75f1x3nrxdq7q5nn.webp', '2025-03-28 03:19:11', '2025-03-28 03:19:11'),
(94, 48, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131951/products/pouytkekx6gy3gphtdob.webp', '2025-03-28 03:19:11', '2025-03-28 03:19:11'),
(95, 49, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132108/products/pwyvod1itobtkbyslhyb.webp', '2025-03-28 03:21:53', '2025-03-28 03:21:53'),
(96, 49, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132110/products/q3evyrit97hx5el9kspt.webp', '2025-03-28 03:21:53', '2025-03-28 03:21:53'),
(97, 49, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132112/products/xobdawkhoo3vn85udara.webp', '2025-03-28 03:21:53', '2025-03-28 03:21:53'),
(98, 50, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132322/products/uhxskpx6mrhjjrahm5oa.webp', '2025-03-28 03:25:31', '2025-03-28 03:25:31'),
(99, 50, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132325/products/jl4vn1gotgsy4solcjvo.webp', '2025-03-28 03:25:31', '2025-03-28 03:25:31'),
(100, 50, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132327/products/k3n0veybmhmp7kth0myn.webp', '2025-03-28 03:25:31', '2025-03-28 03:25:31'),
(101, 50, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132330/products/kshxsbxuvpgwzdg5yuf6.webp', '2025-03-28 03:25:31', '2025-03-28 03:25:31'),
(102, 51, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132508/products/cev20skjwoa9w0ijch63.webp', '2025-03-28 03:28:30', '2025-03-28 03:28:30'),
(103, 51, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132510/products/kxhiez3010p4ndyvjmzq.webp', '2025-03-28 03:28:30', '2025-03-28 03:28:30'),
(104, 52, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132684/products/xgczvzo8c88tmi8mefih.webp', '2025-03-28 03:31:29', '2025-03-28 03:31:29'),
(105, 52, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132686/products/cgztkit7mzdydlqpijza.webp', '2025-03-28 03:31:29', '2025-03-28 03:31:29'),
(106, 52, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132688/products/q1fxqvpybg90oqnehpog.webp', '2025-03-28 03:31:29', '2025-03-28 03:31:29'),
(107, 53, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132809/products/vaclaqtrrkvrcvinrugs.webp', '2025-03-28 03:33:38', '2025-03-28 03:33:38'),
(108, 53, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132811/products/mjq9nlf3uismygerl0qb.webp', '2025-03-28 03:33:38', '2025-03-28 03:33:38'),
(109, 53, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132814/products/sjvzfqkp3y8kdcj5uirq.webp', '2025-03-28 03:33:38', '2025-03-28 03:33:38'),
(110, 53, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132817/products/wxyusddogy96eue5qmyp.webp', '2025-03-28 03:33:38', '2025-03-28 03:33:38'),
(111, 54, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132980/products/bsckozhsmma2vjsv4adw.webp', '2025-03-28 03:36:28', '2025-03-28 03:36:28'),
(112, 54, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132982/products/mpkoubrbfdryxdybwpaf.webp', '2025-03-28 03:36:28', '2025-03-28 03:36:28'),
(113, 54, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132985/products/yhthwmbjqk6bpjqvwhvv.webp', '2025-03-28 03:36:28', '2025-03-28 03:36:28'),
(114, 54, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132987/products/tqzkq81vne3uvwmpbwo9.webp', '2025-03-28 03:36:28', '2025-03-28 03:36:28'),
(115, 55, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133122/products/wenkr5twkycl2jt2c9ty.webp', '2025-03-28 03:38:49', '2025-03-28 03:38:49'),
(116, 55, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133124/products/cgpeimzipxpcdlv0lo7o.webp', '2025-03-28 03:38:49', '2025-03-28 03:38:49'),
(117, 55, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133126/products/lpu3mswn0yajxloazry5.webp', '2025-03-28 03:38:49', '2025-03-28 03:38:49'),
(118, 55, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133129/products/tvu9cv1xgcved0q6xifo.webp', '2025-03-28 03:38:49', '2025-03-28 03:38:49'),
(119, 56, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133261/products/zifme4sraz2t52xpr4jy.webp', '2025-03-28 03:41:04', '2025-03-28 03:41:04'),
(120, 56, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133264/products/bmnvojcavsthaiuj7re3.webp', '2025-03-28 03:41:04', '2025-03-28 03:41:04'),
(121, 57, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133414/products/uspigmind6j23vsuppx5.webp', '2025-03-28 03:43:37', '2025-03-28 03:43:37'),
(122, 57, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133417/products/ey3kak8vjjk7xtmindsw.webp', '2025-03-28 03:43:37', '2025-03-28 03:43:37'),
(123, 58, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133536/products/gftjxsabxwmwlifyj0lq.webp', '2025-03-28 03:45:45', '2025-03-28 03:45:45'),
(124, 58, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133539/products/pn6anfzb6gdnt2elqttz.webp', '2025-03-28 03:45:45', '2025-03-28 03:45:45'),
(125, 58, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133540/products/hgi8qrogob5s1zxkaniu.webp', '2025-03-28 03:45:45', '2025-03-28 03:45:45'),
(126, 58, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133542/products/wwfxnio498xhcdtjw4lg.webp', '2025-03-28 03:45:45', '2025-03-28 03:45:45'),
(127, 58, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133545/products/sot2n0c0862ldzes8xtp.webp', '2025-03-28 03:45:45', '2025-03-28 03:45:45'),
(128, 59, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133694/products/soes5chwtaxeo38neyco.webp', '2025-03-28 03:48:22', '2025-03-28 03:48:22'),
(129, 59, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133696/products/wwfqwfo8fyr8orqhao60.webp', '2025-03-28 03:48:22', '2025-03-28 03:48:22'),
(130, 59, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133699/products/u9mjog7vc1isundhhjks.webp', '2025-03-28 03:48:22', '2025-03-28 03:48:22'),
(131, 59, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133701/products/iqemke8owot5wkljd9t3.webp', '2025-03-28 03:48:22', '2025-03-28 03:48:22'),
(132, 60, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133845/products/hggmfomz2vyflxliu6ub.webp', '2025-03-28 03:50:54', '2025-03-28 03:50:54'),
(133, 60, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133848/products/nghcnvc1lwizjjyvdiw7.webp', '2025-03-28 03:50:54', '2025-03-28 03:50:54'),
(134, 60, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133850/products/qvlbxdez8i83rwpm8xxs.webp', '2025-03-28 03:50:54', '2025-03-28 03:50:54'),
(135, 60, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133853/products/m34g8bxzitvbeyxntejp.webp', '2025-03-28 03:50:54', '2025-03-28 03:50:54'),
(136, 61, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743134121/products/vgqhkqrmkxq71rkemnnv.webp', '2025-03-28 03:55:30', '2025-03-28 03:55:30'),
(137, 61, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743134123/products/gtj7roexlmwvnp17q7yr.webp', '2025-03-28 03:55:30', '2025-03-28 03:55:30'),
(138, 61, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743134126/products/xvzt6zmlfpeoevdehtvn.webp', '2025-03-28 03:55:30', '2025-03-28 03:55:30'),
(139, 61, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743134128/products/yanwfdw1dygg49vc0wr5.webp', '2025-03-28 03:55:30', '2025-03-28 03:55:30'),
(140, 61, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743134130/products/yevzcvo8izkgaonnvm5y.webp', '2025-03-28 03:55:30', '2025-03-28 03:55:30'),
(141, 62, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743134551/products/c04fwutpaslp0vzmwmx9.webp', '2025-03-28 04:02:34', '2025-03-28 04:02:34'),
(142, 62, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743134553/products/oifhbmbifxoekzxnojny.webp', '2025-03-28 04:02:34', '2025-03-28 04:02:34'),
(143, 63, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743134692/products/vuwt7msg31rtdvtmywzy.webp', '2025-03-28 04:04:58', '2025-03-28 04:04:58'),
(144, 63, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743134694/products/ibkvv9qlzf3hsqyk1glo.webp', '2025-03-28 04:04:58', '2025-03-28 04:04:58'),
(145, 63, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743134695/products/b1w1cka0hz5pqcdn5kv9.webp', '2025-03-28 04:04:58', '2025-03-28 04:04:58'),
(146, 63, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743134697/products/c1f1ox2rnannsfz6hs2m.webp', '2025-03-28 04:04:58', '2025-03-28 04:04:58'),
(147, 64, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743148169/products/g7eajcztuuui3l98zqxb.webp', '2025-03-28 07:49:33', '2025-03-28 07:49:33'),
(148, 64, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743148172/products/touacrcejmzbrhgsqmzl.webp', '2025-03-28 07:49:33', '2025-03-28 07:49:33'),
(152, 66, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743148791/products/vwm7aldbdjt4p2ajcf1z.webp', '2025-03-28 07:59:54', '2025-03-28 07:59:54'),
(153, 66, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743148794/products/owijac8m6ohvgtm09yb6.webp', '2025-03-28 07:59:54', '2025-03-28 07:59:54'),
(154, 67, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743149085/products/m6nqiyhm83gqckwoqms8.webp', '2025-03-28 08:04:54', '2025-03-28 08:04:54'),
(155, 67, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743149089/products/wqrmhlzvd9c5vpmhhysd.webp', '2025-03-28 08:04:54', '2025-03-28 08:04:54'),
(156, 67, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743149094/products/jkfbauz8scsegho0wvay.webp', '2025-03-28 08:04:54', '2025-03-28 08:04:54'),
(157, 68, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743149942/products/ma41ousmjsblogykpn8n.webp', '2025-03-28 08:19:09', '2025-03-28 08:19:09'),
(158, 68, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743149944/products/ara4aq4pigunfttwnsgp.webp', '2025-03-28 08:19:09', '2025-03-28 08:19:09'),
(159, 68, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743149949/products/yb8x13bhrdjqnosjcjxf.webp', '2025-03-28 08:19:09', '2025-03-28 08:19:09'),
(160, 70, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743150335/products/ildhk7yptcais0zh34rc.webp', '2025-03-28 08:25:45', '2025-03-28 08:25:45'),
(161, 70, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743150338/products/e1oshfr4j7hrklkliqqh.webp', '2025-03-28 08:25:45', '2025-03-28 08:25:45'),
(162, 70, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743150341/products/ecyh5dv5tpxql39is8su.webp', '2025-03-28 08:25:45', '2025-03-28 08:25:45'),
(163, 70, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743150344/products/evs7ycv6l3ncoohf8yxl.webp', '2025-03-28 08:25:45', '2025-03-28 08:25:45'),
(164, 71, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743150852/products/kkjxptkac88j0bkbiqwx.webp', '2025-03-28 08:34:21', '2025-03-28 08:34:21'),
(165, 71, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743150854/products/yqtx99sxrhbjsy79mpfh.webp', '2025-03-28 08:34:21', '2025-03-28 08:34:21'),
(166, 71, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743150856/products/kd6iehajtwkvq5aqd3qq.webp', '2025-03-28 08:34:21', '2025-03-28 08:34:21'),
(167, 71, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743150859/products/epvhqnonllqi39hlm3po.webp', '2025-03-28 08:34:21', '2025-03-28 08:34:21'),
(168, 71, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743150861/products/aj17mxldrszubcgul6ei.webp', '2025-03-28 08:34:21', '2025-03-28 08:34:21'),
(169, 72, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743151097/products/ohada9yxznn3laatho7u.webp', '2025-03-28 08:38:26', '2025-03-28 08:38:26'),
(170, 72, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743151100/products/hzlzz55fmkifbjvvpyix.webp', '2025-03-28 08:38:26', '2025-03-28 08:38:26'),
(171, 72, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743151103/products/n29vtvapc5wnwhwbofja.webp', '2025-03-28 08:38:26', '2025-03-28 08:38:26'),
(172, 72, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743151105/products/dzie9ikb0dus7ztshawx.webp', '2025-03-28 08:38:26', '2025-03-28 08:38:26'),
(181, 77, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743152020/products/rcrmw6nnmzwjizx7jdok.webp', '2025-03-28 08:53:59', '2025-03-28 08:53:59'),
(182, 77, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743152025/products/idrzzf85wuscr0gpkelz.webp', '2025-03-28 08:53:59', '2025-03-28 08:53:59'),
(183, 77, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743152032/products/wmup91pb9ytdqoopx4c1.webp', '2025-03-28 08:53:59', '2025-03-28 08:53:59'),
(184, 77, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743152037/products/oeyogs7peet9lccai8au.webp', '2025-03-28 08:53:59', '2025-03-28 08:53:59'),
(185, 78, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743152583/products/apir8r3zrkjjubc2taqm.webp', '2025-03-28 09:03:14', '2025-03-28 09:03:14'),
(186, 78, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743152585/products/h164xykzc9edkbpnvole.webp', '2025-03-28 09:03:14', '2025-03-28 09:03:14'),
(187, 78, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743152587/products/uaud3vlyc0a37leyzpwo.webp', '2025-03-28 09:03:14', '2025-03-28 09:03:14'),
(188, 78, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743152589/products/gglrtp6vqakkqf7cwfhv.webp', '2025-03-28 09:03:14', '2025-03-28 09:03:14'),
(189, 78, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743152591/products/ihflww5m81sfazvw22yt.webp', '2025-03-28 09:03:14', '2025-03-28 09:03:14'),
(190, 78, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743152594/products/ormofikdovviajpwlj0n.webp', '2025-03-28 09:03:14', '2025-03-28 09:03:14'),
(191, 79, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743153087/products/mjccxwypiakfenckqyi7.webp', '2025-03-28 09:11:38', '2025-03-28 09:11:38'),
(192, 79, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743153090/products/kdrfowxrnt8lurak5tgu.webp', '2025-03-28 09:11:38', '2025-03-28 09:11:38'),
(193, 79, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743153096/products/zj6tdbqjstgfwkogwpkw.webp', '2025-03-28 09:11:38', '2025-03-28 09:11:38'),
(194, 79, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743153097/products/r3xbvrpgde0slztbyx1p.webp', '2025-03-28 09:11:38', '2025-03-28 09:11:38'),
(195, 81, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743153752/products/okvfg0ocbziw3tuwaace.webp', '2025-03-28 09:22:47', '2025-03-28 09:22:47'),
(196, 81, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743153754/products/bcgrbgmts9m0aptsrh1c.webp', '2025-03-28 09:22:47', '2025-03-28 09:22:47'),
(197, 81, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743153757/products/qtyk4mzag9r72isbcpgj.webp', '2025-03-28 09:22:47', '2025-03-28 09:22:47'),
(198, 81, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743153763/products/tlsek5xzm2m92btcdiur.webp', '2025-03-28 09:22:47', '2025-03-28 09:22:47'),
(199, 81, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743153767/products/nzi6sswpxohdtv9csujc.webp', '2025-03-28 09:22:47', '2025-03-28 09:22:47'),
(200, 82, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743154285/products/ocptkocv2ojsmwjc43ri.webp', '2025-03-28 09:31:32', '2025-03-28 09:31:32'),
(201, 82, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743154287/products/uf0q5gf4sk9bvlmuq0pr.webp', '2025-03-28 09:31:32', '2025-03-28 09:31:32'),
(202, 82, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743154289/products/m1jsqlfwj6xkik8wiyht.webp', '2025-03-28 09:31:32', '2025-03-28 09:31:32'),
(203, 82, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743154292/products/g0adi2bxe0b1uwhecmsr.webp', '2025-03-28 09:31:32', '2025-03-28 09:31:32'),
(204, 83, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743154987/products/fpkjlmcbczraz8ohzgua.webp', '2025-03-28 09:43:17', '2025-03-28 09:43:17'),
(205, 83, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743154991/products/vabytdr2g6fvns6rn7q7.jpg', '2025-03-28 09:43:17', '2025-03-28 09:43:17'),
(206, 83, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743154997/products/s6tserqp9ibwufzlyxy0.jpg', '2025-03-28 09:43:17', '2025-03-28 09:43:17'),
(207, 84, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743180726/products/acww7eizrrjxmfvo0nye.webp', '2025-03-28 16:52:15', '2025-03-28 16:52:15'),
(208, 84, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743180729/products/opujya6bxrnkur3phojg.webp', '2025-03-28 16:52:15', '2025-03-28 16:52:15'),
(209, 84, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743180732/products/xn5lawjbecvtgdkyrpgq.webp', '2025-03-28 16:52:15', '2025-03-28 16:52:15'),
(210, 84, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743180734/products/rn8rxha4jcv7yyd2rtbb.webp', '2025-03-28 16:52:15', '2025-03-28 16:52:15'),
(211, 85, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181027/products/bcvkmx42sqcs2yhsb4qx.webp', '2025-03-28 16:57:18', '2025-03-28 16:57:18'),
(212, 85, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181031/products/q0vsman47wbhcdjg2shs.webp', '2025-03-28 16:57:18', '2025-03-28 16:57:18'),
(213, 85, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181034/products/r0kcavsllme3dieag2xl.webp', '2025-03-28 16:57:18', '2025-03-28 16:57:18'),
(214, 85, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181037/products/xopyzbe42qwlt5jov60c.webp', '2025-03-28 16:57:18', '2025-03-28 16:57:18'),
(215, 86, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181495/products/f4fllnnmkuuzcyxnw0jx.webp', '2025-03-28 17:05:03', '2025-03-28 17:05:03'),
(216, 86, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181497/products/rekiastp9mytvxkp1fu8.webp', '2025-03-28 17:05:03', '2025-03-28 17:05:03'),
(217, 86, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181500/products/gkmj8iheu3h1yxqeumdk.webp', '2025-03-28 17:05:03', '2025-03-28 17:05:03'),
(218, 86, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181502/products/o7wdhz2eoxsaynyry248.webp', '2025-03-28 17:05:03', '2025-03-28 17:05:03'),
(219, 87, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181764/products/zcnzcj7zmiiqwhs5dy5w.webp', '2025-03-28 17:09:37', '2025-03-28 17:09:37'),
(220, 87, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181766/products/rhysrvtkysvcxqiwobx6.webp', '2025-03-28 17:09:37', '2025-03-28 17:09:37'),
(221, 87, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181770/products/jqlkjthopsdckwtjr3in.webp', '2025-03-28 17:09:37', '2025-03-28 17:09:37'),
(222, 87, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181773/products/jrizayfuaj6jjcpnzb9a.webp', '2025-03-28 17:09:37', '2025-03-28 17:09:37'),
(223, 87, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181776/products/z2pe81qp41z29g2fwixg.webp', '2025-03-28 17:09:37', '2025-03-28 17:09:37'),
(224, 88, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743182191/products/jjjfav673wdg7aa3hfql.webp', '2025-03-28 17:16:41', '2025-03-28 17:16:41'),
(225, 88, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743182195/products/asrhcjtgywiuiw952fye.webp', '2025-03-28 17:16:41', '2025-03-28 17:16:41'),
(226, 88, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743182197/products/juangufu1gneumuas2b2.webp', '2025-03-28 17:16:41', '2025-03-28 17:16:41'),
(227, 88, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743182200/products/fvfnu1qpkzca9kkpqexf.webp', '2025-03-28 17:16:41', '2025-03-28 17:16:41'),
(228, 89, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743182642/products/eo3acoz0pvcuwzzwarzh.webp', '2025-03-28 17:24:08', '2025-03-28 17:24:08'),
(229, 89, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743182645/products/nbt368cdduhpkkr5pgeu.webp', '2025-03-28 17:24:08', '2025-03-28 17:24:08'),
(230, 89, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743182647/products/tykx4ilufauj0lulhfql.webp', '2025-03-28 17:24:08', '2025-03-28 17:24:08'),
(231, 90, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743183133/products/pe8ggfljc8vnawz2hflq.webp', '2025-03-28 17:32:25', '2025-03-28 17:32:25'),
(232, 90, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743183135/products/a41xpscpa6cpxba7cbam.webp', '2025-03-28 17:32:25', '2025-03-28 17:32:25'),
(233, 90, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743183138/products/m10qo6aup4uvxztp545a.webp', '2025-03-28 17:32:25', '2025-03-28 17:32:25'),
(234, 90, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743183140/products/ohhtfe1tntxs8c7lqfm9.webp', '2025-03-28 17:32:25', '2025-03-28 17:32:25'),
(235, 90, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743183144/products/zsv9b5ulx5eash8x4xcb.webp', '2025-03-28 17:32:25', '2025-03-28 17:32:25'),
(240, 92, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743184326/products/xhy9ofon6ml9kvei2nyz.webp', '2025-03-28 17:52:12', '2025-03-28 17:52:12'),
(241, 92, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743184328/products/yvjtah17qywjzp3dtqyn.webp', '2025-03-28 17:52:12', '2025-03-28 17:52:12'),
(242, 92, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743184331/products/k23ypefwsbpeupufv4or.webp', '2025-03-28 17:52:12', '2025-03-28 17:52:12'),
(243, 93, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743184551/products/mftqdyamecdbrydyylvd.webp', '2025-03-28 17:55:58', '2025-03-28 17:55:58'),
(244, 93, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743184554/products/o44x9t6ypuadunna9iah.webp', '2025-03-28 17:55:58', '2025-03-28 17:55:58'),
(245, 93, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743184557/products/yt8dqffqayjwd3jbqb1x.webp', '2025-03-28 17:55:58', '2025-03-28 17:55:58'),
(246, 94, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743184715/products/mdexsqirnmo9yfc07x46.webp', '2025-03-28 17:58:44', '2025-03-28 17:58:44'),
(247, 94, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743184718/products/jhxcrnzznzgfmzzixi4m.webp', '2025-03-28 17:58:44', '2025-03-28 17:58:44'),
(248, 94, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743184720/products/hghishcxgdoytxadfkk4.webp', '2025-03-28 17:58:44', '2025-03-28 17:58:44'),
(249, 94, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743184723/products/rawvpi1rhcvdhu6wbwwd.webp', '2025-03-28 17:58:44', '2025-03-28 17:58:44'),
(250, 39, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262110/products/kjmc90e9zz5m62rslxgg.webp', '2025-03-29 15:28:33', '2025-03-29 15:28:33'),
(251, 39, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262111/products/ymj027kkzkxcuciyi6qn.webp', '2025-03-29 15:28:33', '2025-03-29 15:28:33'),
(252, 39, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262114/products/ma5hhalay4ln7hyeho75.webp', '2025-03-29 15:28:33', '2025-03-29 15:28:33'),
(253, 41, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262141/products/m2acyrkz8nrymxk7kzpj.webp', '2025-03-29 15:29:06', '2025-03-29 15:29:06'),
(254, 41, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262143/products/jhuo2l3htub60d1gbst9.webp', '2025-03-29 15:29:06', '2025-03-29 15:29:06'),
(255, 41, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262146/products/pln2dk8ixogqwmr1cyov.webp', '2025-03-29 15:29:06', '2025-03-29 15:29:06'),
(279, 100, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1745466192/products/jf930lsymgccp7ogmnmr.png', '2025-04-24 03:43:20', '2025-04-24 03:43:20'),
(280, 100, 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1745466198/products/xguxlbfrsr08hivsjm0i.png', '2025-04-24 03:43:20', '2025-04-24 03:43:20');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `location_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `location_detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('Chính','Phụ') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2025_04_02_145505_add_deleted_at_to_orders', 1),
(2, '2025_04_02_160507_create_order_status_histories_table', 2),
(3, '2025_04_03_153346_add_receiver_columns_to_orders_table', 3),
(4, '2025_04_03_174622_add_transaction_id_to_orders_table', 4),
(5, '2025_04_10_091820_add_min_order_value_to_vouchers_table', 5),
(6, '2025_04_10_092333_add_min_order_value_to_vouchers_table', 6),
(7, '2025_04_10_134653_add_link_to_banners_table', 7),
(8, '2025_04_10_134801_add_link_to_banners_table', 8),
(9, '2025_04_10_141408_add_product_id_to_banners_table', 9),
(10, '2025_04_11_111329_create_order_table', 10),
(11, '2014_10_12_000000_create_users_table', 1),
(12, '2025_04_22_012550_add_refund_completed_to_orders_table', 11),
(13, '2024_03_20_create_payment_status_histories_table', 12),
(14, '2025_04_25_000003_update_order_status_histories_table', 13);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `total_price` double NOT NULL DEFAULT '0',
  `voucher` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voucher_price` double UNSIGNED DEFAULT NULL,
  `shipping_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `payment_status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refundCompleted` tinyint(1) NOT NULL DEFAULT '0',
  `payment_method` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `users_id` int DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `receiver_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiver_phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiver_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transaction_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `code`, `customer_name`, `email`, `phone_number`, `total_price`, `voucher`, `voucher_price`, `shipping_address`, `note`, `status`, `date`, `created_at`, `updated_at`, `payment_status`, `refundCompleted`, `payment_method`, `users_id`, `deleted_at`, `receiver_name`, `receiver_phone_number`, `receiver_address`, `transaction_id`) VALUES
(124, 'OdfM2K', 'Nguyễn Quốc Cường 3', 'cuonghocfpt@gmail.com', '0335312222', 112500, 'DATN2025', 100000, 'gggg, Phường Điện Biên, Quận Ba Đình, Thành phố Hà Nội', NULL, 'Delivered', '2025-04-11', '2025-04-11 07:27:57', '2025-04-13 15:19:24', 'PAID', 0, 'COD', NULL, NULL, NULL, NULL, NULL, NULL),
(125, 'OdO9vX', 'Nguyễn Quốc Cường 3', 'cuonghocfpt@gmail.com', '0335312222', 99500, NULL, 0, 'gg, Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội', NULL, 'Unconfirmed', '2025-04-11', '2025-04-11 07:35:08', '2025-04-11 07:35:08', 'UNPAID', 0, 'COD', NULL, NULL, NULL, NULL, NULL, NULL),
(126, 'Odhh4b', 'Nguyễn Quốc Cường 3', 'cuonghocfpt@gmail.com', '0335312222', 212500, NULL, 0, 'gg, Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội', NULL, 'Unconfirmed', '2025-04-11', '2025-04-11 07:43:56', '2025-04-11 07:43:56', 'UNPAID', 0, 'COD', NULL, NULL, NULL, NULL, NULL, NULL),
(127, 'OdhFKz', 'Nguyễn Quốc Cường 3', 'cuonghocfpt@gmail.com', '0335312222', 212500, NULL, 0, 'gg, Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội', NULL, 'Unconfirmed', '2025-04-11', '2025-04-11 08:00:27', '2025-04-11 08:00:27', 'UNPAID', 0, 'COD', NULL, NULL, NULL, NULL, NULL, NULL),
(128, 'OdEBdY', 'Nguyễn Quốc Cường 3', 'cuonghocfpt@gmail.com', '0335312222', 212500, NULL, 0, 'gg, Phường Ngọc Hà, Quận Ba Đình, Thành phố Hà Nội', NULL, 'Unconfirmed', '2025-04-11', '2025-04-11 08:02:13', '2025-04-11 08:02:13', 'UNPAID', 0, 'COD', NULL, NULL, NULL, NULL, NULL, NULL),
(129, 'OdMXJQ', 'Nguyen Cuong', 'cuonggau251125@gmail.com', '0335313203', 596500, 'DATN2025', 100000, 'Số 18 , ngõ 54 Ngũ Nhạc, Phường Thanh Trì, Quận Hoàng Mai, Thành phố Hà Nội', NULL, 'Delivered', '2025-04-14', '2025-04-14 04:27:58', '2025-04-14 04:28:33', 'PAID', 0, 'COD', NULL, NULL, NULL, NULL, NULL, NULL),
(130, 'Od5UdF', 'Nguyễn Quốc Cường 3', 'cuonghocfpt@gmail.com', '0335312222', 99500, NULL, 0, 'gg, Phường Lê Đại Hành, Quận Hai Bà Trưng, Thành phố Hà Nội', NULL, 'Unconfirmed', '2025-04-23', '2025-04-23 03:41:43', '2025-04-23 03:41:43', 'UNPAID', 0, 'COD', NULL, NULL, NULL, NULL, NULL, NULL),
(131, 'OdhwbG', 'Nguyễn Quốc Cường 3', 'cuonghocfpt@gmail.com', '0335312222', 212500, NULL, 0, 'gg, Phường Tân Mai, Quận Hoàng Mai, Thành phố Hà Nội', NULL, 'Cancel', '2025-04-23', '2025-04-23 06:03:16', '2025-04-25 09:06:01', 'REFUNDED', 1, 'ONLINE', NULL, NULL, NULL, NULL, NULL, NULL),
(132, 'Odv2Ow', 'Nguyễn Quốc Cường 3', 'cuonghocfpt@gmail.com', '0335312222', 212500, NULL, 0, 'gg, Phường Tân Mai, Quận Hoàng Mai, Thành phố Hà Nội', NULL, 'Cancel', '2025-04-23', '2025-04-23 06:03:24', '2025-04-25 09:06:17', 'REFUNDED', 1, 'ONLINE', NULL, NULL, NULL, NULL, NULL, NULL),
(133, 'OdZYys', 'Nguyễn Quốc Cường 3', 'cuonghocfpt@gmail.com', '0335312222', 212500, NULL, 0, '123123, Xã Má Lé, Huyện Đồng Văn, Tỉnh Hà Giang', NULL, 'Cancel', '2025-04-23', '2025-04-23 06:04:35', '2025-04-25 09:04:26', 'PAID', 1, 'ONLINE', NULL, NULL, NULL, NULL, NULL, NULL),
(134, 'OdCsBI', 'Nguyễn Quốc Cường 3', 'cuonghocfpt@gmail.com', '0335312222', 212500, NULL, 0, '123123, Xã Má Lé, Huyện Đồng Văn, Tỉnh Hà Giang', NULL, 'Cancel', '2025-04-23', '2025-04-23 06:04:44', '2025-04-25 09:09:17', 'REFUNDED', 1, 'ONLINE', NULL, NULL, NULL, NULL, NULL, NULL),
(135, 'Odcfgl', 'Nguyễn Quốc Cường 3', 'cuonghocfpt@gmail.com', '0335312222', 212500, NULL, 0, '123123, Xã Má Lé, Huyện Đồng Văn, Tỉnh Hà Giang', NULL, 'Cancel', '2025-04-23', '2025-04-23 06:06:10', '2025-04-25 09:01:41', 'PAID', 1, 'ONLINE', NULL, NULL, NULL, NULL, NULL, '14922011'),
(136, 'OdGTVD', 'Nguyễn Quốc Cường', 'cuonghocfpt@gmail.com', '0335313203', 55800, NULL, 0, 'gg, Phường Vĩnh Phúc, Quận Ba Đình, Thành phố Hà Nội', NULL, 'Cancel', '2025-04-23', '2025-04-23 07:42:14', '2025-04-25 09:04:09', 'PAID', 1, 'ONLINE', NULL, NULL, NULL, NULL, NULL, '14922229');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price_regular` double NOT NULL DEFAULT '0',
  `price_sale` double NOT NULL DEFAULT '0',
  `discount` int DEFAULT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity_order` int NOT NULL DEFAULT '0',
  `product_id` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`id`, `order_id`, `name`, `image`, `price_regular`, `price_sale`, `discount`, `color`, `size`, `quantity_order`, `product_id`, `created_at`, `updated_at`) VALUES
(138, 124, 'Quần âu nam đẹp kiểu tây công sở hàn quốc', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262138/products/p18naslrdzqhbnotsryd.webp', 250000, 212500, 15, 'black', 'XL', 1, 41, '2025-04-11 07:27:57', '2025-04-11 07:27:57'),
(139, 125, 'Áo sơ mi nam kiểu dáng basic TOPMEN', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743104337/products/kixckv93jcnlrttrwf1e.webp', 199000, 99500, 50, 'black', 'L', 1, 38, '2025-04-11 07:35:08', '2025-04-11 07:35:08'),
(140, 126, 'Quần âu nam đẹp kiểu tây công sở hàn quốc', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262138/products/p18naslrdzqhbnotsryd.webp', 250000, 212500, 15, 'black', 'XL', 1, 41, '2025-04-11 07:43:56', '2025-04-11 07:43:56'),
(141, 127, 'Quần âu nam đẹp kiểu tây công sở hàn quốc', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262138/products/p18naslrdzqhbnotsryd.webp', 250000, 212500, 15, 'black', 'XL', 1, 41, '2025-04-11 08:00:27', '2025-04-11 08:00:27'),
(142, 128, 'Quần âu nam đẹp kiểu tây công sở hàn quốc', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262138/products/p18naslrdzqhbnotsryd.webp', 250000, 212500, 15, 'black', 'XL', 1, 41, '2025-04-11 08:02:13', '2025-04-11 08:02:13'),
(143, 129, 'Áo sơ mi nam kiểu dáng basic TOPMEN', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743104337/products/kixckv93jcnlrttrwf1e.webp', 199000, 99500, 50, 'black', 'XXL', 7, 38, '2025-04-14 04:27:58', '2025-04-14 04:27:58'),
(144, 130, 'Áo sơ mi nam kiểu dáng basic TOPMEN', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743104337/products/kixckv93jcnlrttrwf1e.webp', 199000, 99500, 50, 'black', 'L', 1, 38, '2025-04-23 03:41:43', '2025-04-23 03:41:43'),
(145, 131, 'Quần âu nam đẹp kiểu tây công sở hàn quốc', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262138/products/p18naslrdzqhbnotsryd.webp', 250000, 212500, 15, 'white', 'L', 1, 41, '2025-04-23 06:03:16', '2025-04-23 06:03:16'),
(146, 132, 'Quần âu nam đẹp kiểu tây công sở hàn quốc', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262138/products/p18naslrdzqhbnotsryd.webp', 250000, 212500, 15, 'white', 'L', 1, 41, '2025-04-23 06:03:24', '2025-04-23 06:03:24'),
(147, 133, 'Quần âu nam đẹp kiểu tây công sở hàn quốc', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262138/products/p18naslrdzqhbnotsryd.webp', 250000, 212500, 15, 'white', 'L', 1, 41, '2025-04-23 06:04:35', '2025-04-23 06:04:35'),
(148, 134, 'Quần âu nam đẹp kiểu tây công sở hàn quốc', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262138/products/p18naslrdzqhbnotsryd.webp', 250000, 212500, 15, 'white', 'L', 1, 41, '2025-04-23 06:04:44', '2025-04-23 06:04:44'),
(149, 135, 'Quần âu nam đẹp kiểu tây công sở hàn quốc', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262138/products/p18naslrdzqhbnotsryd.webp', 250000, 212500, 15, 'white', 'L', 1, 41, '2025-04-23 06:06:10', '2025-04-23 06:06:10'),
(150, 136, 'Áo thun nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743130905/products/i6ytt5gzpro4fcczoe3a.webp', 60000, 55800, 7, 'black', 'L', 1, 43, '2025-04-23 07:42:14', '2025-04-23 07:42:14');

-- --------------------------------------------------------

--
-- Table structure for table `order_status_histories`
--

CREATE TABLE `order_status_histories` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `old_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `new_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `updated_by` bigint UNSIGNED DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name_change` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_change` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `change_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_status_histories`
--

INSERT INTO `order_status_histories` (`id`, `order_id`, `old_status`, `new_status`, `note`, `updated_by`, `updated_at`, `name_change`, `role_change`, `change_at`) VALUES
(1, 133, 'Unconfirmed', 'Cancel', 'hhhh', NULL, '2025-04-25 08:52:08', 'Cuong Admin', 'admin', '2025-04-25 08:52:08'),
(2, 134, 'Unconfirmed', 'Cancel', 'hhhhh', NULL, '2025-04-25 08:56:29', 'Cuong Admin', 'admin', '2025-04-25 08:56:29'),
(3, 131, 'Unconfirmed', 'Cancel', 'hhhh', NULL, '2025-04-25 08:58:04', 'Cuong Admin', 'admin', '2025-04-25 08:58:04'),
(4, 135, 'Unconfirmed', 'Cancel', 'hhhh', NULL, '2025-04-25 09:01:32', 'Cuong Admin', 'admin', '2025-04-25 09:01:32');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_status_histories`
--

CREATE TABLE `payment_status_histories` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `old_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `new_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_change` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_change` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `change_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_status_histories`
--

INSERT INTO `payment_status_histories` (`id`, `order_id`, `old_status`, `new_status`, `name_change`, `role_change`, `note`, `change_at`, `created_at`, `updated_at`) VALUES
(10, 131, 'PAID', 'REFUNDED', 'Cuong Admin', 'admin', 'hhh', '2025-04-25 09:06:01', '2025-04-25 09:06:01', '2025-04-25 09:06:01'),
(11, 132, 'PAID', 'REFUNDED', 'Cuong Admin', 'admin', 'hhhh', '2025-04-25 09:06:17', '2025-04-25 09:06:17', '2025-04-25 09:06:17'),
(12, 134, 'PAID', 'REFUNDED', 'Cuong Admin', 'admin', 'hhhh', '2025-04-25 09:09:17', '2025-04-25 09:09:17', '2025-04-25 09:09:17');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publish_date` date DEFAULT NULL,
  `views` int UNSIGNED NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint UNSIGNED NOT NULL,
  `categories_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price_regular` double UNSIGNED DEFAULT NULL,
  `price_sale` double UNSIGNED DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `views` bigint UNSIGNED DEFAULT NULL,
  `content` text,
  `quantity` bigint UNSIGNED DEFAULT NULL,
  `quantity_sold` bigint UNSIGNED DEFAULT NULL,
  `rate` double UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `discount` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `categories_id`, `name`, `image`, `price_regular`, `price_sale`, `description`, `views`, `content`, `quantity`, `quantity_sold`, `rate`, `created_at`, `updated_at`, `discount`) VALUES
(38, 114, 'Áo sơ mi nam kiểu dáng basic TOPMEN', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743104337/products/kixckv93jcnlrttrwf1e.webp', 199000, 99500, 'Áo sơ mi nam kiểu dáng basic TOPMEN khoác ngoài chất vải kaki cao cấp trẻ trung năng động phù hợp cả mặc đi làm, đi chơi', 0, '<h2><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Áo sơ mi nam kiểu dáng basic TOPMEN khoác ngoài chất vải kaki cao cấp trẻ trung năng động phù hợp cả mặc đi làm, đi chơi ⭐ Chất Liệu: Chất kaki xuất hàn xịn dày dặn ⭐ Màu sắc: Đen – Be - Trắng - Cam - Xám ⭐ Đặc Tính: - Chất vải áo là chất kaki cao cấp dày dặn, dễ phối hợp đồ, dành cho nam nhưng nữ mặc đều hợp. - Áo có thể phối với áo thun bên trong, với quần jeans hoặc quần dài để đi chơi - Áo sơ mi kaki cũng có thể mặc với quần âu phù hợp cho đi làm hoặc đi dự tiệc Bảng size bên shop các bạn tham khảo ạ: Size M: Dành cho người nặng từ 42kg - 50kg 1m55-1m60 Size L : Dành cho người nặng từ 51kg - 58kg 1m60-1m65 Size XL: Dành cho người nặng từ 59kg - 67kg 1m65-1m70 Size 2XL: Dành cho người nặng từ 68kg - 75kg 1m70-1m75 Size 3XL: Dành cho người nặng từ 76kg - 85kg 1m75-1m80</span></h2>', 47, NULL, 4, '2025-03-27 19:38:57', '2025-03-27 19:38:57', 50),
(39, 114, 'Áo sơ mi đũi nam cổ tàu trẻ trung', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262108/products/istuxppmlvrefz4hrsxx.webp', 150000, 99000, 'sơ mi đũi nam cổ tàu tay dài phong cách trẻ trung vải đũi mềm mát lên phom cực đẹp', 0, '<p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">🔸 THÔNG TIN SẢN PHẨM</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Áo sơ mi đũi nam ngắn tay cổ bẻ (45-83kg) Phom Chuẩn Vải Cực Mát</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Áo đũi nam được thiết kế theo đúng form chuẩn của nam giới Việt Nam phom reguler nên bạn chỉ cần ướm đúng chiều cao cân nặng theo phần hướng dẫn chọn size là có thể chọn cho mình một chiếc áo vừa vặn như ý</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Sản phẩm chính là mẫu thiết kế mới nhất cho mùa hè này với chất liệu đũi xước trẻ trung và hai túi hộp đằng trước theo xu hướng của năm.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Dễ hàng mix đồ với quần ngố quần jeans quần kaki quần tây. phù hợp mặc đi du lịch, đi làm, đi chơi, dạo phố, cafe.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Chất liệu cực mềm mịn, thoáng mát (áo vải đũi cao cấp loại 1 dày dặn thấm hút mồ hôi). Đảm bảo không co rút ko bai nhão. Đặc biệt phần cổ áo ép mếch lụa 40d ko mất phom sau bao nhiêu lần giặt đi nữa.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Phần ống tay mà gấu áo,được may quấn viền ko có chỉ thừa và không có đường vắt sổ. hoàn toàn gọn gàng và sạch sẽ.</span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">🔸 HƯỚNG DẪN SỬ DỤNG:</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Đối với sản phẩm quần áo mới mua về, nên giặt tay lần đâu tiên để tránh phai màu sang quần áo khác</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Khi giặt nên lộn mặt trái ra để đảm bảo độ bền của hình in/decal</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Sản phẩm phù hợp cho giặt máy/giặt tay</span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">🔸 BẢNG THÔNG SỐ</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- M (45-55Kg, &lt;1m66)</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- L (56-62Kg, &lt;1m72)</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- XL (63-71Kg, &lt;1m78)</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- 2XL (72-80Kg, &lt;1m84)</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">*Anh chị nhắn tin cho shop để được nhân viên tư vấn chính xác</span></p>', 51093, NULL, 4.5, '2025-03-27 20:01:02', '2025-03-29 15:28:27', 34),
(41, 115, 'Quần âu nam đẹp kiểu tây công sở hàn quốc', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743262138/products/p18naslrdzqhbnotsryd.webp', 250000, 212500, 'quần âu nam màu đen trắng kem đẹp kiểu tây công sở hàn quốc cao cấp ống đứng côn suông rộng co giãn', 0, '<p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">Quý Khách cần Hỗ Trợ inbox liên hệ ngay cho shop để được hỗ trợ tốt nhất !</span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">👉quần âu nam màu đen trắng kem đẹp kiểu tây công sở hàn quốc cao cấp ống đứng côn suông rộng co giãn</span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">👉Thông Tin Chi Tiết : quần âu nam màu đen trắng kem đẹp kiểu tây công sở hàn quốc cao cấp ống đứng côn suông rộng co giãn</span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Chất liệu : chất chéo line hàn tăm lì co giãn nhẹ , không bai, không nhăn, không xù – tiêu chuẩn đường may kĩ.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Kiểu dáng : Thiết kế Cạo cap tinh tế hiện đại , vẫn giữ from côn hàn chuẩn , mới nhất hiện nay.</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Chất lượng sản phẩm tốt , giá cả hợp lý.</span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">👉 HƯỚNG DẪN CHỌN SIZE : quần âu nam màu đen trắng kem đẹp kiểu tây công sở hàn quốc cao cấp ống đứng côn suông rộng co giãn</span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">Size quần âu nam phụ thuộc vào chiều cao cân nặng và các yếu tố khác như đùi, hông, bắp chân , vòng bụng có thể chênh lệch 1 , 2cm ... Do đó quý khách còn phân vân xin vui lòng nhắn tin trực tiếp để được hỗ trợ tốt nhất .</span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Size 28 : Cân nặng 40 - 50kg Chiều cao &gt;1m72</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Size 29 : Cân nặng 51 - 55kg Chiều cao &gt;1m76</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Size 30 : Cân nặng 55 - 60kg Chiều cao &gt;1m78</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Size 31 : Cân nặng 60 - 65kg Chiều cao &gt;1m80</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Size 32 : Cân nặng 65 - 70kg Chiều cao &gt;1m83</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Size 33 : Cân nặng 70 - 75kg Chiều cao &gt;1m85</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Size 34 : Cân nặng 75 - 80kg Chiều cao &gt;1m85</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Size 35 : Cân nặng 81 - 87kg Chiều cao &gt;1m85</span></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">- Size 36 : Cân nặng 88 - 95kg Chiều cao &gt;1m85</span></p>', 28322, NULL, 3.5, '2025-03-28 02:53:15', '2025-03-29 15:28:58', 15),
(42, 116, 'Áo thun nam cổ tròn Depstyle PT81', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743130762/products/gnmpgxkjqzh85p7rbkce.webp', 180000, 117000, 'Áo thun nam cổ tròn PT81 chất liệu thun cotton 65/35 4 chiều co giãn thoái mái, thấm hút mồ hôi tốt.', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🔰 HƯỚNG DẪN CHỌN SIZE ÁO Size M : phù hợp với bạn có cân nặng từ 45 - 55kg. Size L : phù hợp với bạn có cân nặng từ 55 - 64kg. Size XL : phù hợp với bạn có cân nặng 64 - 72kg. Size 2XL : phù hợp với bạn có cân nặng 72 - 80kg. Size 3XL : phù hợp với bạn có cân nặng 80 - 88kg. Size 4XL : phù hợp với bạn có cân nặng 88 - 95kg. 👉 Lưu ý : Với người lớn tuổi, bụng to thì nên chọn lớn hơn 1 size để mặc thoải mái hơn. Áo thun nam form rộng : vui lòng chọn lớn hơn 2 size so với gợi ý, khi mặc sẽ tương đương size áo phông rộng. 🔰 HƯỚNG DẪN BẢO QUẢN ÁO THUN NAM ĐÚNG CÁCH ✧Giặt riêng quần áo sáng và tối màu, tránh bị nhiễm màu. ✧Không giặt áo với hóa chất có hoạt tính cao như clo. ✧Giặt mặt trong của áo đối với các sản phẩm sử dụng công nghệ in decal, in lụa. ✧Không nên đổ trực tiếp bột giặt lên quần áo, vì trong bột giặt có các hạt chứa hoạt tính tẩy cao, có thể làm phai màu vải cũng như hình in nhanh hơn thông thường. ✧Không nên ngâm áo thun quá lâu, vì sẽ khiến chiếc áo của bạn dễ phai màu, loang màu và mau hư hỏng.</span></p>', 1832, NULL, 4, '2025-03-28 02:59:23', '2025-03-28 02:59:23', 35),
(43, 116, 'Áo thun nam', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743130905/products/i6ytt5gzpro4fcczoe3a.webp', 60000, 55800, 'Áo thun nam, áo phông nam tay ngắn cổ tròn màu trơn chất thun lạnh co giãn 4 chiều alex cool', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📢 Kích cỡ :* Chất Liệu : - Chất lạnh , chất vải mềm , mịn , mặc thoải mái , đường chỉ may chắc chắn , không bị giản , nhão.... * Công Nghệ In : Với công nghệ in chuyển nhiệt , chất liệu màu sẽ thấm trực tiếp lên vải -------------- Ưu điểm : màu sắc , hình ảnh in lên áo cam kết đẹp và sắc nét hơn so với hình mẫu ----------------- với chất liệu lực nhập khẩu hàn quốc thì hình in không bao giờ phai cho dù mặc áo đã lâu , đã cũ , không bao giờ nhòe màu... --------------------- - Kích thước áo thun: + Size L :40kg- 60kg + Size XL: 60-69kg + Size XXL: 70-80kg ---------------------------------- \" CAM KẾT VỚI BẠN\" - Sản phẩm đúng như mô tả - Kiểm tra hàng trước khi giao cho bạn - Đóng gói hàng cẩn thận - Xuất hiện đơn của bạn shop sẽ gửi hàng cho bạn nhanh nhất - Khi có sự sai xót về sản phẩm shop xin được đổi trả nhanh nhất cho bạn \"MỌI CHI PHÍ ĐỔI TRẢ SHOP CHỊU 100% \"</span></p>', 1200, NULL, 0, '2025-03-28 03:01:46', '2025-03-28 03:01:46', 7),
(44, 117, 'Quần jeans baggy', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131108/products/kuxgakekfu5nmm1lyiy2.webp', 200000, 160000, 'Quần jeans baggy nam ống suông rộng màu xanh, đen vải bò dày dặn T1', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">HÔNG TIN VỀ SẢN PHẨM QUẦN JEANS BAGGY NAM ỐNG SUÔNG RỘNG _ Xuất xứ: Việt Nam _ Chất liệu: 97% cotton, 3% spandex _ Màu sắc: Xanh Nhạt, Đen Trơn _ Kiểu dáng: Trơn _ Kích thước: Size 27 _ 36 *Hãy nhắn tin cho shop để được tư vấn size chuẩn nhất với bạn! _ Đặc điểm nổi bật: + Quần jeans nam ống suông rộng, cạp cao, dáng đứng giúp tạo nên form cực chuẩn cho người mặc. + Quần jeans nút cài, có 4 túi lớn rất thuận tiện cho việc đựng smart phone hoặc ví cỡ bự. + Quần có màu xanh nhạt và đen trơn được nhuộm kỹ giúp hạn chế tối đa việc phai màu khi sử dụng. + Sản phẩm được đảm bảo với quy trình sản xuất chất lượng với đường may chắc chắn, tỉ mỉ từng chi tiết. *Màu sản phẩm có thể sẽ chênh lệch thực tế một phần nhỏ, do ảnh hưởng về độ lệch màu của ánh sáng nhưng vẫn đảm bảo chất lượng. HƯỚNG DẪN BẢO QUẢN _ Lộn trái quần ra và sử dụng chất tẩy rửa nhẹ giúp quần mau sạch và hạn chế phai màu. _ Không sử dụng hóa chất trực tiếp lên sản phẩm, không ngâm quần quá lâu trong dung dịch tẩy. _ Là/ủi mặt trái ở nhiệt độ thấp hơn 110 độ C. _ Nên phơi sản phẩm ở nơi khô ráo, thoáng mát, hạn chế ánh nắng trực tiếp.</span></p>', 973, NULL, 0, '2025-03-28 03:05:09', '2025-03-28 03:05:09', 20),
(45, 117, 'QUẦN JEAN NAM', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131301/products/z2hkxori8yoffnizjikc.webp', 240000, 144000, 'QUẦN JEAN NAM VẢI MỀM DÀY DẶN CO GIÃN TỐT TÔN DÁNG ĐẸP 2 MÀU ĐEN TRẮNG TRƠN 20 25 quần jean dài X1', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● MẠC DA GẮN LƯNG THỜI TRANG THAY ĐỔI MÀU LIÊN TỤC - MẠC DA LƯNG GIAO NGẪU NHIÊN</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Được đổi size khi mặc không vừa</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Bảng chọn size tham khảo</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● S từ 45-49kg</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● M từ 50-53kg</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● L từ 45-59kg</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● X từ 60-64kg</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● XL từ 65-69kg</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● XXL TỪ 69-75KG</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● -Tùy chiều cao, thể trạng và sở thích mặc ôm dáng hay rộng thoải mái chọn size phù hợp</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Dáng to tròn có bụng nhảy 1 size nhé</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Vải dày dặn co giãn đơn giãn nhưng sang trọng lịch lãm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Vải co giãn dáng ôm nhẹ dễ mặc dễ phối đồ</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Cần tư vấn chat ngay với shop</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Sản phẩm bán ra không bao gồm phụ kiện</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Vải co giãn thoải mái vận động, Fom dáng ôm nhẹ</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kiểu dáng đơn giãn thanh lịch</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Xuất xứ : Việt Nam</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thương hiệu : Nobrand</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kích cỡ 28-37</span></p><p><br></p>', 1202, NULL, 0, '2025-03-28 03:08:22', '2025-03-28 03:08:22', 40),
(46, 118, 'Áo Khoác jean nam trơn', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131469/products/q4dk4ukobuodfrtmouhm.webp', 250000, 225000, 'Áo Khoác jean nam trơn cúc cài Unisex nam nữ Form Rộng FABUMAN,áo khoác bò dáng suông phong cách trẻ trung màu xanh đen', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Áo Khoác jean nam trơn cúc cài Unisex nam nữ Form Rộng FABUMAN,áo khoác bò dáng suông phong cách trẻ trung màu xanh đen</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lmtr37g9tdjz7c\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1. THÔNG TIN SẢN PHẨM</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Tên sản phẩm : Áo Khoác Jean Unisex Nam Nữ Form Rộng MIAA,</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Chất liệu : Jeans</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Màu sắc : Đen, xanh nhạt, xanh đậm</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Size : M, L, XL</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">2. THÔNG SỐ SẢN PHẨM</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Size M: từ 40 - 53kg, Cao 1m55 - 1m65, chiều dài 61-62 cm, vai rộng 50-51 cm</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Size L: từ 54 - 59kg , Cao 1m63 - 1m70, chiều dài 63-64 cm, vai rộng 52-54cm</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Size XL: từ 60 - 68kg, Cao 1m65 - 1m75, chiều dài 65-66 cm , Vai rộng 53-55 cm</span></p><p><br></p>', 719, NULL, 0, '2025-03-28 03:11:10', '2025-03-28 03:11:10', 10),
(47, 118, 'Áo khoác gió 2 lớp nam nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131733/products/pkbmndyfbx8vvyolmaxo.webp', 200000, 200000, 'Áo khoác gió 2 lớp nam nữ chống nước DOS, jacket vải dù mũ có khóa tháo rời 4ST-JK01', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Umebay luôn nỗ lực hết sức để mang đến bạn những sản phẩm chất lượng cao và trải nghiệm mua hàng trọn vẹn nhất! Các sản phẩm Umebay đều được sản xuất tại nhà máy với tiêu chuẩn xuất khẩu và hệ thống chất lượng ISO9001 nên các bạn hoàn toàn tự tin sử dụng!</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thông tin sản phẩm áo khoác gió 2 lớp có mũ Unisex nam nữ form rộng 4Street by Umebay:</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Form áo rộng oversize phù hợp cho cả nam nữ</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Chất liệu vải gió cao cấp, hoàn thiện bề mặt hiệu ứng lá sen có khả năng chống nước mà vẫn thông thoáng khi mặc</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Mũ 2 lớp rộng rãi, có thể tháo rời thuận tiện</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Có chốt điều chỉnh cả ở Mũ và Gấu áo tạo nhiều form và thuận tiện trong quá trình sử dụng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Hình in logo nổi cá tính, tinh tế cao cấp bền bỉ</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Giặt ko xù lông hay bay màu, thấm hút mồ hôi và thoải mái ko gò bó khi vận động</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/sg-11134202-22100-gltb9h4rpkiv83\" height=\"1312\" width=\"875\"></span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/72d2df91c44b41abe325102b6dbc001e\" height=\"875\" width=\"875\"></span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/bfd11db01a75ea02f54b93169ec56afa\" height=\"875\" width=\"875\"></span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/9f9bcad297d42e10f5212f0caa1ab8cb\" height=\"875\" width=\"875\"></span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/sg-11134202-22100-l1fq8fbcogiv22\" height=\"875\" width=\"875\"></span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/9303fa73ee3b687b50cb3d3242e26f31\" height=\"875\" width=\"875\"></span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/sg-11134202-22100-7rqgv9pwqxiv1f\" height=\"875\" width=\"875\"></span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/sg-11134202-22100-15d5p5xwqxiv88\" height=\"875\" width=\"875\"></span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">++ Hướng dẫn chọn size áo jacket khoác gió nam nữ có mữ:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Size S ; dưới 57kg</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Size M : 57 - 65 kg</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Size L : 66 - 75 kg</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Size XL : 76 - 88 kg</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Lưu ý: Nếu thông số của bạn ở giữa 2 size thì có thể chọn size to hơn nếu muốn mặc rộng hẳn.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">++ Hướng dẫn sử dụng và bảo quản áo khoác nam nữ from rộng oversize:</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Lộn trái khi giặt</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Giặt ở nhiệt độ bình thường, với sản phẩm có màu tương tự.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Không được dùng hóa chất tẩy.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Hạn chế sử dụng máy sấy và ủi ở nhiệt độ thích hợp.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Lộn mặt trái khi phơi tránh bị nhanh phai màu, nên tránh phơi trực tiếp dưới ánh nắng gắt.</span></p><p><br></p>', 957, NULL, 0, '2025-03-28 03:15:34', '2025-03-28 03:15:34', 0),
(48, 119, 'Giày superstar nam nữ Egan', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743131941/products/sevg8rj4x4sbfg1xlxwd.webp', 330000, 264000, 'Giày superstar nam nữ Egan, Giày das sò kem bản S.Cấp full phụ kiện', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Hải Đăng Sneaker Store xin kính chào quý khách</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">➡️Thông tin sản phẩm :</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Tăng thêm chiều cao 4cm</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- phối đồ mọi phong cách</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Đế khâu 2 lớp chuẩn hàng Trung</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Size: 36 &gt; 44 dành cho cả nam và nữ</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Mã sản phẩm:</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Xuất xứ : được sản xuất tại nhà máy Quảng Châu</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chính sách bảo hành:</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Bảo hành sản phẩm 1 tháng.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Phiếu bảo hành ghi rõ thông tin: Tên khách hàng - Sđt - Địa chỉ - Ngày bán sản phẩm.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Nếu sản phẩm có vấn đề, khách hàng gửi trực tiếp về nhà sản xuất để được bảo hành theo chính sách ghi trên phiếu bảo hành sản phẩm</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Bảo hành khi lỗi do nhà sản xuất</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Bảo hành lỗi 1 đổi 1 nếu sản phẩm không chất lượng</span></p><p><br></p>', 581, NULL, 0, '2025-03-28 03:19:02', '2025-03-28 03:19:02', 20),
(49, 119, 'iày_Vánss knu skool nam nữ Egan', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132106/products/z5qn5mouqjgn6p73erq9.webp', 300000, 255000, 'Giày_Vánss knu skool nam nữ Egan, giày_Vánss knu skool bản cao cấp nhất', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">➡️Thông tin sản phẩm :</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Tăng thêm chiều cao 4cm</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- phối đồ mọi phong cách</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Đế khâu 2 lớp chuẩn hàng Trung</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Size: 36 &gt; 44 dành cho cả nam và nữ</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Mã sản phẩm:</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Xuất xứ : được sản xuất tại nhà máy Quảng Châu</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chính sách bảo hành:</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Bảo hành sản phẩm 1 tháng.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Phiếu bảo hành ghi rõ thông tin: Tên khách hàng - Sđt - Địa chỉ - Ngày bán sản phẩm.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Nếu sản phẩm có vấn đề, khách hàng gửi trực tiếp về nhà sản xuất để được bảo hành theo chính sách ghi trên phiếu bảo hành sản phẩm</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Bảo hành khi lỗi do nhà sản xuất</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Bảo hành lỗi 1 đổi 1 nếu sản phẩm không chất lượng</span></p><p><br></p>', 1680, NULL, 0, '2025-03-28 03:21:47', '2025-03-28 03:21:47', 15),
(50, 120, 'Giày Lười Nam Minh Giang', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132320/products/hmje5bcbyo7jp2l7uvy3.webp', 500000, 375000, 'Giày Lười Nam Minh Giang Chất Liệu Da Microfiber Cao Cấp Đế Cao Su Khâu Chắc Chắn Mã B16 Màu Đen', 0, '<h2><br></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7ra0g-m70a5rk9nckn27\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7ra0g-m70a5rk9or5393\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7ra0g-m70a5rk9q5pj5e\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌Thông tin sản phẩm: Giày Lười Nam Minh Giang Chất Liệu Da Microfiber Cao Cấp Đế Cao Su Khâu Chắc Chắn Mã B16 Màu Đen</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌Thương Hiệu: Minh Giang</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌Thông số kích thước: 38 - 43</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌Chất liệu: Da, Caosu, Canvas</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌Mô tả sản phẩm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Giày Da Minh Giang được làm từ da Microfiber chất lượng cao, mang lại cảm giác thoải mái, mềm mại và bền bỉ khi sử dụng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Da được chọn lọc kỹ lưỡng, đảm bảo độ bền và tính thẩm mỹ.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Sản phẩm có nhiều kiểu dáng đa dạng, phù hợp với nhiều nhu cầu sử dụng khác nhau như đi làm, dự tiệc hay đi chơi.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Với quy trình sản xuất cẩn thận và kỹ lưỡng, giày da Minh Giang có độ bền cao, có thể chịu được các yếu tố tác động từ môi trường bên ngoài mà không dễ bị hỏng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Đế cao su mềm có rãnh ma sát tốt chống trơn trượt , đế đã khâu chắc chắn , bền bỉ  </span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌Hướng dẫn bảo quản</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Lau chùi sạch sẽ và cất gọn sau khi sử dụng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Để nơi khô ráo, thoáng mát, tránh ánh nắng mặt trời</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Hạn chế tiếp xúc với nước , Không dùng hóa chất hay bột giặt có tính tẩy rửa mạnh</span></p><p><br></p>', 732, NULL, 0, '2025-03-28 03:25:20', '2025-03-28 03:25:20', 25),
(51, 120, 'Giày Công sở', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132505/products/o7lqogazzooswdhtltzo.webp', 800000, 640000, 'Giày Công sở tăng chiều cao da bò thật BỤI LEATHER G111 ĐEN - hộp sang trọng', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chi tiết Giày Công sở tăng chiều cao da bò thật BỤI LEATHER G111 ĐEN - hộp sang trọng - Bảo hành 12 tháng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1. CHẤT LIỆU: Da bò nappa</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Da bò nappa là loại da được thuộc từ da của bò non. Vì thế da Nappa mềm, dẻo, dai, đàn hồi hơn các loại da khác và độ bền rất cao. Da bò nappa là loại da bò thường được dùng cho các sản phẩm cao cấp</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">2. ĐẶC ĐIỂM:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">+ Kiểu dáng: Giày tây nam- tăng chiều cao 6cm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">+ Màu sắc: Đen; Nâu</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">+ Size: 38; 39; 40; 41; 42; 43</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">3. ĐẾ GIÀY</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Đế đúc cao su nguyên khối chắc chắn, bền bỉ độ bền lên tới 10 năm.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Vân đế chống trượt không mài mòn</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chiều cao đế: 3cm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chiều cao lót: 3cm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Tăng 6cm khi đeo giày vẫn giữ kiểu dáng tự nhiên .</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">---------------</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">HƯỚNG DẪN ĐO SIZE:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">B1: Dùng thước đo chiều dài bàn chân.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">B2: Đối chiếu bàn chân tương ứng với cỡ sau:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Size 38: chiều dài bàn chân từ 22 - 24 cm.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Size 39: chiều dài bàn chân từ 24 - 25 cm.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Size 40: chiều dài bàn chân từ 25 - 26 cm.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Size 41: chiều dài bàn chân từ 26 - 27 cm.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Size 42: chiều dài bàn chân từ 27 - 28 cm.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Size 43: chiều dài bàn chân từ 28 - 29 cm.</span></p><p><br></p>', 743, NULL, 0, '2025-03-28 03:28:26', '2025-03-28 03:28:26', 20),
(52, 121, 'Giày lười công sở da bò cao cấp', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132682/products/hpiyjkyffm8bb7zvpxi1.webp', 900000, 675000, 'Giày lười công sở da bò cao cấp đế khâu LuxWear Moccasins shoes siêu nhẹ êm chân BH 12 tháng GM04', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">THÔNG TIN SẢN PHẨM:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Loại sản phẩm: Moccasins shoes</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Màu sắc: Đen</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Size: 37-46</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Chất liệu da: Da bò nguyên tấm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Chất liệu đế: Cao su non được khâu chắc chắn</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Chất liệu lót trong: Bọt biển, mềm, êm và massage chân</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Xuất xứ: Việt Nam</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Thương hiệu: LuxWear</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">-----------------------------------------------------------</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">TẬN HƯỞNG DỊCH VỤ CAO CẤP TẠI LUXWEAR:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Tư vấn tận tình, nhanh chóng, lịch sự và chuyên nghiệp</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Hỗ trợ đổi size, đổi sang mẫu khác tận nhà, nhanh chóng và thuận tiện nhất cho khách hàng (sản phẩm chưa qua sử dụng)</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Kiểm tra kỹ hàng trước khi giao (ít nhất 2 lần), đóng gói sản phẩm rất lịch sự và chắc chắn chống va đập làm bẹp, móp méo hộp</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Khắc phục nhanh chóng sự cố từ phía shop (hàng lỗi, hỏng, giao sai hàng...) dù rất ít khi xảy ra. Chịu mọi chi phí liên quan đến việc khắc phục sự cố</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Chỉ bán những sản phẩm chất lượng. Khách có thể tham khảo rất nhiều đánh giá về sản phẩm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">● Cam kết bảo hành 12 tháng với những sản phẩm da thật. Da thật có độ bền rất cao theo năm tháng.</span></p><p><br></p>', 738, NULL, 0, '2025-03-28 03:31:22', '2025-03-28 03:31:22', 25),
(53, 121, 'Giày Tây Nam Công Sở Dập Vân Cá Sấu', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132806/products/wfropihwpva81vod4sw0.webp', 500000, 400000, 'Giày Tây Nam Công Sở Dập Vân Cá Sấu Đế Khâu Chắc Chắn Cao 3cm Thời Trang Hàng Ngày Mã X091 Full Box', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Giày Tây Nam Công Sở Dập Vân Cá Sấu Đế Khâu Chắc Chắn Cao 3cm Thời Trang Hàng Ngày Mã X091 Full Box</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌 Thông Số Kích Thước : 38-39-40-41-42-43</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌 Chất Liệu : Da mềm 100%, không sợ nổ da, da mềm đi ôm chân.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌 Đế : cao su đúc nguyên khối, khâu bằng chỉ chuyên dụng rất chắc chắn và bền bỉ.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌 Cam kết ảnh thật 100%, hàng không giống hình tiền 100% theo quy định.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌 Bảo hành : đế trong vòng 3 tháng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌 Chính sách đổi trả miễn phí khi giày không giống hình, nhầm mẫu, số lượng, giày nam bị lỗi</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">----------</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">⚠️ HƯỚNG DẪN BẢO QUẢN SẢN PHẨM</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Cất giữ sản phẩm ở nơi thoáng mát để giữ gìn chất lượng của sản phẩm ở mức tốt nhất.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Lau chùi giày thường xuyên tránh bụi bẩn gây mốc hoặc hư giày</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Bạn sử dụng các loại xà bông ít kiềm để vệ sinh</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Tốt nhất nên dùng vải mêm để lau chùi giày da nam</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Tránh phơi trực tiếp dưới ánh nắng mặt trời trong thời gian dài.</span></p><p><br></p>', 615, NULL, 0, '2025-03-28 03:33:27', '2025-03-28 03:33:27', 20),
(54, 122, 'Dép da nam quai ngang in logo RANYBELT', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743132977/products/q9glyfqnfpcog2uamkyd.webp', 350000, 273000, 'Dép da nam quai ngang in logo RANYBELT GIÀY NAM CAO CẤP đế cao su chống trơn trượt RT18 màu đen', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Dép da nam quai ngang in hoạ tiết RANYBELT GIÀY NAM CAO CẤP đế cao su chống trơn trượt RT18 màu đen</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">* Mã sản phẩm: RT18</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">* Chất liệu: Da nubuck cao cấp, fullbox</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">* Màu: Đen</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">* Kích thước: Size 38 - 43</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">* Đế: Đế cao su chống hôi chân</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">* Quai: Quai ngang màu đen in hoạ tiết nổi</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lw5w802hnxejcd\" height=\"875\" width=\"875\"></span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lw5w802hpbyz1d\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">THÔNG TIN SẢN PHẨM:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">* Ranybelt đế cao su độc quyền mang lại sự nhẹ nhàng, êm ái cho bàn chân,</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Mặt đế không thấm mồ hôi, chống hôi chân</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Phần đế có nhiều rãnh có khả năng chống trơn trượt, độ ma sát cao đảm bảo độ an toàn cho người mang khi di chuyển trên đoạn đường xấu, ẩm ướt.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">* Thiết kế sang trọng, dễ dàng phối đồ.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">* Đế cực bền, nhẹ độ đàn hồi tốt, đi cực êm chân, thoải mái</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">BẢNG SIZE</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lw6q5mpeeuah0a\" height=\"875\" width=\"875\"></span></p><p><br></p>', 738, NULL, 0, '2025-03-28 03:36:18', '2025-03-28 03:36:18', 22),
(55, 122, 'Dép Nam Quai Ngang Upyo Noir', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133120/products/wdmnrsewpshpnl3gsbke.webp', 500000, 395000, 'Dép Nam Quai Ngang Upyo Noir, Đế Cao Su Chống Trơn Trượt, Dép Da Bảo Hành 1năm ( Noir-UD37)', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">THÔNG TIN SẢN PHẨM:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Dép Nam Quai Ngang Upyo Noir, Đế Cao Su Chống Trơn Trượt, Dép Da Bảo Hành 1năm ( Noir-UD37)</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Chất liệu</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">+ Quai dép: Da MicroFiber, Quai Có Thể Điều Chỉnh Độ Rộng Trật Tuỳ Ý Theo Chân Mỗi Người.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">+ Đế dép: 2 Lớp, lớp trên mặt là lớp Pu bọc DA đem lại cảm giác êm ái khi đi, và sang trọng. Lớp dưới chất liệu cao su chống trơn trượt.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Màu sắc: Đen.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Size: 38 -&gt; 43</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Mẫu dép phù hợp cho Nam.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Xuất xứ: Việt Nam.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">BẢNG QUY ĐỔI KÍCH CỠ (nằm dưới mục Size)</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lt3joemv6dhg3d\" height=\"1167\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">HƯỚNG DẪN BẢO HÀNH</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1. Hỗ trợ đổi trả theo quy định của Shopee</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Điều kiện áp dụng (trong vòng 07 ngày kể từ khi nhận sản phẩm).</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Hàng hoá vẫn còn mới, chưa qua sử dụng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Hàng hoá bị lỗi hoặc hư hỏng do vận chuyển hoặc do nhà sản xuất.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">2. Trường hợp được chấp nhận:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Hàng không đúng size, mẫu mã như quý khách đặt hàng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Không đủ số lượng, không đủ bộ như trong đơn hàng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">3. Trường hợp không đủ điều kiện áp dụng chính sách:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Quá 07 ngày kể từ khi Quý khách nhận hàng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Gửi lại hàng không đúng mẫu mã, không phải sản phẩm của UPYO</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Không thích, không hợp, đặt nhầm mã, nhầm màu,...</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">4. Chính sách bảo hành:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">UPYO hỗ trợ bảo hành miễn phí đối với trường hợp bung keo, bung chỉ, mặt gót. Thời gian bảo hành 6 tháng kể từ thời điểm mua hàng. Quý khách vui lòng vệ sinh sạch sản phẩm trước khi gửi bảo hành!</span></p><p><br></p>', 984, NULL, 0, '2025-03-28 03:38:40', '2025-03-28 03:38:40', 21);
INSERT INTO `products` (`id`, `categories_id`, `name`, `image`, `price_regular`, `price_sale`, `description`, `views`, `content`, `quantity`, `quantity_sold`, `rate`, `created_at`, `updated_at`, `discount`) VALUES
(56, 123, 'Đồng hồ nam OLEVS 2876', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133259/products/sfowbhwwqvwydoncrqyt.webp', 670000, 522600, 'Đồng hồ nam OLEVS 2876 chính hãng dây da bò chống thấm nước sâu hiệu ứng phát sáng', 0, '<p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chào mừng bạn đến với 【OLEVS-Official-Store】</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chúng tôi cam kết: 100% đồng hồ nguyên bản! Hàng đã sẵn sàng! Chuyển phát nhanh! Bao bì tốt!</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Giao hàng: Đơn hàng sẽ được chuyển trong vòng 12h.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Đến: 7-9 ngày làm việc sau khi vận chuyển.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Sau Bán: Nếu đồng hồ của bạn có vấn đề về chất lượng hoặc bạn không hài lòng. Chúng tôi cung cấp một khoản hoàn lại đầy đủ.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅Chào mừng những người bán buôn và người bán lại</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Hy vọng bạn thích mua sắm của bạn.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">【Thông tin sản phẩm】 ↓</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thương hiệu: OLEVS 2876</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Trọng lượng đồng hồ: 55g</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kích thước mặt: 40mm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Độ dày quay số: 12mm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chiều rộng dây đeo: 20mm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">kích thước dây: 220mm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chống nước：30-50M</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thời gian bảo hành：NO</span></p><p><br></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Biện pháp phòng ngừa❌:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Vui lòng không va đập và để đồng hồ tiếp xúc với chất ăn mòn, nhiệt độ cao hoặc từ trường mạnh.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Vui lòng tránh xa dung môi, chất tẩy rửa, chất tẩy rửa công nghiệp, keo dán, sơn.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Đeo đồng hồ bằng vòng tay rất dễ bị xước nên bạn hãy đeo dây đồng hồ nhé.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Không chỉnh nút chỉnh giờ khi đồng hồ bị ướt.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Vui lòng không đặt đồng hồ ở nơi có nhiệt độ thay đổi đột ngột.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Vui lòng không bấm nút và cho vào nước.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">【Vật phẩm kèm theo】</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1 x đồng hồ gốc</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1 x hộp quà tặng tinh tế (Quà tặng miễn phí)</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1 x Hướng dẫn sử dụng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1 x thẻ olevs gốc</span></p><p><br></p>', 255, NULL, 0, '2025-03-28 03:40:59', '2025-03-28 03:40:59', 22),
(57, 123, 'OLEVS Đồng hồ nam chính hãng', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133411/products/zogmgkyhh4s9xredsxsh.webp', 550000, 478500, 'OLEVS Đồng hồ nam chính hãng thạch anh dây thép không gỉ dạ quang chống nước 6898G', 0, '<h2><br></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/cn-11134208-7qukw-litobgef6tfaa3\" height=\"1330\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/cn-11134208-7qukw-litobgef87zqf7\" height=\"886\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/cn-11134208-7qukw-litobgef9mk61f\" height=\"1330\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/cn-11134208-7qukw-litobgefb14m6b\" height=\"1241\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/cn-11134208-7qukw-litobgefcfp20c\" height=\"1135\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/cn-11134208-7qukw-litokgciz43a2e\" height=\"1042\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/cn-11134208-7qukw-litokgcj0inqa8\" height=\"819\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thời gian giao hàng dự kiến cho sản phẩm này là từ 2-3 ngày</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chào mừng bạn đến với [cửa hàng - chính hãng - OLEVS]</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chúng tôi cam kết: 100% đồng hồ chính hãng! Hàng có sẵn! Giao hàng nhanh chóng! Bao bì tốt!</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Giao hàng: Đơn hàng sẽ được vận chuyển nhanh chóng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Thời gian đến: Sớm nhất có thể sau khi giao.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Sau bán hàng: Nếu đồng hồ của bạn có vấn đề về chất lượng hoặc bạn không hài lòng. Chúng tôi sẽ xử lý thỏa đáng cho bạn.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Chào mừng những nhà bán sỉ và đại lý</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Chúc bạn mua sắm vui vẻ.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Biện pháp phòng ngừa❌:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Vui lòng không va đập và để đồng hồ tiếp xúc với chất ăn mòn, nhiệt độ cao hoặc từ trường mạnh.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Vui lòng tránh xa dung môi, chất tẩy rửa, chất tẩy rửa công nghiệp, keo dán, sơn.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Đeo đồng hồ với vòng tay rất dễ bị xước, vì vậy hãy đeo dây đồng hồ.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Không chỉnh nút chỉnh giờ khi đồng hồ bị ướt.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Vui lòng không đặt đồng hồ ở nơi có nhiệt độ thay đổi đột ngột.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Vui lòng không bấm nút và cho vào nước.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">[Đặc điểm]:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thương Hiệu: OLEVS</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Mã sản phẩm: 6898G</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Mặt kính: Tráng gương độ cứng cao</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Loại động cơ: Bộ máy thạch anh Trung Quốc chính hãng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Dây đeo: Thép không gỉ</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Độ sâu chống thấm nước: 30 mét</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Khối lượng: 85G</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Đường kính vỏ: 39mm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Độ dày vỏ: 9mm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chiều rộng dây đeo: 20mm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chiều dài dây đeo: 21 cm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Khóa: Khóa bướm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">[Gói hàng bao gồm]:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1 x Hướng dẫn sử dụng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1 x Đồng hồ chính hãng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1 x Hộp đựng đồng hồ có thương hiệu</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1 x Dụng cụ</span></p><p><br></p>', 0, NULL, 0, '2025-03-28 03:43:32', '2025-03-28 03:43:32', 13),
(58, 124, 'Ví Da Nam SNAPPY Dập Chìm Cao Cấp', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133535/products/bouirmdodm7obkahluvn.webp', 300000, 225000, 'Ví Da Nam SNAPPY Dập Chìm Cao Cấp Chính Hãng LOCAL BRAND MIDORI FOR MAN', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Ví Da Nam SNAPPY Dập Chìm Cao Cấp Chính Hãng MIDORI</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lxm96tfy80d7e9\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thương hiệu: MIDORI</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chất liệu: Da nhân tạo PU</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Màu sắc: Đen</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kích thước ví:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lxm96tfy9exnba\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Sản phẩm ví da nhân tạo PU của thương hiệu được thiết kế với các ngăn đựng được tối ưu hóa để đáp ứng nhu cầu lưu trữ của khách hàng. Bên trong ví sở hữu 1 ngăn chính lớn có sức chứa lớn, cùng với 3 ngăn phụ đựng thẻ. Ngoài ra, ví còn có 2 ngăn được thiết kế thành hình chữ X là điểm nhấn vô cùng ấn tượng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lxm96tfyati39a\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lxm9r515bgm3ea\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lxm9r515bgt5ee\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lxm9r515cv6j32\" height=\"875\" width=\"875\"></span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Họa tiết monogram sang trọng và chất liệu da nhân tạo cao cấp được chọn lựa kỹ lưỡng, thân thiện với động vật, giúp tạo nên sản phẩm có giá trị thẩm mỹ cao và độ bền vượt trội. Sản phẩm thích hợp làm quà tặng người yêu, bạn bè vào các dịp lễ hoặc sinh nhật.</span></p><p><br></p>', 0, NULL, 0, '2025-03-28 03:45:35', '2025-03-28 03:45:35', 25),
(59, 124, 'Ví nam mini da sáp dáng đứng', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133691/products/hqgr17ogc0al2g1dx7qq.webp', 350000, 276500, 'Ví nam mini da sáp dáng đứng cầm tay nhỏ gọn MORI cao cấp thương hiệu MASON - M02', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">VÍ NAM MORI có dáng đứng đầy cá tính, trẻ trung. Cầm tay mini nhỏ gọn, rất tối ưu về kích thước ví và công năng sử dụng. Ví làm bằng da sáp nhập khẩu 100% - Loại da khắc họa rõ nét chất bụi bặm, tự do và phóng khoáng của người dùng. Ai đã yêu da sáp thì sẽ rất trung thành với loại da này. Càng dùng da sẽ càng mềm, bóng và đẹp hơn theo thời gian THÔNG TIN SẢN PHẨM - Packing: Full box và thẻ bảo hành, phù hợp cho khách hàng làm quà tặng - Chất liệu: Da sáp nhập khẩu nguyên miếng - Kích thước: 11 x 9 cm - 2 ngăn lớn để tiền thẳng - 4 ngăn để đăng kí xe, cmnd cũ và mới - Ship ngay 2h trong nội thành Hà Nội (Nowship &amp; GrabExpress) CHẾ ĐỘ BẢO HÀNH VÍ NAM - Bảo hành 12 tháng: đường may, chất da, sơn viền, phụ kiện... - Đổi trả hàng trong vòng 7 ngày - Tất cả mọi vấn đề phát sinh hãy liên hệ Chat ngay với Mason để được hỗ trợ tốt nhất </span></p>', 0, NULL, 0, '2025-03-28 03:48:12', '2025-03-28 03:48:12', 21),
(60, 125, 'Thắt Lưng Nam Da Bò Thật 100%', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743133843/products/iopj3qe8kzykggagidaq.webp', 1200000, 900000, 'Thắt Lưng Nam Da Bò Thật 100% Cao Cấp Hàng Hiệu WilliamPOLO, Dây Nịt Nam Cao Cấp WP796 full Hộp', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thắt Lưng Nam Da Thật Cao Cấp WilliamPOLO , Dây Nịt Nam Cao Cấp WP796 Hộp Gỗ Làm Quà Tặng, Quà Biếu</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thắt lưng nam da bò là một sản phẩm thời trang nam phong cách và sang trọng. Với chất liệu da bò thật đẹp và bền bỉ, sản phẩm này sẽ mang lại cho bạn vẻ ngoài nam tính và sự tự tin khi diện. Các mẫu mới nhất của thắt lưng nam da bò cao cấp được thiết kế đa dạng với nhiều kích thước và màu sắc khác nhau, phù hợp với nhiều phong cách thời trang khác nhau. Sản phẩm có độ bền cao và dễ dàng kết hợp với nhiều loại trang phục khác nhau, từ trang phục công sở đến trang phục dạo phố hay đi chơi cùng bạn bè. Hãy lựa chọn thắt lưng nam da bò cao cấp để thể hiện phong cách cá tính và sự lịch lãm của mình!</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">da sang xịn, làm quà tặng quá sịn sò, dùng cực chất</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💥Chất Liệu: da bò nguyên miếng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💥Kích Thước: Dây dài 125cm, rộng 3.5cm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💥Cam kết bảo đảm nhận hàng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💥 Bảo hành 12 tháng</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Thắt lưng da bò luôn là phụ kiện phản ánh sự lịch lãm và đẳng cấp của phái mạnh</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Mặt khóa được làm bằng chất liệu hợp kim cao cấp chống , ố, gỉ và luôn sáng đẹp giúp người dùng tự tin khẳng đinh đẳng cấp của mình.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅Được thiết kế riêng dành cho các chàng gọn gàng, chỉnh chu và bảnh bao, dây lưng cho dân công sở ghi điểm tuyệt đối trong lòng các tín đồ thời trang.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅Vẫn ưu tiên sử dụng chất liệu da cao cấp, đảm bảo chiếc Thắt lưng Cao cấp luôn mềm mại, dẻo dai nhưng vẫn tôn lên được vẻ đẹp sang trọng vốn có của nó.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Thắt lưng Cao cấp phù hợp với mọi kiểu trang phục.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🐊🐊🐊Thắt lưng da bò Cao cấp Phụ kiện không thể thiếu để hoàn thiện vẻ ngoài lịch lãm, sang trọng của các chàng trai.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7ras8-m3iyns2usmut12\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7ras8-m3iyns2uu1f9c8\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7ras8-m3iyns2uvfzp40\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7ras8-m3iyns2uwuk5eb\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7ras8-m3iyns2uy94la0\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7ras8-m3iyns2uznp1db\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134208-7ras8-m3iyns2v129h32\" height=\"875\" width=\"875\"></span></p><p><br></p>', 0, NULL, 0, '2025-03-28 03:50:43', '2025-03-28 03:50:43', 25),
(61, 125, 'Thắt lưng nam da bò khóa tự động cao cấp', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743134119/products/n6t6tejq1msxpd77897a.webp', 420000, 378000, 'Thắt lưng nam da bò khóa tự động cao cấp chống rỉ màu đen sang trọng thời trang có bảo hành FTT Leather DF2204', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thắt lưng hay dây nịt không chỉ là một trong những vật dụng thiết yếu, mà kiểu dáng, màu sắc của chiếc dây lưng cũng góp phần giúp phái mạnh khẳng định đẳng cấp và sự sành điệu của mình. Sự tinh tế và cá tính của các sản phẩm sẽ khiến bạn hài lòng. Hãy lựa chọn cho mình một kiểu thật ưng ý và diện cùng với tất cả các bộ đồ của bạn, chắc chắn sản phẩm sẽ là điểm nhấn tạo phong cách của bạn với người đối diện. Đơn giản, ít cầu kì, nhưng vẫn trẻ trung, lịch sự và sang trọng là những ưu điểm nổi bật của những mẫu thắt lưng nam da bò FTT Leather.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134202-7ras8-m1pciuxt7dmnea\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">MÔ TẢ SẢN PHẨM:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Xuất xứ: Việt Nam</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Thương hiệu: FTT Leather</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Chất liệu dây lưng: Da bò thật cao cấp</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134202-7ras8-m1pciv2j0h4v03\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Chất liệu mặt thắt lưng: Hợp kim cao cấp chống rỉ</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Màu sắc: Màu đen</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Kích thước: 3.5cm x 120cm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Kiểu khóa: khóa tự động với một rãnh kéo để điều chỉnh kích thước cho dây thắt lưng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134202-7ras8-m1pciv6oudlf66\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Kiểu dáng: Sản phẩm thắt lưng nam da bò có kiểu dáng đơn giản nhưng tinh tế, thanh lịch, trẻ trung, dễ dàng phối hợp với các kiểu quần âu, quần jean, quần kaki v.v...</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Mục đích sử dụng: thắt lưng phù hợp nhiều phong cách. Đi làm công sở, đi chơi, dạo phố, dự tiệc đều tạo một phong cách trẻ trung, lịch lãm, sang trọng. Ngoài ra, bạn có thể dùng thắt lưng da bò làm món quà tặng anh, em, bạn bè đồng nghiệp trong các dịp sự kiện, sinh nhật đều rất đẹp và ý nghĩa.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/vn-11134202-7ras8-m1pcivbenhdr86\" height=\"875\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">HƯỚNG DẪN SỬ DỤNG VÀ BẢO QUẢN:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Bảo quản thắt lưng nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp lâu ngày, lau khô khi sản phẩm bị ẩm ướt .</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Giữ thẳng dáng sản phẩm, tránh gập mạnh làm cong dáng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Sử dụng dung dịch xi chuyên dụng cho đồ da để giữ độ ẩm cũng như độ bóng mịn của bề mặt dây thắt lưng da.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">CHÍNH SÁCH BẢO HÀNH:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Trong 7 ngày sau khi nhận hàng hãy báo ngay cho shop để được hỗ trợ đổi sản phẩm nếu sản phẩm lỗi, nhầm mẫu, sai số lượng hoặc bi hư hại do quá trình vận chuyển.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Lỗi 1 đổi 1 mặt thắt lưng trong vòng 6 tháng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Vệ sinh, làm sạch, khắc phục các lỗi trầy xước nhẹ trên bề mặt da dây lưng trong suốt thời gian sử dụng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Không bảo hành đối với những thiệt hại trong quá trình sử dụng như: sản phẩm bị rách, bị hao mòn hoặc cháy trong quá trình sử dụng.</span></p><p><br></p><p><br></p>', 0, NULL, 0, '2025-03-28 03:55:20', '2025-03-28 03:55:20', 10),
(62, 126, 'Kính Mát Cao Cấp Shady Unisex', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743134550/products/vdpralsmir2y4x4yjobs.webp', 250000, 222500, 'Kính Mát Cao Cấp Shady Unisex Chuẩn UV400 MK1050', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Gọng kính được làm bằng nhựa dày dặn và bền màu.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Chân kính làm bằng hợp kim, cuối chân kính có bọc một lớp nhựa giúp người mang kính trong thời gian dài cũng không khó chịu hay đau ở vành tai</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Tròng kính là tròng Orma chống chói, có chống UV400</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Đệm mũi được cải tiến liền với gọng phù hợp cho mọi sóng mũi của mỗi người.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Kính được thiết kế theo form vuông bầu hiện đại phù hợp cho các bạn nam và nữ.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Chốt kính chắc chắn, bền và giúp giữ tốt form kính.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Sản phẩm tặng kèm hộp và khăn lau.</span></p><h2><br></h2>', 244, NULL, 0, '2025-03-28 04:02:30', '2025-03-28 04:02:30', 11),
(63, 126, 'Kính mát nam nữ Vigcom VG2069', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743134690/products/qbzzq4la5hn4qewqikbi.webp', 580000, 406000, 'Kính mát nam nữ Vigcom VG2069 màu sắc thời trang, thiết kế dễ đeo bảo vệ mắt', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kính mát VIGCOM VG2069 chính hãng nhập khẩu chính ngạch. Sản phẩm có tem chống hàng giả và thẻ bảo hành chính hãng. Thành phần: Nhựa/Kim loại/Gỗ/Da. Bảo quản trong hộp kính. HDSD: Để đeo mắt, tránh nhiệt độ cao và va chạm mạnh.Khung kính chắc chắn hài hòa dễ sử dụng và hợp thời trang. Kết cấu chắc chắn mang lại cảm giác nhẹ nhàng</span></p>', 120, NULL, 0, '2025-03-28 04:04:51', '2025-03-28 04:04:51', 30),
(64, 130, 'Màu Thun Borip Co Giãn 4 Chiều', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743148166/products/j8fywnys0gr7piwcwumd.webp', 259000, 178710, 'Màu Thun Borip Co Giãn 4 Chiều Thiết Kế From Rộng', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Áo may thun borip cotton, vải mềm mại, co giãn tốt, thấm hút tốt, áo có 4 màu đen, hồng, trắng, nâu. Áo thiết kế in chữ cài áo ngọc chị kết hợp cùng chân váy, quần jean hay quần sooc đều xinh ạ 😍 Đủ size 52-88kg -Chị em nhắn tin shop tư vấn size trước khi đặt hàng nhé ✅Check bảng size trước khi đặt hàng ✅ Sản phẩm giống hình,màu sác có thể thay đổi đậm nhạt do thiết bị ✅ Ship COD toàn quốc (giao hàng và thu tiền tận địa chỉ khách hàng). ✅ Kiểm hàng trước khi nhận ✅ Hỗ trợ đổi trả trong vòng 7 ngày. Lưu ý: + Cam kết 100% đổi Size nếu sản phẩm khách đặt không vừa (hỗ trợ đổi size trong vòng 7 ngày) + Shop hỗ trợ đổi sang sản phẩm khác cùng giá hoặc cao hơn nếu khách có nhu cầu đổi mẫu khác./. + Nếu có bất kì khiếu nại cần Shop hỗ trợ về sản phẩm, khi mở sản phẩm các Chị vui lòng quay lại video quá trình mở sản phẩm để được đảm bảo 100% đổi lại sản phẩm mới nếu Shop giao bị lỗi. + Các Chị nhận được sản phẩm, vui lòng đánh giá giúp Shop để hưởng thêm nhiều ưu đãi hơn nhé. #thoitrangnu #bigsize #dambigsize #vaybigsize #dobigsize #jeanbigsize #aobigsize #chanvaybigsize #quanbigsize #shopbigsize</span></p>', 70, NULL, 0, '2025-03-28 07:49:26', '2025-03-28 07:49:26', 31),
(66, 128, 'Áo sơ mi màu caramel Jiashucheng', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743148788/products/liqrdlsutslx7gd0b9vp.webp', 190000, 150100, 'Áo sơ mi tôn dáng gầy rộng rãi mặc bên trong mặc bên ngoài cho nữ áo dài tay nhẹ sang trọng', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">◆◆◆Chào mừng◆◆◆</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Sự kiện 1: Theo dõi cửa hàng (Nhận phiếu giảm giá 3k miễn phí)</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Sự kiện 2: Sự kiện giảm giá đầy đủ (Trang chủ cửa hàng giảm giá để được chiết khấu đầy đủ.)</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Sự kiện 3: Hoạt động Giao hàng Miễn phí (Mua ba miếng để được Giao hàng Miễn phí Toàn bộ.)</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Hoạt động 4: Hoạt động đăng hình ảnh (Khen ngợi hình ảnh đăng, Nhận phiếu giảm giá 5k miễn phí.)</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thông BÁO NGƯỜI MUA:</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1.Nó sẽ được vận chuyển trong vòng 48 giờ sau khi đặt hàng, và thời gian giao hàng hậu cần thông thường sẽ được giao trong khoảng 3-5 ngày. Nếu Sẽ Có Sự Chậm Trong Thời Tiết khắc nghiệt, Vui Lòng Hiểu.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">2 Cảm thấy hài lòng sau khi nhận hàng, đăng hình ảnh và đánh giá lời khen ngợi năm sao, nhận phiếu giảm giá 5k.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">3.Nếu Có Các Vấn Đề Khác Như: Giao Hàng Ít Hơn, Hàng Bị Lỗi, v.v., Vui Lòng Liên Hệ Với Chúng Tôi Và Chúng Tôi Sẽ Giải Quyết Cho Bạn.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Xuất xứ: Tỉnh Hồ Bắc</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Vải / chất liệu: Khác / Polyester (Sợi Polyester)</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Nội dung thành phần: 91% (Bao gồm) -95% (Bao gồm)</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Phong cách: Đi lại đơn giản / Phiên bản Hàn Quốc</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chi tiết kiểu quần áo: Nút, Đường khâu, Túi</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Phiên bản quần áo: Lỏng lẻo</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chiều dài / chiều dài tay áo / Chiều dài tay áo: Thường / Dài tay</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Placket quần áo: Một hàng với nhiều nút</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Loại cổ áo: POLO Collar</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Độ tuổi áp dụng: Thanh niên (18-25 tuổi)</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Loại tay áo: Thường xuyên</span></p><p><br></p>', 70, NULL, 0, '2025-03-28 07:59:48', '2025-03-28 07:59:48', 21),
(67, 128, 'Áo sơ mi màu trơn giản dị', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743149083/products/j1e8c8tycgx7uv0cchor.webp', 205200, 162108, 'Áo sơ mi màu trơn giản dị mùa hè dành cho nữ không tay dáng rộng', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">😊Chào mừng đến với YoungStyle😊</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"> </span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thời gian vận chuyển thường mất 1-4 ngày.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"> </span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Nói chung, bạn sẽ nhận được hàng hóa trong khoảng 7-15 ngày.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Phong cách: tính khí xã hội</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chi tiết phong cách: đồng màu, nút</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Phiên bản quần áo: mỏng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chiều dài / chiều dài tay áo: tay áo thường / ngắn</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Mặt trước: một hàng với nhiều nút</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Vải / chất liệu: Bông / Bông</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Nội dung thành phần: 91% (bao gồm) - 95% (bao gồm)</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kiểu cổ áo: POLO collar</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Độ tuổi áp dụng: Trẻ (18-28 tuổi)</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Vào mùa: Mùa hè 2021</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"><img src=\"https://down-vn.img.susercontent.com/file/cn-11134208-7r98o-lt1v2yondep975\" height=\"596\" width=\"875\"></span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🌹Ghi chú:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1, Màu sắc thực của mặt hàng có thể hơi khác so với hình ảnh hiển thị trên trang web do nhiều yếu tố như độ sáng của màn hình và độ sáng của ánh sáng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">2, Vui lòng cho phép độ lệch đo lường thủ công nhỏ (± 2cm) cho dữ liệu.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">3, Nếu có bất kỳ vấn đề với sản phẩm, xin vui lòng liên hệ kịp thời với bộ phận chăm sóc khách hàng, chúng tôi sẽ kịp thời và đúng cách giải quyết, các em bé, xin vui lòng không đưa ra ý kiến xấu, yêu bạn!</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"> </span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\"> 💕Chúc một ngày tốt lành!</span></p><p><br></p>', 80, NULL, 0, '2025-03-28 08:04:43', '2025-03-28 08:04:43', 21),
(68, 131, 'Áo khoác nữ mỏng dáng rộng', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743149939/products/pxhulpee0cjnwccxsi2o.webp', 254000, 223520, 'Áo đa năng ve áo một ngực ngắn vải nhung áo khoác dây rút cho nữ', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Khách hàng thân mến, vui lòng tham khảo bảng kích thước để biết chi tiết để chọn kích thước phù hợp trước khi đặt hàng. Nếu bạn có bất kỳ câu hỏi nào về sản phẩm, vui lòng liên hệ với bộ phận chăm sóc khách hàng kịp thời, mong bạn có thể mua được yêu thích của mình Sản phẩm trong cửa hàng của chúng tôi, tôi muốn bạn mua sắm vui vẻ.</span></p>', 70, NULL, 0, '2025-03-28 08:18:59', '2025-03-28 08:18:59', 12),
(70, 131, 'Áo Khoác Lông Cừu Cổ Tròn', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743150330/products/gteivuzuhjnuhyinremm.webp', 429000, 313170, 'Thiết Kế Mới Thời Trang Mùa Đông Theo Phong Cách Pháp Cho Nữ', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🌸Tất cả đều có trong kho.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🚀Thời gian vận chuyển thường mất 5-9 ngày. (Braxin và Mexico mất khoảng 20 ngày)</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Phân loại màu: Màu cà phê mơ</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kích thước: S M L XL 2XL 3XL</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Phong cách: ngọt ngào</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Mẫu quần áo: loại ống thẳng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chiều dài tay áo: Dài tay</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Cổ áo: Cổ tròn</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Placket phía trước: một bên ngực</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Mô hình: chặn màu</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Các yếu tố phổ biến / nghề thủ công: Túi trang trí ba chiều nút nối</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Năm và mùa: Mùa đông 2022</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">❥Lời khuyên ấm áp:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kiểm tra hàng hóa --- địa chỉ và số điện thoại.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">▷ Do sự khác biệt của màn hình và ánh sáng. Màu thực tế có thể khác với hình ảnh hiển thị.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">▷ Vì phương pháp đo và công cụ đo khác nhau nên cho phép sai số từ 2 - 4 cm, phạm vi sai số không phải là vấn đề chất lượng, trả lại không được hỗ trợ. Xin lưu ý. Thông tin kích thước chỉ mang tính chất tham khảo và sản phẩm thực tế sẽ được ưu tiên. Kích thước Châu Á nhỏ hơn EU / US / UK * * Vui lòng kiểm tra chi tiết trước khi mua!!!</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">▷ Khuyến nghị về cân nặng chỉ mang tính chất tham khảo, mỗi loại cơ thể là khác nhau!!!</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">❤️ Hy vọng bạn có một mua sắm vui vẻ trong cửa hàng của tôi! (Theo dõi chúng tôi, cảm ơn)</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">❤️ 5 sao của bạn là sự hỗ trợ tốt nhất cho cửa hàng của chúng tôi!</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Nội dung gói: 1 x áo khoác</span></p><p><br></p>', 70, NULL, 0, '2025-03-28 08:25:31', '2025-03-28 08:25:31', 27),
(71, 129, 'Quần jean ống rộng nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743150850/products/v3921asth64tjjwxatqt.webp', 840000, 436800, 'Quần jean ống suông cạp cao basic dáng dài 3 màu', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">CHẤT LƯỢNG TẠO NÊN SỰ KHÁC BIỆT:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1. Vải dùng 100% sợi tự nhiên</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">2. An toàn với làn da, không rặm, không ngứa như hàng Trung Quốc</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">3. Thiết kế chuẩn form người Việt</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">4. Phong cách đa dạng, nổi bật &amp; tôn dáng</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✔ Hình ảnh và video Quần Jean Nữ Ống Rộng Dáng Dài Lưng Cao Co Giãn Đen Be Trơn Gấu Thường CT JEANS được quay và chụp thật 100%</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✔ Cam kết hàng chính hãng 100%, nếu sai xin hoàn tiền gấp đôi</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thông tin chung sản phẩm : Quần Bò Nữ Ống Rộng Dáng Dài Lưng Cao Co Giãn Đen Be Trơn Gấu Thường CT JEANS :</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Tên sản phẩm: Quần jean ống rộng nữ - Quần jean ống suông cạp cao basic 2 màu đen be CP09, CT JEANS</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Dáng quần: Quần Jean Nữ Ống Loe Dáng Dài Lưng Cao Co Giãn Đen Be Trơn Gấu Thường CT JEANS</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Kiểu lưng: Cao</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Size: 26, 27, 28, 29</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Màu sắc: Đen Tuyền, Be, Trắng, Xanh Đậm, Xanh Trung, Xanh Nhạt, Xám Đậm, Xám Nhạt</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Chất liệu: vải co dãn 4 chiều</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Xuất xứ: Việt Nam</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Mác da thương hiệu phía sau lưng</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thông số sản phẩm: Quần Bò Nữ Ống Loe Dáng Dài Lưng Cao Co Giãn Đen Be Trơn Gấu Thường CT JEANS</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Các bạn vui lòng xem kỹ hướng dẫn chọn size trên hình để chọn size cho phù hợp. Nếu bạn thấy khó khăn trong việc chọn size hay có câu hỏi bất kỳ, hãy liên hệ cho chúng tôi qua công cụ chat</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Nếu số đo của bạn nằm giữa 2 size bạn nên chọn size nhỏ hơn vì quần thun giãn nhiều</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Inbox chúng mình để được tư vấn kỹ hơn nhé.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Hướng dẫn chọn size: Quần Jean Nữ Ống Rộng Dáng Dài Lưng Cao Co Giãn Đen Be Trơn Gấu Thường CT JEANS</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thông số model : Cao 1m65, nặng 48kg mặc size 26</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Size 26 : Từ 42-48kg</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Size 27 : Từ 49-52kg</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Size 28 : Từ 53-57kg</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Size 29 : Từ 58-63kg</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">*Chi tiết bảng size sản phẩm trong ảnh sản phẩm và hướng dẫn chọn size</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chính sách bảo hành: Quần Jean Nữ Ống Rộng Dáng Dài Lưng Cao Co Giãn Đen Be Trơn Gấu Thường CT JEANS</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Bảo hành theo đúng quy định của Shopee.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Đổi trả trong 14 ngày nếu lỗi do nhà sản xuất</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Qúy khách vui lòng chat với chúng tôi để được hỗ trợ đổi hàng tận nơi trên toàn quốc.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Trường hợp quý khách muốn trả hàng hoàn tiền vui lòng làm theo quy định của shopee</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Cam kết của chúng tôi về : Quần Jean Nữ Ống Rộng Dáng Dài Lưng Cao Co Giãn Đen Be Trơn Gấu Thường CT JEANS</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Xác nhận đơn hàng và giao hàng cho các bên vận chuyển trong vòng 3 giờ sau khi phát sinh đơn hàng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Các sản phẩm đều đúng như mô tả.</span></p><p><br></p>', 70, NULL, 0, '2025-03-28 08:34:11', '2025-03-28 08:34:11', 48),
(72, 129, 'Quần Jean ly gấu Joolate', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743151093/products/os1mhickph6w0wiuqgjn.webp', 924000, 591360, 'Quần Jean ly gấu Joolate mác da ống rộng dáng suông dài chất mềm mịn', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💗Thông tin sản phẩm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✔ Chất liệu: Denim</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✔ Màu sắc: Đen Be Xanh</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✔ Size: S M L </span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">+ Thiết kế: Quần có kiểu dáng suông với ống rộng, giúp tạo cảm giác thoải mái, dễ chịu khi mặc. Ly gấu được may tinh tế, tạo điểm nhấn thanh lịch cho chiếc quần, mang lại sự mới mẻ và khác biệt. Phần ống rộng cũng giúp che khuyết điểm chân, tạo vẻ ngoài thanh thoát, phù hợp với mọi dáng người.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">+ Chất liệu: Sản phẩm được làm từ chất liệu jean cao cấp, bền đẹp và thoáng khí, mang đến sự thoải mái cho người mặc suốt cả ngày dài. Chất vải dày dặn, không bị nhăn và giữ form tốt.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Đặc điểm nổi bật: Một trong những chi tiết đặc biệt của quần là mác da sang trọng ở gấu quần, giúp tạo điểm nhấn đậm chất thời trang và nâng cao giá trị thẩm mỹ cho sản phẩm. Mác da này không chỉ là yếu tố trang trí mà còn thể hiện sự tinh tế và chăm chút trong từng chi tiết của thương hiệu</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌 HƯỚNG DẪN SỬ DỤNG VÀ BẢO QUẢN:</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">+ Giặt lạnh hoặc ấm từ 35 đến 40 độ C.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">+ Giặt với sản phẩm cùng màu.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">+ Không ngâm, không tẩy.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">+ Lộn trái sản phẩm khi giặt giúp mau sạch và bền hơn.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💗 Joolate cam kết</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Cam kết hàng đúng mô tả</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Chất lượng đảm bảo 100%</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• An toàn đến Sức Khỏe người sử dụng.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Sản phẩm được kiểm tra kỹ càng, cẩn thận và tư vấn nhiệt tình trước khi gói hàng giao cho Quý khách.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Hàng có sẵn và giao ngay khi khách hàng đặt đơn</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Hỗ trợ quý khách đổi size nếu mặc không vừa</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">⛔ Lưu ý QUAN TRỌNG</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Bảng size chart chỉ mang tính chất tham khảo, tùy thuộc vào số đo cơ thể mỗi người và chất liệu vải khác nhau sẽ có sự chênh lệch nhất định từ 1 - 2cm.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Màu sắc vải/ sản phẩm có thể sẽ chênh lệch thực tế một phần nhỏ, do ảnh hưởng bởi độ sáng màn hình khi xem và tuỳ các thiết bị khác nhau nhưng vẫn đảm bảo chất lượng.</span></p><p><br></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🎁 Joolate cảm ơn quý khách hàng đã tin tưởng và đồng hành cùng shop! Chúc bạn có một ngày mua sắm thật thoải mái cùng Joolate nhé! Đừng ngần ngại nhắn tin cho shop để được hỗ trợ nhanh nhất bạn nhất.</span></p><p><br></p>', 60, NULL, 0, '2025-03-28 08:38:14', '2025-03-28 08:38:14', 36);
INSERT INTO `products` (`id`, `categories_id`, `name`, `image`, `price_regular`, `price_sale`, `description`, `views`, `content`, `quantity`, `quantity_sold`, `rate`, `created_at`, `updated_at`, `discount`) VALUES
(77, 127, 'Chân váy ren bèo 4 tầng', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743152017/products/o3xeplqsy6inw8ysmmgp.webp', 236000, 179360, 'Chân váy ren bèo 4 tầng dáng ngắn WAVYSKIRT Kenco Sài Gòn', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chân váy ren bèo 4 tầng dáng ngắn WAVYSKIRT</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chất liệu: THÔ XỐP CÓ LÓT TRONG</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Eo: Chun co dãn.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">KHÁCH KHÔNG MẶC NGẮN QUEN NÊN CÂN NHẮC TRƯỚC KHI ĐẶT</span></p><p><br></p>', 60, NULL, 0, '2025-03-28 08:53:37', '2025-03-28 08:53:37', 24),
(78, 132, 'Giày cao gót Mary Jane', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743152580/products/y5pv4o784pik1qon9tz2.webp', 536900, 391937, 'Giày đế dày màu đỏ nơ vuông nữ, giày da đen phong cách Hepburn kiểu Pháp', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Thuộc tính sản phẩm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Các yếu tố phổ biến: gót dày, khóa, bàn chống thấm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Hình dạng ngón chân: đầu tròn</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chất liệu trên: PU</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Phong cách: Phiên bản Hàn Quốc</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Giới tính áp dụng: Nữ</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chiều cao gót: gót vừa (3-5 cm)</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Mô hình: Màu đồng nhất</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Mùa: mùa hè, mùa đông, mùa xuân, mùa thu</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Màu: Đỏ, Đen, Trang</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Danh mục sản phẩm: Giày Mary Jane</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chất liệu duy nhất: Cao su</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chất liệu bên trong: Da giả</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chiều cao trên: Đỉnh thấp</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Hình dạng gót chân: Gót dày</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kỹ thuật thủ công duy nhất: Giày viscose</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Phong cách mặc: khóa</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chất liệu đế: PU</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Phương pháp đóng cửa: bộ chân</span></p><p><br></p>', 80, NULL, 0, '2025-03-28 09:03:00', '2025-03-28 09:03:00', 27),
(79, 132, 'Giày cao gót 6 phân mũi nhọn', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743153084/products/ugm3f5wo0kxhrpesdww0.webp', 672000, 524160, 'hiết kế đơn giản dễ mang (GIÀY FORM RỘNG - CHÂN GẦY MỎNG)', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chào mừng quý vị đến: Xin hãy kiểm tra lại số điện thoại và địa chỉ của bạn vì chúng ta không thể thay đổi Theo dõi chúng tôi để giảm giá và thông tin sản phẩm mới! Các mặt hàng tồn kho và được vận chuyển trực tiếp từ Tỉnh thái bình. Đến: 3 đến 4 ngày sau khi giao hàng Sản phẩm thông tin Tên sản phẩm: Giày thể thao Vật liệu: PU Chi tiết: đế không trơn bằng cao su Phong cách:   Vui lòng so sánh trên kích thước chi tiết với số đo của bạn trước khi mua. Chúng tôi sẽ đề nghị bạn chọn kích thước tùy theo chiều dài bàn chân. Nếu chân của bạn rộng hoặc tròn, bạn có thể chọn một kích thước lớn hơn. ( Chúng tôi cam kết cung cấp cho bạn những sản phẩm chất lượng cao nhất với giá cả hợp lý. Tất nhiên, chúng tôi cam kết cung cấp một trải nghiệm tuyệt vời cho khách hàng! Sự hài lòng của khách hàng luôn là mục tiêu quan trọng của chúng tôi. Với dịch vụ khách hàng xuất sắc của chúng tôi, mọi người có thể mua từ chúng tôi một cách tự tin và nhận được một sản phẩm đúng nghĩa. Lưu ý: Có thể có một chút lỗi trong đo thủ công, vui lòng tham khảo sản phẩm thực tế.</span></p>', 50, NULL, 0, '2025-03-28 09:11:24', '2025-03-28 09:11:24', 22),
(81, 139, 'Kính Mát Tròng Vuông Chống Tia uv', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743153749/products/vl0rtcf8wi81tmn8lgce.webp', 267888, 235741.44, 'Kính Mát Tròng Vuông Chống Tia uv400 Thời Trang Cho Nữ', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chức năng:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Với bảo vệ bức xạ</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Với bảo vệ UV400</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Dữ liệu kích thước kính</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Tổng chiều rộng khung (mm): 145</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chiều rộng ống kính (mm): 52</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chiều cao ống kính (mm): 41</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chiều rộng của mũi (mm): 22</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chiều dài chân gương (mm): 147</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chất liệu sản phẩm: nhựa</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Gói LIst: Kính râm 1PCS</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Nó có thể đảm bảo an toàn và không bị hư hại trong quá trình vận chuyển bằng cách quấn màng bọt khí.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Cho dù bạn có bất kỳ câu hỏi nào, vui lòng tham khảo ý kiến của bộ phận chăm sóc khách hàng trước khi đặt hàng</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Nếu bạn thích sản phẩm của chúng tôi, vui lòng theo dõi cửa hàng và đánh giá năm sao!</span></p><p><br></p>', 0, NULL, 0, '2025-03-28 09:22:29', '2025-03-28 09:22:29', 12),
(82, 139, 'Kính Mắt Nữ Thời Trang Lemino', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743154283/products/dltb2vaezidwgubv0ic6.webp', 1571000, 628400, 'Kính Mắt Nữ Thời Trang Lemino LE8539-524-2', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kính Mắt Nữ Thời Trang Lemino LE8539-524-2</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">***Chính sách bảo hành sản phẩm:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Miễn phí vệ sinh mắt kính TRỌN ĐỜI</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Bảo hành ỐC VÍT trong vòng 03 tháng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Miễn phí ĐỔI TRẢ HÀNG trong vòng 7 ngày kể từ ngày nhận hàng nếu lỗi do NSX (với điều kiện Giá trị sản phẩm đổi ngang bằng hoặc cao hơn giá trị sản phẩm cũ)</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">***Thông tin sản phẩm:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kính Mắt Nữ Thời Trang Lemino LE8539-524-2</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Bộ sản phẩm kính mắt thời trang nam gồm:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">+ Hộp Đựng Kính.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">+ Khăn Lau Kính.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">+ Kính.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Mắt kính phủ lớp chống UV400.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Chân kính làm từ nhựa dẻo, giúp mang kính trong thời gian dài cũng không gây khó chịu hay đau ở vành tai.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Mắt kính theo gọng là mắt kính nhựa 0 độ các bạn có thể mang chống bụi và lắp mắt kính cận.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Chốt kính chắc chắn giúp giữ form kính tốt.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Kính được thiết kế thời trang phù hợp cho mọi lứa tuổi.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Chất liệu: Kim Loại / Nhựa Dẻo</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kính mắt thời trang</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Tương tự một bộ cánh ấn tượng hay lớp trang điểm chỉn chu, kính mát có thể quyết định cách thế giới nhìn bạn hay quan trọng hơn là cách bạn nhìn chính mình. Một cặp kính mát có thể thay đổi diện mạo lẫn phong cách thời trang nhanh nhất.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Bên cạnh yếu tố thời trang thì chiếc kính mát này còn có khả năng chống chói lóa, chống tia UV400 trong những ngày nắng gắt.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">***Chính sách đổi trả hàng:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kính Mắt Nữ Thời Trang Lemino LE8539-524-2</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Sản phẩm vẫn còn thời hạn đổi trả hàng ( sản phẩm đổi trả trong vòng 7 ngày)</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Sản phẩm chưa qua sử dụng, còn nguyên vẹn</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Sản phẩm không bị hư hỏng , bể vỡ</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Tem, mạc niêm phong còn nguyên vẹn, không bị rách và trầy xước</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">• Sản phẩm còn đầy đủ phụ kiện / quà tặng đi kèm (nếu có)</span></p><p><br></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kính Mắt Nữ Thời Trang Lemino LE8539-524-2</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- HDSD: Tránh tiếp xúc với nước, tránh độ ẩm &amp; nhiệt độ cao, an toàn khi sử dụng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Năm sản xuất: 2024</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Nhập khẩu bởi: LEMINO VIETNAM COMPANY LIMITED</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Địa chỉ: Floor 21, Capital tower, 109 Tran Hung Dao Street, Cua Nam Ward, Hoan Kiem District, Ha Noi, Viet Nam</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Sản xuất từ: PINGXIANG KINGQUAN IMPORT AND EXPORT TRADING CO.,LTD</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Địa chỉ: Room 1105-1106, 11 Floor, Southwest Buiding, No9.You Yi Guan Road, Pingxiang City,Guangxi, China.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">**Lưu ý: Nếu cần hỗ trợ thêm thông tin Quý Khách Hàng vui lòng inbox chat box LEMINO *</span></p><p><br></p>', 0, NULL, 0, '2025-03-28 09:31:23', '2025-03-28 09:31:23', 60),
(83, 130, 'Áo Thun Hàn Quốc Chất Lượng Cao', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743154984/products/ee7j4uvygxjozl4wnxeb.webp', 141000, 95880, 'In Hình Thời Trang Tay Ngắn Cho Nữ Mùa Hè Cổ Tròn Slim', 0, '<p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">Thân mến, bạn cần chú ý đến những điểm sau trước khi đặt hàng:</span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">1. Xác nhận màu sắc và kích thước bạn muốn mua</span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">2. Xác nhận số điện thoại liên lạc và địa chỉ người nhận (không thể thay đổi sau khi đặt hàng, mong các bạn thứ lỗi)</span></p><p><br></p><p><span style=\"color: rgba(0, 0, 0, 0.8); background-color: rgb(255, 255, 255);\">3.Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ với chúng tôi</span></p><p><br></p>', 100, NULL, 0, '2025-03-28 09:43:05', '2025-03-28 09:43:05', 32),
(84, 133, 'Giày thể thao nữ Chunky', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743180724/products/iep8qsirxbcdvch1zffu.webp', 440020, 440020, 'Giày thể thao nữ Chunky thông thường cho mọi mùa với thiết kế thoải mái', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🖍️ Một số lý do để chọn chúng tôi 📌</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🔔 Thông tin kích thước chính xác được cung cấp sau hình ảnh chính</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌 Kiểm tra cẩn thận mọi sản phẩm sẽ được vận chuyển</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌 Các vấn đề về chất lượng sẽ được giải quyết nghiêm túc và kịp thời</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌 Hình ảnh giống nhau, nhưng chất lượng của chúng tôi sẽ tốt hơn</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌 Sản phẩm có thể đeo trong thời gian dài và thoải mái</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📌 Sản phẩm còn hàng và có thể tự tin mua</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🎫 Chúng tôi đã chuẩn bị một phiếu giảm giá bất ngờ cho bạn, bạn có thể tự thu thập hoặc nhắn tin riêng cho bộ phận chăm sóc khách hàng của chúng tôi để thu thập 💌</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🛒🛒 Chúng tôi sẽ thường xuyên khởi động các hoạt động để nhận được những món quà tinh tế và phiếu giảm giá lớn vô điều kiện 🛍️🛍️</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🎁 Từ khi nhìn thấy sản phẩm đến khi nhận được là một trải nghiệm thú vị, và bạn sẽ thích cửa hàng của tôi 🎁</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📖 Mỗi sản phẩm của chúng tôi đều có phần giới thiệu chi tiết</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📔 Chất liệu: PU nhân tạo</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📒 Phong cách: Giày thường</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📕 Phong cách: Giản dị</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📗 Chức năng: chống mài mòn</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📘 Màu sắc: đen, đỏ</span></p><p><br></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📣📣📣 Sản phẩm mới trong cửa hàng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🔺 Cửa hàng của tôi phát hành một số lượng lớn các sản phẩm mới mỗi tuần</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🔻 Theo dõi cửa hàng của tôi để nhận phiếu giảm giá</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🌈 Mang giày dù đi nhiều hàng ngày cũng không cảm thấy mệt mỏi ✨</span></p><p><br></p>', 70, NULL, 0, '2025-03-28 16:52:05', '2025-03-28 16:52:05', 0),
(85, 133, 'Giày nữ mềm mại và thoải mái', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181025/products/vzjtotjmwredb7bbyhmm.webp', 446050, 281011.5, 'Thiết kế da lộn ngọt ngào và đáng yêu đầy đủ giày thể thao', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Đôi giày thể thao thời trang này là lựa chọn hoàn hảo cho những người phụ nữ hiện đại, những người coi trọng cả sự thoải mái và phong cách. Được làm từ da lộn chất lượng cao, đôi giày này mang lại cảm giác mềm mại và bền bỉ. Thiết kế đế thấp giúp bạn dễ dàng mặc và kết hợp với nhiều trang phục khác nhau. Có ba màu - hồng, vàng và trắng - những đôi giày thể thao này rất linh hoạt và có thể được mặc cho những chuyến đi chơi bình thường hoặc các hoạt động thể thao nhẹ nhàng. Phần đóng bằng ren đảm bảo vừa vặn an toàn, trong khi đế cao su cung cấp lực kéo và hỗ trợ tuyệt vời. Cho dù bạn đang chạy việc vặt quanh thị trấn hay tận hưởng một ngày đi chơi với bạn bè, đôi giày thể thao này sẽ giúp đôi chân của bạn luôn thoải mái và phong cách suốt cả ngày dài.</span></p><p><br></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">“Một vài lý do để chọn chúng tôi ”</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Đó là một trải nghiệm thú vị từ khi nhìn thấy sản phẩm đến khi nhận sản phẩm, bạn sẽ thích shop của tôi</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📑Shop mình sẽ có số lượng lớn hàng mới lên kệ hàng tuần</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📑Theo dõi cửa hàng của tôi để nhận phiếu giảm giá</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">-- -- -- -- -- -- -- -- -- -- -- -</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💟 Phong cách: phong cách và giản dị</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💟 Giới tính: Nữ</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💟 Độ tuổi áp dụng: thanh niên (18-40 tuổi)</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💟 Chức năng: Thoáng khí, chống mài mòn, không trượt</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📑Sau khi nhận được gói hàng, nếu bạn hài lòng với mặt hàng, xin vui lòng cho nó một 5 sao⭐⭐⭐⭐⭐ Đánh giá và chào mừng bạn đến thăm chúng tôi một lần nữa</span></p><p><br></p>', 69, NULL, 0, '2025-03-28 16:57:06', '2025-03-28 16:57:06', 37),
(86, 135, 'Dép nữ hottrend mùa hè nơ xinh', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181492/products/jb1ai7rd6s9jcnqpbdeg.webp', 167900, 151110, 'Dép đi biển mềm mại, chống trượt và chống mài mòn có đế dày và đơn giản.', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Một số lý do để chọn chúng tôi📌</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🔔Thông tin kích thước chính xác phía sau hình ảnh chính</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🟧Các vấn đề về chất lượng sẽ được giải quyết nghiêm túc và kịp thời</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🟨Hình ảnh giống nhau nhưng chất lượng của chúng tôi sẽ tốt hơn</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🟩Sản phẩm YoungStyle có thể đeo lâu và thoải mái</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🟦Sản phẩm YoungStyle còn hàng, bạn có thể yên tâm mua hàng</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🎫Chúng tôi đã chuẩn bị một phiếu giảm giá bất ngờ cho bạn, bạn có thể tự nhận hoặc trò chuyện riêng với bộ phận chăm sóc khách hàng của chúng tôi để nhận hàng💌</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🧸Đó là một trải nghiệm thú vị từ khi nhìn thấy sản phẩm đến khi nhận sản phẩm, bạn sẽ thích shop của tôi🎁</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📖Mỗi sản phẩm của chúng tôi được mô tả chi tiết</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📔Thích hợp cho mọi lứa tuổi</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📒Phần trên được thiết kế vừa vặn với đôi chân của bạn, hỗ trợ tác động và trọng lượng của người mặc.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📕Thiết kế đế dưới có thể bám dính tốt trên mọi bề mặt.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📗Dễ dàng làm sạch và nhanh khô</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📘Có thể mặc bất cứ lúc nào</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">📣📣📣Sản phẩm mới trong cửa hàng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🔺Shop mình sẽ có số lượng lớn hàng mới lên kệ hàng tuần</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🔻Theo dõi cửa hàng của tôi để nhận phiếu giảm giá</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🌈 Do thiết bị hiển thị và ánh sáng khác nhau, hình ảnh có thể không phản ánh màu sắc thực tế của tất cả các sản phẩm. Cảm ơn bạn cho sự hiểu biết của bạn.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🌈Nếu bạn gặp sự cố hoặc lỗi sản phẩm, chúng tôi nói chuyện trước. Đừng ấn tượng với các đánh giá. chúng tôi rất vui khi sửa chữa nó.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🌈Vui lòng đánh giá cửa hàng 5 sao. ⭐ ⭐ ⭐ ⭐ ⭐ Cảm ơn bạn. mọi đánh giá đều rất quan trọng đối với cửa hàng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🌈Cảm ơn bạn đã hỗ trợ của bạn. chúng tôi sẽ phục vụ khách hàng của chúng tôi tốt nhất.</span></p><p><br></p>', 50, NULL, 0, '2025-03-28 17:04:53', '2025-03-28 17:04:53', 10),
(87, 135, 'Dép sục cross nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743181762/products/rafcnxeoapiav0unydvd.webp', 382000, 332340, 'chất liệu EVA siêu nhẹ, chống trơn trượt tặng kèm sticker', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kho giày dép chuyên sỉ Minh Anh xin giới thiệu :</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">THÔNG TIN SẢN PHẨM</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Tên sản phẩm:Dép sục cross nữ màu trơn đế cao, chất liệu EVA siêu nhẹ, chống trơn trượt tặng kèm sticker (319)</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- SHOP luôn đặt uy tín lên hàng đầu, trách nhiệm với những sản phẩm mình bán ra</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Hứa hẹn sẽ đem lại cho khách hàng sự hài lòng về chất lượng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Đây là mẫu dép mới nhất năm nay.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Dép được làm từ công ty có kinh nghiệm lâu năm, với chất liệu cao cấp giúp bạn thoải mái khi đeo cực kỳ,</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Dép chịu nước và thời tiết 100%</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Không bám bẩn, dễ làm sạch chỉ với nước</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Đế có khe thoát nước chống trơn trượt.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">&gt;&gt;&gt;&gt; CÁCH ĐO CHIỀU DÀI BÀN CHÂN</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Bước 1: Đặt chân trần lên tờ giấy</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Bước 2: Vẽ bàn chân (Hoặc gạch 2 đường song song: 1 đường đi qua điểm cao nhất của ngón chân và 1 đường đi qua điểm thấp nhất của gót chân). Đo chiều dài giữa 2 điểm có khoảng cách lớn nhất</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">&gt;&gt;&gt;&gt; Các bạn cần tư vấn hay thắc mắc về size thì NHẮN TIN ngay cho shop nhé ! ( Chú Ý : Khách hàng mua chọn tăng lên 1 size so với size giày dép bình thường nhé )</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">CHẾ ĐỘ BẢO HÀNH</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Hỗ trợ đổi size số nếu không vừa</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Hỗ trợ đổi trả hàng MIỄN PHÍ nếu lỗi của shop</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Đổi trả trong vòng 3 ngày kể từ ngày nhận được hàng</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">LƯU Ý : KHÁCH HÀNG QUAY VIDEO MỞ HÀNG , SHOP CHỈ GIẢI QUYẾT VẤN ĐỀ THIẾU HÀNG CÓ VIDEO MỞ HÀNG , SHOP KHÔNG GIẢI QUYẾT VẤN ĐỀ THIẾU HÀNG NẾU KHÔNG CÓ VIDEO , SHOP CẢM ƠN !</span></p><p><br></p>', 60, NULL, 0, '2025-03-28 17:09:22', '2025-03-28 17:09:22', 13),
(88, 136, 'Túi Xách Thiết Kế Mới', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743182187/products/i9nsrprk08kwcqinsgja.webp', 368200, 368200, 'Túi Xách Thiết Kế Mới Đơn Giản Thời Trang Dành Cho Nữ', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💕💕Chiếc túi này được làm bằng vải PU cao cấp, kết cấu tổng thể của túi rất mềm và mịn, có cảm giác chạm như chạm vào đám mây, túi được kết hợp với hai dây đeo vai và một chuỗi kim loại, Nách / Cơ thể là sự lựa chọn của bạn, Và Túi có dung tích lớn, Kích thước tổng thể của Túi dài 24 cm: 24 cm, Chiều rộng: 7cm; Chiều cao: 14cm, Dung tích lớn và thuận tiện Bạn có thể mang theo Đồ dùng cá nhân như điện thoại di động, son môi, nền tảng, ô, gương Vanity, v.v. Ngoài ra, có một lớp xen kẽ nhỏ ở giữa túi, dễ dàng để bỏ một số thẻ tín dụng, thẻ ngân hàng, v.v., Túi có hai đặc điểm là vẻ đẹp và tính thực tế, và Chất lượng cao, giá cả phải chăng, rất đáng mua. Ngoài ra, Vui Lòng Đảm Bảo rằng Nếu Có Vấn Đề Về Chất Lượng, Vui Lòng Liên Hệ Trực Tiếp Với Dịch Vụ Khách Hàng Của Chúng Tôi, Chúng Tôi Sẽ Chắc Chấp Tay Cầm Nó Đúng Cho Bạn, YoungStyle Sẽ Tham Khảo Bạn Qua Quá Trình Quy Trình!Hãy tin tưởng chúng tôi, YoungStyle sẽ luôn tin tưởng bạn!💕💕</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kết cấu: PU</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Phong cách: Túi vuông nhỏ</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Các yếu tố phổ biến: Gấp</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Phong cách thời trang</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kiểu đóng: Dây kéo</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💕Chào mừng bạn đến với YoungStyle 💕</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🎉Tất cả giá chi phí hàng hóa đang được bán, khuyến mãi tiếp tục được cập nhật, chú ý đến cửa hàng của chúng tôi và đặt hàng một cách lịch sự!</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✈️Vận chuyển nhanh trong vòng 24 giờ, chào mừng bạn đến đặt hàng, nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua trò chuyện</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🤝Có Nhiều Sản Phẩm Có Số Lượng Cao Và Chi Phí Trong Cửa Hàng, Tôi Tin Bạn Sẽ Thích Nó Quá Nhiều, Bạn Phải Đến Và Ghé thăm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Nhiều sản phẩm có thể được trò chuyện riêng với bộ phận chăm sóc khách hàng để nhận chiết khấu bên trong, cảm ơn bạn rất nhiều vì đã ghé thăm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">🔥Chương trình quà tặng tuyệt vời:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💕💕Hàng hóa được bán tại cửa hàng này đều là hàng tồn kho Đảm bảo chất lượng chụp thật, hãy yên tâm mua hàng💕💕</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💕💕Nếu Bạn Có Bất Kỳ Câu Hỏi Nào Sau Khi Nhận Hàng, Vui Lòng Chat Với Tôi Trong Thời Gian Sớm Nhất Có Thể (⊙ o ⊙)💕💕</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💕💕Đảm bảo cung cấp cho bạn một nhà máy hài lòng Trả lời💕💕</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💕💕Đó là một Danh dự lớn để có sự hỗ trợ và khuyến khích của bạn trên con đường trưởng thành💕💕</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💕💕💁Nếu bạn thích nó, hãy cho tôi một lượt thích, yêu thích và theo dõi💕💕</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">💕💕Cảm ơn bạn rất nhiều💕💕</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">============ Mẹo ===============</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Bảo dưỡng Túi:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1.Không Đẩy hoặc Chà nhiều lần để tránh hư hỏng bề mặt của nó.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">2.Khi Thu thập, Vui lòng Bảo quản Trong Túi Bụi.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">3.Giữ khô ráo và giảm thiểu tiếp xúc trực tiếp với nhiệt độ cao hoặc ánh nắng trực tiếp.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">4.Tránh phơi lâu với vật liệu mà bột màu dễ rơi ra, trong trường hợp bột màu được chuyển sang hàng hóa.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">5.Khi Cần làm sạch, nên chà nhẹ bằng vải khô mềm và không bao giờ sử dụng xà phòng hoặc chất giải quyết.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">[Hướng Dẫn mua sắm]</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1, Bởi vì hiệu ứng màu sắc của mỗi màn hình là khác nhau, chúng tôi cố gắng hết sức để điều chỉnh màu sắc của hình ảnh và sản phẩm thực tế, nhưng màu sắc của màn hình chắc chắn sẽ có sự khác biệt màu sắc nhẹ với Đối tượng thực tế. Màu sắc thực tế chủ yếu phụ thuộc vào sản phẩm thực tế.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">2, Mùi Của Túi Mới Được Cố Định Nhuộm, Vui Lòng Đặt Nó Ở Một Nơi Thông g</span></p><p><br></p>', 0, NULL, 0, '2025-03-28 17:16:28', '2025-03-28 17:16:28', 0),
(89, 136, 'Túi xách nữ da PU cỡ lớn', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743182639/products/yhbyravbhspdh3pb70qz.webp', 832000, 665600, 'Mẫu thêu cổ điển thời trang Hàn Quốc, sức chứa lớn để đi lại (có mặt dây chuyền)', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chất liệu: PU</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Phương pháp mở: Khóa từ</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Phong cách: xu hướng đường phố</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Số lượng dây đeo: Một dây</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Phong cách: Túi vuông nhỏ</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Các yếu tố phổ biến: màu tương phản</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Chúng tôi có rất nhiều kinh nghiệm và sản phẩm chất lượng cao.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Mang đến cho bạn trải nghiệm mua sắm tốt nhất.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Sản phẩm của chúng tôi là thương hiệu mới 100%.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Chúng tôi chú ý đến chất lượng cao và giá thấp!</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">✅ Chúng tôi luôn có sản phẩm mới. Hãy tiếp tục chú ý đến các tin tức mới nhất của cửa hàng của chúng tôi. Chúng tôi sẽ gửi cho bạn phiếu giảm giá và chiết khấu sản phẩm.</span></p><p><br></p>', 0, NULL, 0, '2025-03-28 17:24:00', '2025-03-28 17:24:00', 20),
(90, 137, 'Lắc tay bạc', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743183131/products/kjoz44lg1t1syp5hsu4b.webp', 723000, 506100, 'Lắc tay bạc mặt bông hoa đính đá - Vòng tay bạc ta cao cấp', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">THÔNG TIN SẢN PHẨM VÒNG TAY BẠC VÀNG BẠC TRỊNH GIA</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Chất liệu: Bạc ta.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Kiểu cách: Thiết kế thanh lịch, trẻ trung, tinh tế, sắc sảo</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Sản xuất: được thiết kế bởi VÀNG BẠC TRỊNH GIA</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Vòng tay bạc VÀNG BẠC TRỊNH GIA được thiết kế thanh lịch, trẻ trung theo xu hướng mới nhất của ngành phụ kiện trang sức</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Vòng tay được gia công vô cùng kĩ lưỡng, tỉ mỉ tạo nên một sản phẩm trang sức hoàn hảo</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">HƯỚNG DẪN SỬ DỤNG VÀ BẢO QUẢN VÒNG TAY BẠC VÀNG BẠC TRỊNH GIA</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Tránh để trang sức tiếp xúc với hoá chất, chất tẩy rửa mạnh, có thể làm sáng trang sức bằng cách chà kem đánh răng, nước rửa bát, nước chanh...</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Thường xuyên vệ sinh trang sức bằng khăn làm sáng, que làm sáng (phụ kiện vệ sinh sản phẩm của shop) nên vệ sinh nhẫn bạc thường xuyên bằng nước rửa bạc 1-3 tháng/lần để đảm bảo sản phẩm luôn được sáng bóng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Khi không đeo, bảo quản trang sức nơi khô ráo, tránh ánh nắng trực tiếp, nơi có nhiệt độ cao hoặc ẩm thấp.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Nên để trang sức trong túi zip, thêm 1 miếng bông gòn nhỏ để hút ẩm giúp bảo quản tốt hơn.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">VBTG CAM KẾT TRANG SỨC VÀNG BẠC TRỊNH GIA</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Sản phẩm giống ảnh, giống mô tả 100%.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Hình ảnh, video đều là ảnh thật, video quay lại những góc độ chân thật nhất của sản phẩm.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Tư vấn hỗ trợ khách hàng nhiệt tình 24/24.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">QUYỀN LỢI CỦA KHÁCH KHI MUA SẢN PHẨM VÒNG TAY BẠC VÀNG BẠC TRỊNH GIA</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Bảo hành làm sáng đánh bóng trọn đời sản phẩm.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Hỗ trợ đổi trả miễn phí trong vòng 15ngày (theo chính sách của Shopee).</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Sản phẩm Quý khách nhận sau khi mua sắm nếu có bất cứ vấn đề gì cần giải đáp, hỗ trợ hãy chat ngay cho shop để được nhân viên chăm sóc nhanh nhất.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">*Lưu ý: Quý khách vui lòng quay lại video mở sản phẩm để làm cơ sở giải quyết khiếu nại đổi/trả khi có vấn đề phát sinh liên quan đến sản phẩm.</span></p><p><br></p>', 0, NULL, 0, '2025-03-28 17:32:11', '2025-03-28 17:32:11', 30),
(92, 138, 'Khăn Quàng Cổ Nữ Hai Mặt', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743184323/products/xfyughw62yjmd0mm4te8.webp', 120000, 120000, 'Khăn Quàng Cổ Nữ Hai Mặt - Khăn Choàng Dài 2 Mét - Khăn Quàng Cổ Len Giữ Ấm', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">THÔNG TIN SẢN PHẨM:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Thương hiệu: YoungStyle</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Đóng gói: 1 sản phẩm/gói</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Phân loại, Màu sắc: Như hình phân loại</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Chất liệu: Len</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Chiều dài: 200cm</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Bảo hành: Không</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">ĐẶC TRƯNG SẢN PHẨM:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Cho dù bạn đang đi dạo hay tham dự một sự kiện xã hội, chiếc khăn quàng cổ đa năng này chính là phụ kiện hoàn hảo giúp nâng tầm vẻ ngoài của bạn.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Giữ ấm và phong cách với chiếc khăn choàng hai mặt có họa tiết kẻ caro và sọc độc đáo dành cho mùa thu, đông và xuân.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Được làm từ chất liệu tuyệt vời, chiếc khăn choàng này mềm mại, thoải mái và giữ ấm trong những tháng lạnh.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Là món đồ không thể thiếu trong bất kỳ tủ đồ nào, chiếc khăn quàng cổ này có thể đeo theo nhiều cách, phù hợp cho nhiều dịp như mua sắm, du lịch hoặc thậm chí chỉ để thư giãn ở nhà.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Phù hợp với phụ nữ ở mọi lứa tuổi, dù là sinh viên, chuyên gia hay nội trợ, những người muốn vừa thời trang vừa giữ ấm.</span></p><p><br></p>', 0, NULL, 0, '2025-03-28 17:52:04', '2025-03-28 17:52:04', 0),
(93, 138, 'Khăn choàng len cashmere', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743184548/products/g0pagn9ws3j4hqhcnr2b.webp', 180000, 174600, 'Khăn choàng len cashmere phối tua rua màu trơn đa năng phong cách Hàn Quốc', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Tính năng:</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">1.Khăn quàng cổ có thể ngăn chặn hiệu quả sự xâm nhập của không khí lạnh vào cổ, mang lại sự ấm áp, đặc biệt là trong mùa đông lạnh giá hoặc những vùng lạnh giá.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">2.Khăn quàng cổ có thể quấn quanh cổ, cổ họng và mặt, cản gió và giảm sự kích thích, khó chịu của gió lạnh.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">3.Là một phụ kiện hợp thời trang, khăn quàng cổ có thể nâng cao phong cách thời trang tổng thể của thiết kế, thêm phong cách cá nhân và cá tính.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">4.Khăn quàng cổ có thể được sử dụng làm tấm che nắng, khăn trùm đầu, khăn choàng,... với nhiều phương pháp và mục đích mặc khác nhau, có thể đáp ứng các dịp và nhu cầu khác nhau.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">5.Khi cảm thấy lạnh hoặc lạnh, cổ dễ bị khó chịu, đau nhức. Một chiếc khăn có thể hỗ trợ và bảo vệ nhẹ nhàng, giảm khó chịu ở cổ.</span></p><p><br></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chất liệu: cashmere</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Gói bao gồm: một chiếc khăn quàng cổ</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Kích thước: xin vui lòng cho phép 1-2 cm khác biệt do đo lường thủ công, cảm ơn.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Lưu ý: Do sự khác biệt giữa các màn hình khác nhau, hình ảnh có thể không phản ánh màu sắc thực tế của mặt hàng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">Chúng tôi đảm bảo phong cách giống như trong hình, nhưng không giống biểu diễn trên các cơ thể khác nhau như trên người mẫu. Cảm ơn bạn!</span></p><p><br></p>', 0, NULL, 0, '2025-03-28 17:55:49', '2025-03-28 17:55:49', 3),
(94, 137, 'Dây chuyền bạc nữ', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1743184713/products/chcrqsknhodahit46kw0.webp', 576000, 368640, 'Dây chuyền bạc nữ hình bông hoa đính đá cá tính - Vòng cổ bạc ta cao cấp', 0, '<p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">THÔNG TIN SẢN PHẨM DÂY CHUYỀN </span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Chất liệu: Bạc ta.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Kiểu cách: Thiết kế thanh lịch, trẻ trung, tinh tế, sắc sảo</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Dây chuyền bạc được thiết kế thanh lịch, trẻ trung theo xu hướng mới nhất của ngành phụ kiện trang sức</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Dây chuyền được gia công vô cùng kĩ lưỡng, tỉ mỉ tạo nên một sản phẩm trang sức hoàn hảo</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">HƯỚNG DẪN SỬ DỤNG VÀ BẢO QUẢN </span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Tránh để trang sức tiếp xúc với hoá chất, chất tẩy rửa mạnh, có thể làm sáng trang sức bằng cách chà kem đánh răng, nước rửa bát, nước chanh...</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Thường xuyên vệ sinh trang sức bằng khăn làm sáng, que làm sáng (phụ kiện vệ sinh sản phẩm của shop) nên vệ sinh nhẫn bạc thường xuyên bằng nước rửa bạc 1-3 tháng/lần để đảm bảo sản phẩm luôn được sáng bóng.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Khi không đeo, bảo quản trang sức nơi khô ráo, tránh ánh nắng trực tiếp, nơi có nhiệt độ cao hoặc ẩm thấp.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Nên để trang sức trong túi zip, thêm 1 miếng bông gòn nhỏ để hút ẩm giúp bảo quản tốt hơn.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">VBTG CAM KẾT TRANG SỨC</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Sản phẩm giống ảnh, giống mô tả 100%.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Hình ảnh, video đều là ảnh thật, video quay lại những góc độ chân thật nhất của sản phẩm.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Tư vấn hỗ trợ khách hàng nhiệt tình 24/24.</span></p><p><br></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">QUYỀN LỢI CỦA KHÁCH KHI MUA SẢN PHẨM </span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Bảo hành làm sáng đánh bóng trọn đời sản phẩm.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Hỗ trợ đổi trả miễn phí trong vòng 15ngày (theo chính sách của Shopee).</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">- Sản phẩm Quý khách nhận sau khi mua sắm nếu có bất cứ vấn đề gì cần giải đáp, hỗ trợ hãy chat ngay cho shop để được nhân viên chăm sóc nhanh nhất.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgba(0, 0, 0, 0.8);\">*Lưu ý: Quý khách vui lòng quay lại video mở sản phẩm để làm cơ sở giải quyết khiếu nại đổi/trả khi có vấn đề phát sinh liên quan đến sản phẩm.</span></p><p><br></p>', 0, NULL, 0, '2025-03-28 17:58:34', '2025-03-28 17:58:34', 36),
(100, 115, 'Áo thun nam32', 'https://res.cloudinary.com/dfcwk3b1b/image/upload/v1745466186/products/rrstiivilvg6rqfhonpi.png', 111111, 98888.79, '11111111111111111111111111111', 0, '<p>11111111111111111111111111111</p>', 25, NULL, 0, '2025-04-23 07:57:23', '2025-04-24 03:43:08', 11);

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `color_id` bigint UNSIGNED NOT NULL,
  `size_id` bigint UNSIGNED NOT NULL,
  `quantity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `code` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`id`, `product_id`, `color_id`, `size_id`, `quantity`, `created_at`, `updated_at`, `code`) VALUES
(49, 38, 5, 1, '11', '2025-03-27 19:39:10', '2025-03-27 19:39:10', NULL),
(50, 38, 5, 3, '6', '2025-03-27 19:39:10', '2025-03-27 19:39:10', NULL),
(51, 38, 5, 5, '10', '2025-03-27 19:39:10', '2025-03-27 19:39:10', NULL),
(52, 38, 6, 2, '10', '2025-03-27 19:39:10', '2025-03-27 19:39:10', NULL),
(53, 38, 6, 3, '10', '2025-03-27 19:39:10', '2025-03-27 19:39:10', NULL),
(54, 39, 6, 2, '100', '2025-03-27 20:01:08', '2025-03-27 20:01:08', NULL),
(55, 39, 6, 3, '97', '2025-03-27 20:01:08', '2025-03-27 20:01:08', NULL),
(56, 39, 6, 4, '100', '2025-03-27 20:01:08', '2025-03-27 20:01:08', NULL),
(57, 39, 5, 2, '100', '2025-03-27 20:01:08', '2025-03-27 20:01:08', NULL),
(58, 39, 5, 3, '97', '2025-03-27 20:01:08', '2025-03-27 20:01:08', NULL),
(59, 39, 5, 4, '100', '2025-03-27 20:01:08', '2025-03-27 20:01:08', NULL),
(60, 39, 2, 2, '100', '2025-03-27 20:01:08', '2025-03-27 20:01:08', NULL),
(61, 39, 2, 3, '100', '2025-03-27 20:01:08', '2025-03-27 20:01:08', NULL),
(62, 39, 2, 4, '100', '2025-03-27 20:01:08', '2025-03-27 20:01:08', NULL),
(71, 41, 5, 2, '111', '2025-03-28 02:53:22', '2025-03-28 02:53:22', NULL),
(72, 41, 5, 3, '109', '2025-03-28 02:53:22', '2025-03-28 02:53:22', NULL),
(73, 41, 5, 4, '109', '2025-03-28 02:53:22', '2025-03-28 02:53:22', NULL),
(74, 41, 6, 2, '111', '2025-03-28 02:53:22', '2025-03-28 02:53:22', NULL),
(75, 41, 6, 3, '110', '2025-03-28 02:53:22', '2025-03-28 02:53:22', NULL),
(76, 41, 6, 4, '111', '2025-03-28 02:53:22', '2025-03-28 02:53:22', NULL),
(77, 41, 5, 5, '112', '2025-03-28 02:53:22', '2025-03-28 02:53:22', NULL),
(78, 41, 6, 5, '131', '2025-03-28 02:53:22', '2025-03-28 02:53:22', NULL),
(79, 42, 5, 2, '121', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(80, 42, 5, 3, '131', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(81, 42, 5, 4, '121', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(82, 42, 5, 5, '111', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(83, 42, 2, 2, '113', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(84, 42, 2, 3, '109', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(85, 42, 2, 4, '109', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(86, 42, 2, 5, '100', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(87, 42, 6, 2, '113', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(88, 42, 6, 3, '110', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(89, 42, 6, 4, '129', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(90, 42, 6, 5, '112', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(91, 42, 4, 2, '113', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(92, 42, 4, 3, '113', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(93, 42, 4, 4, '113', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(94, 42, 4, 5, '114', '2025-03-28 02:59:32', '2025-03-28 02:59:32', NULL),
(95, 43, 6, 2, '100', '2025-03-28 03:01:56', '2025-03-28 03:01:56', NULL),
(96, 43, 6, 3, '100', '2025-03-28 03:01:56', '2025-03-28 03:01:56', NULL),
(97, 43, 6, 4, '100', '2025-03-28 03:01:56', '2025-03-28 03:01:56', NULL),
(98, 43, 5, 2, '100', '2025-03-28 03:01:56', '2025-03-28 03:01:56', NULL),
(99, 43, 5, 3, '100', '2025-03-28 03:01:56', '2025-03-28 03:01:56', NULL),
(100, 43, 5, 4, '100', '2025-03-28 03:01:56', '2025-03-28 03:01:56', NULL),
(101, 43, 1, 2, '100', '2025-03-28 03:01:56', '2025-03-28 03:01:56', NULL),
(102, 43, 1, 3, '100', '2025-03-28 03:01:56', '2025-03-28 03:01:56', NULL),
(103, 43, 1, 4, '100', '2025-03-28 03:01:56', '2025-03-28 03:01:56', NULL),
(104, 43, 2, 2, '100', '2025-03-28 03:01:56', '2025-03-28 03:01:56', NULL),
(105, 43, 2, 3, '100', '2025-03-28 03:01:56', '2025-03-28 03:01:56', NULL),
(106, 43, 2, 4, '100', '2025-03-28 03:01:56', '2025-03-28 03:01:56', NULL),
(107, 44, 5, 2, '123', '2025-03-28 03:05:18', '2025-03-28 03:05:18', NULL),
(108, 44, 5, 3, '123', '2025-03-28 03:05:18', '2025-03-28 03:05:18', NULL),
(109, 44, 5, 4, '123', '2025-03-28 03:05:18', '2025-03-28 03:05:18', NULL),
(110, 44, 5, 5, '113', '2025-03-28 03:05:18', '2025-03-28 03:05:18', NULL),
(111, 44, 2, 2, '123', '2025-03-28 03:05:18', '2025-03-28 03:05:18', NULL),
(112, 44, 2, 3, '123', '2025-03-28 03:05:18', '2025-03-28 03:05:18', NULL),
(113, 44, 2, 4, '132', '2025-03-28 03:05:18', '2025-03-28 03:05:18', NULL),
(114, 44, 2, 5, '113', '2025-03-28 03:05:18', '2025-03-28 03:05:18', NULL),
(115, 45, 5, 1, '121', '2025-03-28 03:08:29', '2025-03-28 03:08:29', NULL),
(116, 45, 5, 2, '112', '2025-03-28 03:08:29', '2025-03-28 03:08:29', NULL),
(117, 45, 5, 3, '132', '2025-03-28 03:08:29', '2025-03-28 03:08:29', NULL),
(118, 45, 5, 4, '121', '2025-03-28 03:08:29', '2025-03-28 03:08:29', NULL),
(119, 45, 5, 5, '131', '2025-03-28 03:08:29', '2025-03-28 03:08:29', NULL),
(120, 45, 6, 1, '111', '2025-03-28 03:08:29', '2025-03-28 03:08:29', NULL),
(121, 45, 6, 2, '111', '2025-03-28 03:08:29', '2025-03-28 03:08:29', NULL),
(122, 45, 6, 3, '121', '2025-03-28 03:08:29', '2025-03-28 03:08:29', NULL),
(123, 45, 6, 4, '131', '2025-03-28 03:08:29', '2025-03-28 03:08:29', NULL),
(124, 45, 6, 5, '111', '2025-03-28 03:08:29', '2025-03-28 03:08:29', NULL),
(125, 46, 2, 2, '121', '2025-03-28 03:11:18', '2025-03-28 03:11:18', NULL),
(126, 46, 2, 4, '111', '2025-03-28 03:11:18', '2025-03-28 03:11:18', NULL),
(127, 46, 2, 3, '131', '2025-03-28 03:11:18', '2025-03-28 03:11:18', NULL),
(128, 46, 5, 2, '122', '2025-03-28 03:11:18', '2025-03-28 03:11:18', NULL),
(129, 46, 5, 3, '111', '2025-03-28 03:11:18', '2025-03-28 03:11:18', NULL),
(130, 46, 5, 4, '123', '2025-03-28 03:11:18', '2025-03-28 03:11:18', NULL),
(131, 47, 5, 1, '112', '2025-03-28 03:15:41', '2025-03-28 03:15:41', NULL),
(132, 47, 5, 2, '121', '2025-03-28 03:15:41', '2025-03-28 03:15:41', NULL),
(133, 47, 5, 3, '111', '2025-03-28 03:15:41', '2025-03-28 03:15:41', NULL),
(134, 47, 5, 4, '123', '2025-03-28 03:15:41', '2025-03-28 03:15:41', NULL),
(135, 47, 6, 1, '112', '2025-03-28 03:15:41', '2025-03-28 03:15:41', NULL),
(136, 47, 6, 2, '133', '2025-03-28 03:15:41', '2025-03-28 03:15:41', NULL),
(137, 47, 6, 3, '112', '2025-03-28 03:15:41', '2025-03-28 03:15:41', NULL),
(138, 47, 6, 4, '133', '2025-03-28 03:15:41', '2025-03-28 03:15:41', NULL),
(139, 48, 6, 1, '111', '2025-03-28 03:19:11', '2025-03-28 03:19:11', NULL),
(140, 48, 6, 2, '123', '2025-03-28 03:19:11', '2025-03-28 03:19:11', NULL),
(141, 48, 6, 3, '113', '2025-03-28 03:19:11', '2025-03-28 03:19:11', NULL),
(142, 48, 6, 4, '122', '2025-03-28 03:19:11', '2025-03-28 03:19:11', NULL),
(143, 48, 6, 5, '112', '2025-03-28 03:19:11', '2025-03-28 03:19:11', NULL),
(144, 49, 6, 1, '112', '2025-03-28 03:21:53', '2025-03-28 03:21:53', NULL),
(145, 49, 6, 2, '112', '2025-03-28 03:21:53', '2025-03-28 03:21:53', NULL),
(146, 49, 6, 3, '112', '2025-03-28 03:21:53', '2025-03-28 03:21:53', NULL),
(147, 49, 6, 4, '112', '2025-03-28 03:21:53', '2025-03-28 03:21:53', NULL),
(148, 49, 6, 5, '112', '2025-03-28 03:21:53', '2025-03-28 03:21:53', NULL),
(149, 49, 5, 1, '112', '2025-03-28 03:21:53', '2025-03-28 03:21:53', NULL),
(150, 49, 5, 3, '112', '2025-03-28 03:21:53', '2025-03-28 03:21:53', NULL),
(151, 49, 5, 2, '112', '2025-03-28 03:21:53', '2025-03-28 03:21:53', NULL),
(152, 49, 5, 4, '112', '2025-03-28 03:21:53', '2025-03-28 03:21:53', NULL),
(153, 49, 5, 5, '112', '2025-03-28 03:21:53', '2025-03-28 03:21:53', NULL),
(154, 49, 1, 1, '112', '2025-03-28 03:21:53', '2025-03-28 03:21:53', NULL),
(155, 49, 1, 2, '112', '2025-03-28 03:21:53', '2025-03-28 03:21:53', NULL),
(156, 49, 1, 3, '112', '2025-03-28 03:21:53', '2025-03-28 03:21:53', NULL),
(157, 49, 1, 4, '112', '2025-03-28 03:21:53', '2025-03-28 03:21:53', NULL),
(158, 49, 1, 5, '112', '2025-03-28 03:21:53', '2025-03-28 03:21:53', NULL),
(159, 50, 5, 1, '122', '2025-03-28 03:25:31', '2025-03-28 03:25:31', NULL),
(160, 50, 5, 2, '122', '2025-03-28 03:25:31', '2025-03-28 03:25:31', NULL),
(161, 50, 5, 3, '122', '2025-03-28 03:25:31', '2025-03-28 03:25:31', NULL),
(162, 50, 5, 4, '122', '2025-03-28 03:25:31', '2025-03-28 03:25:31', NULL),
(163, 50, 5, 5, '122', '2025-03-28 03:25:31', '2025-03-28 03:25:31', NULL),
(164, 50, 5, 6, '122', '2025-03-28 03:25:31', '2025-03-28 03:25:31', NULL),
(165, 51, 5, 2, '122', '2025-03-28 03:28:30', '2025-03-28 03:28:30', NULL),
(166, 51, 5, 3, '131', '2025-03-28 03:28:30', '2025-03-28 03:28:30', NULL),
(167, 51, 5, 1, '122', '2025-03-28 03:28:30', '2025-03-28 03:28:30', NULL),
(168, 51, 5, 4, '123', '2025-03-28 03:28:30', '2025-03-28 03:28:30', NULL),
(169, 51, 5, 5, '123', '2025-03-28 03:28:30', '2025-03-28 03:28:30', NULL),
(170, 51, 5, 6, '122', '2025-03-28 03:28:30', '2025-03-28 03:28:30', NULL),
(171, 52, 5, 1, '123', '2025-03-28 03:31:29', '2025-03-28 03:31:29', NULL),
(172, 52, 5, 2, '123', '2025-03-28 03:31:29', '2025-03-28 03:31:29', NULL),
(173, 52, 5, 3, '123', '2025-03-28 03:31:29', '2025-03-28 03:31:29', NULL),
(174, 52, 5, 4, '123', '2025-03-28 03:31:29', '2025-03-28 03:31:29', NULL),
(175, 52, 5, 5, '123', '2025-03-28 03:31:29', '2025-03-28 03:31:29', NULL),
(176, 52, 5, 6, '123', '2025-03-28 03:31:29', '2025-03-28 03:31:29', NULL),
(177, 53, 5, 1, '123', '2025-03-28 03:33:38', '2025-03-28 03:33:38', NULL),
(178, 53, 5, 2, '123', '2025-03-28 03:33:38', '2025-03-28 03:33:38', NULL),
(179, 53, 5, 3, '123', '2025-03-28 03:33:38', '2025-03-28 03:33:38', NULL),
(180, 53, 5, 4, '123', '2025-03-28 03:33:38', '2025-03-28 03:33:38', NULL),
(181, 53, 5, 5, '123', '2025-03-28 03:33:38', '2025-03-28 03:33:38', NULL),
(182, 54, 5, 1, '123', '2025-03-28 03:36:28', '2025-03-28 03:36:28', NULL),
(183, 54, 5, 2, '123', '2025-03-28 03:36:28', '2025-03-28 03:36:28', NULL),
(184, 54, 5, 3, '123', '2025-03-28 03:36:28', '2025-03-28 03:36:28', NULL),
(185, 54, 5, 4, '123', '2025-03-28 03:36:28', '2025-03-28 03:36:28', NULL),
(186, 54, 5, 5, '123', '2025-03-28 03:36:28', '2025-03-28 03:36:28', NULL),
(187, 54, 5, 6, '123', '2025-03-28 03:36:28', '2025-03-28 03:36:28', NULL),
(188, 55, 5, 1, '123', '2025-03-28 03:38:49', '2025-03-28 03:38:49', NULL),
(189, 55, 5, 2, '123', '2025-03-28 03:38:49', '2025-03-28 03:38:49', NULL),
(190, 55, 5, 3, '123', '2025-03-28 03:38:49', '2025-03-28 03:38:49', NULL),
(191, 55, 5, 4, '123', '2025-03-28 03:38:49', '2025-03-28 03:38:49', NULL),
(192, 55, 6, 1, '123', '2025-03-28 03:38:49', '2025-03-28 03:38:49', NULL),
(193, 55, 6, 2, '123', '2025-03-28 03:38:49', '2025-03-28 03:38:49', NULL),
(194, 55, 6, 3, '123', '2025-03-28 03:38:49', '2025-03-28 03:38:49', NULL),
(195, 55, 6, 4, '123', '2025-03-28 03:38:49', '2025-03-28 03:38:49', NULL),
(196, 56, 5, 1, '122', '2025-03-28 03:41:04', '2025-03-28 03:41:04', NULL),
(197, 56, 6, 1, '133', '2025-03-28 03:41:04', '2025-03-28 03:41:04', NULL),
(198, 62, 2, 1, '122', '2025-03-28 04:02:34', '2025-03-28 04:02:34', NULL),
(199, 62, 5, 1, '122', '2025-03-28 04:02:34', '2025-03-28 04:02:34', NULL),
(200, 63, 5, 1, '120', '2025-03-28 04:04:58', '2025-03-28 04:04:58', NULL),
(201, 64, 5, 1, '10', '2025-03-28 07:49:33', '2025-03-28 07:49:33', NULL),
(202, 64, 5, 2, '10', '2025-03-28 07:49:33', '2025-03-28 07:49:33', NULL),
(203, 64, 5, 3, '10', '2025-03-28 07:49:33', '2025-03-28 07:49:33', NULL),
(204, 64, 6, 1, '10', '2025-03-28 07:49:33', '2025-03-28 07:49:33', NULL),
(205, 64, 6, 2, '10', '2025-03-28 07:49:33', '2025-03-28 07:49:33', NULL),
(206, 64, 6, 3, '10', '2025-03-28 07:49:33', '2025-03-28 07:49:33', NULL),
(207, 64, 6, 4, '10', '2025-03-28 07:49:33', '2025-03-28 07:49:33', NULL),
(216, 66, 6, 1, '10', '2025-03-28 07:59:54', '2025-03-28 07:59:54', NULL),
(217, 66, 6, 2, '10', '2025-03-28 07:59:54', '2025-03-28 07:59:54', NULL),
(218, 66, 6, 3, '10', '2025-03-28 07:59:54', '2025-03-28 07:59:54', NULL),
(219, 66, 6, 4, '10', '2025-03-28 07:59:54', '2025-03-28 07:59:54', NULL),
(220, 66, 2, 2, '10', '2025-03-28 07:59:54', '2025-03-28 07:59:54', NULL),
(221, 66, 2, 3, '10', '2025-03-28 07:59:54', '2025-03-28 07:59:54', NULL),
(222, 66, 2, 4, '10', '2025-03-28 07:59:54', '2025-03-28 07:59:54', NULL),
(223, 67, 6, 1, '10', '2025-03-28 08:04:54', '2025-03-28 08:04:54', NULL),
(224, 67, 6, 2, '10', '2025-03-28 08:04:54', '2025-03-28 08:04:54', NULL),
(225, 67, 3, 1, '10', '2025-03-28 08:04:54', '2025-03-28 08:04:54', NULL),
(226, 67, 3, 2, '10', '2025-03-28 08:04:54', '2025-03-28 08:04:54', NULL),
(227, 67, 3, 3, '10', '2025-03-28 08:04:54', '2025-03-28 08:04:54', NULL),
(228, 67, 5, 1, '10', '2025-03-28 08:04:54', '2025-03-28 08:04:54', NULL),
(229, 67, 5, 2, '10', '2025-03-28 08:04:54', '2025-03-28 08:04:54', NULL),
(230, 67, 5, 4, '10', '2025-03-28 08:04:54', '2025-03-28 08:04:54', NULL),
(231, 68, 6, 1, '10', '2025-03-28 08:19:09', '2025-03-28 08:19:09', NULL),
(232, 68, 2, 3, '10', '2025-03-28 08:19:09', '2025-03-28 08:19:09', NULL),
(233, 68, 2, 2, '10', '2025-03-28 08:19:09', '2025-03-28 08:19:09', NULL),
(234, 68, 2, 1, '10', '2025-03-28 08:19:09', '2025-03-28 08:19:09', NULL),
(235, 68, 5, 3, '10', '2025-03-28 08:19:09', '2025-03-28 08:19:09', NULL),
(236, 68, 5, 1, '10', '2025-03-28 08:19:09', '2025-03-28 08:19:09', NULL),
(237, 68, 6, 2, '10', '2025-03-28 08:19:09', '2025-03-28 08:19:09', NULL),
(238, 70, 6, 1, '10', '2025-03-28 08:25:45', '2025-03-28 08:25:45', NULL),
(239, 70, 6, 2, '10', '2025-03-28 08:25:45', '2025-03-28 08:25:45', NULL),
(240, 70, 6, 3, '10', '2025-03-28 08:25:45', '2025-03-28 08:25:45', NULL),
(241, 70, 4, 1, '10', '2025-03-28 08:25:45', '2025-03-28 08:25:45', NULL),
(242, 70, 4, 2, '10', '2025-03-28 08:25:45', '2025-03-28 08:25:45', NULL),
(243, 70, 4, 3, '10', '2025-03-28 08:25:45', '2025-03-28 08:25:45', NULL),
(244, 70, 4, 4, '10', '2025-03-28 08:25:45', '2025-03-28 08:25:45', NULL),
(245, 71, 6, 2, '10', '2025-03-28 08:34:21', '2025-03-28 08:34:21', NULL),
(246, 71, 6, 3, '10', '2025-03-28 08:34:21', '2025-03-28 08:34:21', NULL),
(247, 71, 5, 1, '10', '2025-03-28 08:34:21', '2025-03-28 08:34:21', NULL),
(248, 71, 5, 2, '10', '2025-03-28 08:34:21', '2025-03-28 08:34:21', NULL),
(249, 71, 5, 3, '10', '2025-03-28 08:34:21', '2025-03-28 08:34:21', NULL),
(250, 71, 2, 1, '10', '2025-03-28 08:34:21', '2025-03-28 08:34:21', NULL),
(251, 71, 2, 2, '10', '2025-03-28 08:34:21', '2025-03-28 08:34:21', NULL),
(252, 72, 6, 1, '10', '2025-03-28 08:38:26', '2025-03-28 08:38:26', NULL),
(253, 72, 6, 2, '10', '2025-03-28 08:38:26', '2025-03-28 08:38:26', NULL),
(254, 72, 6, 3, '10', '2025-03-28 08:38:26', '2025-03-28 08:38:26', NULL),
(255, 72, 2, 1, '10', '2025-03-28 08:38:26', '2025-03-28 08:38:26', NULL),
(256, 72, 2, 2, '10', '2025-03-28 08:38:26', '2025-03-28 08:38:26', NULL),
(257, 72, 2, 3, '10', '2025-03-28 08:38:26', '2025-03-28 08:38:26', NULL),
(258, 77, 6, 1, '10', '2025-03-28 08:53:59', '2025-03-28 08:53:59', NULL),
(259, 77, 6, 2, '10', '2025-03-28 08:53:59', '2025-03-28 08:53:59', NULL),
(260, 77, 6, 3, '10', '2025-03-28 08:53:59', '2025-03-28 08:53:59', NULL),
(261, 77, 5, 1, '10', '2025-03-28 08:53:59', '2025-03-28 08:53:59', NULL),
(262, 77, 5, 2, '10', '2025-03-28 08:53:59', '2025-03-28 08:53:59', NULL),
(263, 77, 5, 3, '10', '2025-03-28 08:53:59', '2025-03-28 08:53:59', NULL),
(264, 78, 6, 1, '10', '2025-03-28 09:03:14', '2025-03-28 09:03:14', NULL),
(265, 78, 6, 2, '10', '2025-03-28 09:03:14', '2025-03-28 09:03:14', NULL),
(266, 78, 6, 3, '10', '2025-03-28 09:03:14', '2025-03-28 09:03:14', NULL),
(267, 78, 1, 1, '10', '2025-03-28 09:03:14', '2025-03-28 09:03:14', NULL),
(268, 78, 1, 3, '10', '2025-03-28 09:03:14', '2025-03-28 09:03:14', NULL),
(269, 78, 5, 1, '10', '2025-03-28 09:03:14', '2025-03-28 09:03:14', NULL),
(270, 78, 5, 2, '10', '2025-03-28 09:03:14', '2025-03-28 09:03:14', NULL),
(271, 78, 5, 3, '10', '2025-03-28 09:03:14', '2025-03-28 09:03:14', NULL),
(272, 79, 6, 1, '10', '2025-03-28 09:11:38', '2025-03-28 09:11:38', NULL),
(273, 79, 6, 2, '10', '2025-03-28 09:11:38', '2025-03-28 09:11:38', NULL),
(274, 79, 5, 1, '10', '2025-03-28 09:11:38', '2025-03-28 09:11:38', NULL),
(275, 79, 5, 2, '10', '2025-03-28 09:11:38', '2025-03-28 09:11:38', NULL),
(276, 79, 5, 3, '10', '2025-03-28 09:11:38', '2025-03-28 09:11:38', NULL),
(277, 83, 6, 1, '10', '2025-03-28 09:43:17', '2025-03-28 09:43:17', NULL),
(278, 83, 6, 2, '10', '2025-03-28 09:43:17', '2025-03-28 09:43:17', NULL),
(279, 83, 6, 3, '10', '2025-03-28 09:43:17', '2025-03-28 09:43:17', NULL),
(280, 83, 6, 4, '10', '2025-03-28 09:43:17', '2025-03-28 09:43:17', NULL),
(281, 83, 6, 5, '10', '2025-03-28 09:43:17', '2025-03-28 09:43:17', NULL),
(282, 83, 4, 1, '10', '2025-03-28 09:43:17', '2025-03-28 09:43:17', NULL),
(283, 83, 4, 2, '10', '2025-03-28 09:43:17', '2025-03-28 09:43:17', NULL),
(284, 83, 5, 1, '10', '2025-03-28 09:43:17', '2025-03-28 09:43:17', NULL),
(285, 83, 5, 2, '10', '2025-03-28 09:43:17', '2025-03-28 09:43:17', NULL),
(286, 83, 5, 3, '10', '2025-03-28 09:43:17', '2025-03-28 09:43:17', NULL),
(287, 84, 5, 1, '10', '2025-03-28 16:52:15', '2025-03-28 16:52:15', NULL),
(288, 84, 5, 2, '10', '2025-03-28 16:52:15', '2025-03-28 16:52:15', NULL),
(289, 84, 5, 3, '10', '2025-03-28 16:52:15', '2025-03-28 16:52:15', NULL),
(290, 84, 1, 1, '10', '2025-03-28 16:52:15', '2025-03-28 16:52:15', NULL),
(291, 84, 1, 2, '10', '2025-03-28 16:52:15', '2025-03-28 16:52:15', NULL),
(292, 84, 1, 3, '10', '2025-03-28 16:52:15', '2025-03-28 16:52:15', NULL),
(293, 84, 1, 4, '10', '2025-03-28 16:52:15', '2025-03-28 16:52:15', NULL),
(294, 85, 6, 1, '10', '2025-03-28 16:57:18', '2025-03-28 16:57:18', NULL),
(295, 85, 6, 2, '10', '2025-03-28 16:57:18', '2025-03-28 16:57:18', NULL),
(296, 85, 6, 3, '9', '2025-03-28 16:57:18', '2025-03-28 16:57:18', NULL),
(297, 85, 4, 1, '10', '2025-03-28 16:57:18', '2025-03-28 16:57:18', NULL),
(298, 85, 4, 2, '10', '2025-03-28 16:57:18', '2025-03-28 16:57:18', NULL),
(299, 85, 4, 3, '10', '2025-03-28 16:57:18', '2025-03-28 16:57:18', NULL),
(300, 85, 4, 4, '10', '2025-03-28 16:57:18', '2025-03-28 16:57:18', NULL),
(301, 86, 6, 1, '10', '2025-03-28 17:05:03', '2025-03-28 17:05:03', NULL),
(302, 86, 6, 2, '10', '2025-03-28 17:05:03', '2025-03-28 17:05:03', NULL),
(303, 86, 6, 3, '10', '2025-03-28 17:05:03', '2025-03-28 17:05:03', NULL),
(304, 86, 5, 1, '10', '2025-03-28 17:05:03', '2025-03-28 17:05:03', NULL),
(305, 86, 5, 2, '10', '2025-03-28 17:05:03', '2025-03-28 17:05:03', NULL),
(306, 87, 6, 1, '10', '2025-03-28 17:09:37', '2025-03-28 17:09:37', NULL),
(307, 87, 6, 2, '10', '2025-03-28 17:09:37', '2025-03-28 17:09:37', NULL),
(308, 87, 6, 3, '10', '2025-03-28 17:09:37', '2025-03-28 17:09:37', NULL),
(309, 87, 5, 1, '10', '2025-03-28 17:09:37', '2025-03-28 17:09:37', NULL),
(310, 87, 5, 2, '10', '2025-03-28 17:09:37', '2025-03-28 17:09:37', NULL),
(311, 87, 5, 3, '10', '2025-03-28 17:09:37', '2025-03-28 17:09:37', NULL),
(324, 100, 1, 1, '4', '2025-04-23 07:57:40', '2025-04-23 07:57:40', NULL),
(325, 100, 1, 2, '3', '2025-04-23 07:57:40', '2025-04-23 07:57:40', NULL),
(326, 100, 2, 3, '3', '2025-04-23 07:57:40', '2025-04-23 07:57:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `shipper`
--

CREATE TABLE `shipper` (
  `id` bigint UNSIGNED NOT NULL,
  `name_shipper` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone1` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone2` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` bigint UNSIGNED NOT NULL,
  `size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `size`, `created_at`, `updated_at`) VALUES
(1, 'S', NULL, NULL),
(2, 'M', NULL, NULL),
(3, 'L', NULL, NULL),
(4, 'XL', NULL, NULL),
(5, 'XXL', NULL, NULL),
(6, '2XL', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `status_orders`
--

CREATE TABLE `status_orders` (
  `id` bigint UNSIGNED NOT NULL,
  `name_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('customer','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'customer',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone_number`, `role`, `email_verified_at`, `gender`, `user_image`, `password`, `remember_token`, `created_at`, `updated_at`, `deleted_at`, `status`) VALUES
(2, 'Cuong Admin', 'cuongnq2@gmail.com', '0335313203', 'admin', NULL, 'men', NULL, '$2y$10$8b/Oc8ouzp6fqlFNFXWXvO9OGKaiXgv/204ezLzRCfvVPqIXasuFu', NULL, '2025-03-31 03:08:17', '2025-04-09 08:06:17', NULL, 'ACTIVE'),
(18, 'Nguyen Cuong', 'cuonggau251125@gmail.com', '0335313203', 'customer', NULL, 'men', NULL, '$2y$10$pesRRkNbKgS6hVOT2DT84ORXz22VJoLNB2qlhjzMFzikdk7oKF1K2', NULL, '2025-04-14 03:21:48', '2025-04-14 03:21:48', NULL, 'ACTIVE'),
(19, 'Nguyễn Quốc Cường', 'cuonghocfpt@gmail.com', '0335313203', 'customer', NULL, 'men', NULL, '$2y$10$fNKQQXWzGndPHXFWEo2XauFbb6ZAX.AN5iQwqrRF9O5CQE3iWCdSm', NULL, '2025-04-23 07:40:38', '2025-04-23 07:40:38', NULL, 'ACTIVE');

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` bigint UNSIGNED NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `used` int NOT NULL DEFAULT '0',
  `voucher_price` double UNSIGNED DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `min_order_value` bigint UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`id`, `code`, `quantity`, `used`, `voucher_price`, `start_date`, `end_date`, `status`, `created_at`, `updated_at`, `min_order_value`) VALUES
(22, 'DATN2025', 101, 0, 100000, '2025-04-17 17:00:00', '2025-04-18 10:00:00', 'LOCKED', '2025-04-09 06:19:48', '2025-04-23 03:51:50', 200000),
(25, 'DATN2', 1111, 0, 100000, '2025-04-10 04:00:00', '2025-04-13 05:00:00', 'LOCKED', '2025-04-10 02:31:42', '2025-04-23 03:51:50', 200000),
(27, 'DATN22', 111, 0, 100000, '2025-04-11 00:00:00', '2025-04-25 00:00:00', 'LOCKED', '2025-04-10 02:47:23', '2025-04-25 08:51:50', 200000);

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `carts_pk` (`product_id`,`color`,`size`),
  ADD KEY `carts_users_id_fk` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_products_id_fk` (`product_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `image_product`
--
ALTER TABLE `image_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `image_product_products_id_foreign` (`products_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_user_id_foreign` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_detail_orders_id_fk` (`order_id`);

--
-- Indexes for table `order_status_histories`
--
ALTER TABLE `order_status_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_status_histories_order_id_foreign` (`order_id`),
  ADD KEY `order_status_histories_updated_by_foreign` (`updated_by`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payment_status_histories`
--
ALTER TABLE `payment_status_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payment_status_histories_order_id_foreign` (`order_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_categories_id_foreign` (`categories_id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_variants_color_id_foreign` (`color_id`),
  ADD KEY `product_variants_product_id_foreign` (`product_id`),
  ADD KEY `product_variants_size_id_foreign` (`size_id`);

--
-- Indexes for table `shipper`
--
ALTER TABLE `shipper`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sizes_name_unique` (`size`);

--
-- Indexes for table `status_orders`
--
ALTER TABLE `status_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vouchers_pk` (`code`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wishlist_products_id_fk` (`product_id`),
  ADD KEY `wishlist_users_id_fk` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `image_product`
--
ALTER TABLE `image_product`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=281;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `order_status_histories`
--
ALTER TABLE `order_status_histories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payment_status_histories`
--
ALTER TABLE `payment_status_histories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=327;

--
-- AUTO_INCREMENT for table `shipper`
--
ALTER TABLE `shipper`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `status_orders`
--
ALTER TABLE `status_orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `image_product`
--
ALTER TABLE `image_product`
  ADD CONSTRAINT `image_product_products_id_foreign` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `location_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_status_histories`
--
ALTER TABLE `order_status_histories`
  ADD CONSTRAINT `order_status_histories_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_status_histories_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payment_status_histories`
--
ALTER TABLE `payment_status_histories`
  ADD CONSTRAINT `payment_status_histories_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_categories_id_foreign` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_color_id_foreign` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_variants_size_id_foreign` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
