-- MySQL dump 10.13  Distrib 9.2.0, for macos14.7 (arm64)
--
-- Host: localhost    Database: datn_spr2025
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `type` enum('main','intro','advertisement') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'advertisement',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'anhr dep',1,'main',NULL,NULL),(2,'anhr hay ',1,'intro',NULL,NULL),(3,'anh qua hay',0,'advertisement',NULL,NULL),(4,'123',1,'advertisement',NULL,NULL),(5,'123',1,'advertisement',NULL,NULL),(6,NULL,1,'intro','2025-02-16 05:03:28','2025-02-16 05:03:28'),(7,'Banners/uwWGHRrAztGZwDlw3Rrs3x0kJzmEVQMW8473ihs6.jpg',1,'intro','2025-02-16 05:09:44','2025-02-16 05:09:44'),(8,'Banners/R6puHmDlDbe0lmFQJx7RQCt5SzXbMazMIl64yS1y.jpg',1,'intro','2025-02-16 06:01:57','2025-02-16 06:01:57'),(9,'Banners/ASHTwNAmxo18zrzQ3Nd86u2u1GsVJlJAKDWpIdcS.jpg',1,'intro','2025-02-16 06:02:26','2025-02-16 06:02:26');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` bigint unsigned NOT NULL,
  `product_variants_id` bigint unsigned NOT NULL,
  `quantity` bigint NOT NULL,
  `sub_total` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_items_cart_id_foreign` (`cart_id`),
  CONSTRAINT `cart_items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `guest_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cart_items` json DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `carts_guest_id_unique` (`guest_id`),
  KEY `carts_user_id_foreign` (`user_id`),
  CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('women','man') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Form Slim Fit','women',NULL,NULL),(2,'Regular Fit','man',NULL,NULL),(3,'Smart Fit','man',NULL,NULL),(4,'Form Loose Fit','man',NULL,NULL),(5,'Form Slim Fit','man',NULL,NULL),(6,'Regular Fit','man',NULL,NULL),(7,'Smart Fit','women',NULL,NULL),(8,'Form Loose Fit','man',NULL,NULL),(9,'Form Slim Fit','man',NULL,NULL),(10,'Regular Fit','man',NULL,NULL),(11,'Smart Fit','man',NULL,NULL),(12,'Form Loose Fit','women',NULL,NULL),(13,'Form Slim Fit','women',NULL,NULL),(14,'Regular Fit','man',NULL,NULL),(15,'Smart Fit','man',NULL,NULL),(16,'Form Loose Fit','women',NULL,NULL),(17,'Form Slim Fit','women',NULL,NULL),(18,'Regular Fit','man',NULL,NULL),(19,'Smart Fit','women',NULL,NULL),(20,'Form Loose Fit','women',NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'red',NULL,NULL),(2,'blue',NULL,NULL),(3,'green',NULL,NULL),(4,'yellow',NULL,NULL),(5,'black',NULL,NULL),(6,'white',NULL,NULL);
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_product`
--

DROP TABLE IF EXISTS `image_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image_product` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `products_id` bigint unsigned NOT NULL,
  `image_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `image_product_products_id_foreign` (`products_id`),
  CONSTRAINT `image_product_products_id_foreign` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_product`
--

LOCK TABLES `image_product` WRITE;
/*!40000 ALTER TABLE `image_product` DISABLE KEYS */;
INSERT INTO `image_product` VALUES (12,7,'product/1JZvIxqagXDjIb9uDUIBtmB4urkfNqvSmYDyodq0.webp','2025-02-19 01:30:28','2025-02-19 01:30:28'),(13,7,'product/klFw51db4U8ZIWepB3Pro1JC4vmslY8Srmzh7tWn.webp','2025-02-19 01:30:28','2025-02-19 01:30:28');
/*!40000 ALTER TABLE `image_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `location_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `location_detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('Chính','Phụ') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `location_user_id_foreign` (`user_id`),
  CONSTRAINT `location_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `categories_name` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_name` bigint DEFAULT NULL,
  `product_image` int DEFAULT NULL,
  `price_regular` int DEFAULT NULL,
  `price_sale` double DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `order_id` bigint unsigned DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_detail_orders_id_fk` (`order_id`),
  CONSTRAINT `order_detail_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (1,'Red','M',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Clothing',101,201,50000,45000,10,1,4),(2,'Blue','L',2,'2025-03-04 15:56:05','2025-03-04 15:56:05','Shoes',102,202,40000,36000,10,1,4),(3,'Black','XL',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Bags',103,203,60000,54000,10,1,4),(4,'White','S',2,'2025-03-04 15:56:05','2025-03-04 15:56:05','Clothing',104,204,70000,63000,10,2,7),(5,'Green','M',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Shoes',105,205,80000,72000,10,2,7),(6,'Yellow','L',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Accessories',106,206,90000,81000,10,2,5),(7,'Blue','S',2,'2025-03-04 15:56:05','2025-03-04 15:56:05','Bags',107,207,50000,45000,10,3,5),(8,'Red','M',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Shoes',108,208,60000,54000,10,3,7),(9,'Black','XL',3,'2025-03-04 15:56:05','2025-03-04 15:56:05','Clothing',109,209,70000,63000,10,3,7),(10,'White','M',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Accessories',110,210,80000,72000,10,4,7),(11,'Yellow','L',2,'2025-03-04 15:56:05','2025-03-04 15:56:05','Bags',111,211,90000,81000,10,4,8),(12,'Green','S',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Clothing',112,212,100000,90000,10,4,8),(13,'Blue','M',2,'2025-03-04 15:56:05','2025-03-04 15:56:05','Shoes',113,213,110000,99000,10,5,8),(14,'Red','L',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Accessories',114,214,120000,108000,10,5,8),(15,'Black','XL',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Bags',115,215,130000,117000,10,5,9),(16,'White','S',2,'2025-03-04 15:56:05','2025-03-04 15:56:05','Clothing',116,216,70000,63000,10,6,9),(17,'Green','M',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Shoes',117,217,80000,72000,10,6,9),(18,'Yellow','L',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Accessories',118,218,90000,81000,10,6,9),(19,'Blue','S',2,'2025-03-04 15:56:05','2025-03-04 15:56:05','Bags',119,219,50000,45000,10,7,9),(20,'Red','M',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Shoes',120,220,60000,54000,10,7,7),(21,'Black','XL',3,'2025-03-04 15:56:05','2025-03-04 15:56:05','Clothing',121,221,70000,63000,10,7,7),(22,'White','M',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Accessories',122,222,80000,72000,10,8,7),(23,'Yellow','L',2,'2025-03-04 15:56:05','2025-03-04 15:56:05','Bags',123,223,90000,81000,10,8,7),(24,'Green','S',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Clothing',124,224,100000,90000,10,8,7),(25,'Blue','M',2,'2025-03-04 15:56:05','2025-03-04 15:56:05','Shoes',125,225,110000,99000,10,9,4),(26,'Red','L',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Accessories',126,226,120000,108000,10,9,4),(27,'Black','XL',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Bags',127,227,130000,117000,10,9,4),(28,'White','S',2,'2025-03-04 15:56:05','2025-03-04 15:56:05','Clothing',128,228,70000,63000,10,10,4),(29,'Green','M',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Shoes',129,229,80000,72000,10,10,4),(30,'Yellow','L',1,'2025-03-04 15:56:05','2025-03-04 15:56:05','Accessories',130,230,90000,81000,10,10,4);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `voucher_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` datetime NOT NULL,
  `customer_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_price` double NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'DISCOUNT10','2024-03-04 10:30:00','Nguyen Van A','nguyenvana@example.com','0987654321',150,'123 Đường A, Hà Nội','Giao hàng nhanh','2025-03-04 15:46:46','2025-03-04 15:46:46'),(2,'SALE20','2024-03-05 11:00:00','Nguyen Van A','nguyenvana@example.com','0987654321',200,'123 Đường A, Hà Nội',NULL,'2025-03-04 15:46:46','2025-03-04 15:46:46'),(3,NULL,'2024-03-06 15:20:00','Nguyen Van A','nguyenvana@example.com','0987654321',175,'123 Đường A, Hà Nội','Cẩn thận khi giao','2025-03-04 15:46:46','2025-03-04 15:46:46'),(4,'FREESHIP','2024-03-07 08:45:00','Nguyen Van A','nguyenvana@example.com','0987654321',300,'123 Đường A, Hà Nội',NULL,'2025-03-04 15:46:46','2025-03-04 15:46:46'),(5,NULL,'2024-03-08 14:10:00','Nguyen Van A','nguyenvana@example.com','0987654321',120,'123 Đường A, Hà Nội','Liên hệ trước khi giao','2025-03-04 15:46:46','2025-03-04 15:46:46'),(6,'DISCOUNT15','2024-03-04 12:00:00','Tran Thi B','tranthib@example.com','0912345678',250,'456 Đường B, TP.HCM','Giao vào buổi sáng','2025-03-04 15:46:46','2025-03-04 15:46:46'),(7,NULL,'2024-03-05 09:30:00','Tran Thi B','tranthib@example.com','0912345678',180,'456 Đường B, TP.HCM',NULL,'2025-03-04 15:46:46','2025-03-04 15:46:46'),(8,'SALE50','2024-03-06 16:00:00','Tran Thi B','tranthib@example.com','0912345678',500,'456 Đường B, TP.HCM','Kiểm tra hàng trước khi nhận','2025-03-04 15:46:46','2025-03-04 15:46:46'),(9,'FREESHIP','2024-03-07 18:30:00','Tran Thi B','tranthib@example.com','0912345678',320,'456 Đường B, TP.HCM',NULL,'2025-03-04 15:46:46','2025-03-04 15:46:46'),(10,NULL,'2024-03-08 07:45:00','Tran Thi B','tranthib@example.com','0912345678',140,'456 Đường B, TP.HCM','Giao sau 10h sáng','2025-03-04 15:46:46','2025-03-04 15:46:46');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',12,'authToken','bc467fe2801d894d578b30a4c4f3c6d343964fdbb9347e342fa25c95cbb3ad89','[\"*\"]',NULL,NULL,'2025-03-04 08:58:23','2025-03-04 08:58:23');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publish_date` date DEFAULT NULL,
  `views` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variants`
--

DROP TABLE IF EXISTS `product_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_variants` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `color_id` bigint unsigned NOT NULL,
  `size_id` bigint unsigned NOT NULL,
  `quanlity` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_variants_product_id_foreign` (`product_id`),
  KEY `product_variants_color_id_foreign` (`color_id`),
  KEY `product_variants_size_id_foreign` (`size_id`),
  CONSTRAINT `product_variants_color_id_foreign` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_variants_size_id_foreign` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variants`
--

LOCK TABLES `product_variants` WRITE;
/*!40000 ALTER TABLE `product_variants` DISABLE KEYS */;
INSERT INTO `product_variants` VALUES (5,7,1,1,12000,'2025-02-19 00:46:15','2025-02-19 00:46:15');
/*!40000 ALTER TABLE `product_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `categories_id` bigint unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price_regular` double unsigned NOT NULL,
  `price_sale` double unsigned DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `views` bigint unsigned DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `quantity` bigint unsigned DEFAULT NULL,
  `quantitySold` bigint unsigned DEFAULT NULL,
  `rate` double unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `discount` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_categories_id_foreign` (`categories_id`),
  CONSTRAINT `products_categories_id_foreign` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (4,3,'Áo phông nam cổ tròn màu trắng - 1002',NULL,200000,120000,'Áo phông nam cổ tròn màu trắng',0,'kích cỡ : \\n72-89g : size XXL\\n60-72kg : size XL2',NULL,NULL,NULL,'2025-02-18 23:31:58','2025-02-18 23:36:23',NULL,90),(5,2,'Áo thun nữ BLOCKCORE SỐ 11 Áo thun thể thao ngoại cỡ có in số 11 Trang phục đường phố cho bé gái Áo thun bóng đá Unisex',NULL,180000,160000,'Áo phông nam cổ tròn màu trắng',0,NULL,NULL,NULL,NULL,'2025-02-18 23:47:11','2025-02-19 00:46:20',NULL,10),(7,2,'Áo thun nữ BLOCKCORE SỐ 11 Áo thun thể thao ngoại cỡ có in số 11 Trang phục đường phố cho bé gái Áo thun bóng đá Unisex',NULL,120000,160000,'Áo phông nam cổ tròn màu trắng',0,NULL,NULL,NULL,NULL,'2025-02-19 00:46:15','2025-02-19 00:46:15',NULL,20),(8,2,'Áo thun nam BLOCKCORE SỐ 12 Áo thun thể thao ngoại cỡ có in số 11 Trang phục đường phố cho bé gái Áo thun bóng đá Unisex',NULL,120000,160000,'Áo phông nam cổ tròn màu trắng',0,NULL,NULL,NULL,NULL,'2025-02-19 00:46:15','2025-02-19 00:46:15',NULL,60),(9,2,'Áo thun nữ BLOCKCORE SỐ 12 Áo thun thể thao ngoại cỡ có in số 11 Trang phục đường phố cho bé gái Áo thun bóng đá Unisex',NULL,120000,160000,'Áo phông nam cổ tròn màu trắng',0,NULL,NULL,NULL,NULL,'2025-02-19 00:46:15','2025-02-19 00:46:15',NULL,50);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipper`
--

DROP TABLE IF EXISTS `shipper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipper` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name_shipper` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone1` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone2` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipper`
--

LOCK TABLES `shipper` WRITE;
/*!40000 ALTER TABLE `shipper` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sizes_name_unique` (`size`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'S',NULL,NULL),(2,'M',NULL,NULL),(3,'L',NULL,NULL),(4,'XL',NULL,NULL),(5,'XXL',NULL,NULL),(6,'2XL',NULL,NULL);
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_orders`
--

DROP TABLE IF EXISTS `status_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_orders`
--

LOCK TABLES `status_orders` WRITE;
/*!40000 ALTER TABLE `status_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `status_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin User','admin@example.com','0123456789','admin',NULL,'male','default.png','$2y$10$hXNBZH.azAM.7TNJ76grRelT2gM.cANfL2cLIeKCsaji3XawuCNsy',NULL,'2025-02-16 03:50:55','2025-02-16 03:50:55',NULL),(2,'Test User','test@example.com','0987654321','customer',NULL,'male','default.png','$2y$10$KkT0at2OGTp9eVl6wgchiepV85X7CDqB2TH99j6GXBHOesvljlbjW',NULL,'2025-02-16 03:50:55','2025-02-16 03:50:55',NULL),(3,'duy123','hoangduy123@gmail.com','0337035875','customer',NULL,'bede',NULL,'$2y$10$KkT0at2OGTp9eVl6wgchiepV85X7CDqB2TH99j6GXBHOesvljlbjW',NULL,'2025-02-16 08:50:32','2025-02-16 08:50:32',NULL),(5,'hoàng duy','hoangduyoffline@gmail.com','0337035875','customer',NULL,NULL,NULL,'$2y$10$KkT0at2OGTp9eVl6wgchiepV85X7CDqB2TH99j6GXBHOesvljlbjW',NULL,'2025-02-16 09:20:46','2025-02-16 09:20:46',NULL),(12,'Thach','thach27121996@gmail.com','0363600081','customer',NULL,'Male',NULL,'$2y$10$KkT0at2OGTp9eVl6wgchiepV85X7CDqB2TH99j6GXBHOesvljlbjW',NULL,'2025-03-04 08:37:41','2025-03-04 08:37:41',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_type` enum('percent','fixed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_value` decimal(10,2) NOT NULL,
  `min_order_value` decimal(10,2) DEFAULT NULL,
  `max_discount` decimal(10,2) DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `used` int NOT NULL DEFAULT '0',
  `user_id` bigint unsigned DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vouchers_code_unique` (`code`),
  KEY `vouchers_user_id_foreign` (`user_id`),
  CONSTRAINT `vouchers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'datn_spr2025'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-05 21:46:58
