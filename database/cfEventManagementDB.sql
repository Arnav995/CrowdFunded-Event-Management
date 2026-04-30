CREATE DATABASE  IF NOT EXISTS `event_management` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `event_management`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: event_management
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contributions`
--

DROP TABLE IF EXISTS `contributions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contributions` (
  `contribution_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`contribution_id`),
  KEY `user_id` (`user_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `contributions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `contributions_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  CONSTRAINT `contributions_chk_1` CHECK ((`amount` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contributions`
--

LOCK TABLES `contributions` WRITE;
/*!40000 ALTER TABLE `contributions` DISABLE KEYS */;
INSERT INTO `contributions` VALUES (1,2,1,500.00,'2026-03-27 14:04:08'),(2,1,1,500.00,'2026-03-27 14:05:14'),(3,1,1,500.00,'2026-03-27 14:05:25'),(4,1,1,500.00,'2026-03-27 14:06:33'),(5,2,1,500.00,'2026-03-27 14:08:21'),(6,3,1,15000.00,'2026-04-18 08:12:00'),(7,4,1,25000.00,'2026-04-18 08:12:00'),(8,5,1,20000.00,'2026-04-18 08:12:00'),(9,6,1,10000.00,'2026-04-18 08:12:00'),(10,2,1,17500.00,'2026-04-18 08:12:00'),(12,2,3,30000.00,'2026-04-18 08:12:45'),(13,5,3,45000.00,'2026-04-18 08:12:45'),(14,6,3,25000.00,'2026-04-18 08:12:45'),(15,2,4,20000.00,'2026-04-18 08:12:45'),(16,3,4,15000.00,'2026-04-18 08:12:45'),(18,9,1,1000.00,'2026-04-18 20:50:30'),(21,9,1,100.00,'2026-04-18 20:50:56'),(22,9,1,100.00,'2026-04-18 20:51:00'),(23,11,1,10.00,'2026-04-18 20:52:53'),(24,11,1,10.00,'2026-04-18 21:04:46'),(25,9,2,10.00,'2026-04-20 06:10:15'),(26,9,15,100.00,'2026-04-20 06:33:55'),(27,9,2,1000.00,'2026-04-20 06:39:35'),(28,9,1,9.00,'2026-04-20 06:47:10'),(29,9,1,2.00,'2026-04-20 07:21:12'),(30,9,1,100.00,'2026-04-20 07:47:15'),(31,9,1,100.00,'2026-04-20 14:35:15'),(32,9,14,100.00,'2026-04-20 18:31:23'),(33,9,18,10.00,'2026-04-20 18:32:48'),(34,9,1,10.00,'2026-04-20 18:35:23'),(35,9,1,10.00,'2026-04-20 18:42:53'),(36,9,21,10.00,'2026-04-20 18:44:40'),(37,9,19,100.00,'2026-04-28 17:39:14'),(38,9,19,400.00,'2026-04-28 17:39:21'),(39,9,1,10.00,'2026-04-30 20:35:32'),(40,9,1,10.00,'2026-04-30 20:46:06'),(41,12,24,1909.00,'2026-04-30 20:59:46'),(42,9,25,50.00,'2026-04-30 21:44:57'),(43,9,26,1000.00,'2026-04-30 21:46:46'),(44,9,26,80.00,'2026-04-30 21:46:54'),(45,9,23,1000.00,'2026-04-30 21:55:23'),(46,9,27,1000.00,'2026-04-30 21:55:31'),(47,9,23,5000.00,'2026-04-30 21:55:45'),(48,9,27,3000.00,'2026-04-30 21:56:06'),(49,12,17,1000.00,'2026-04-30 21:57:18'),(50,12,17,5000.00,'2026-04-30 21:57:48'),(51,9,18,900.00,'2026-04-30 21:58:47'),(52,9,20,100.00,'2026-04-30 22:00:36'),(53,9,20,500.00,'2026-04-30 22:00:40'),(54,9,28,5000.00,'2026-04-30 22:11:06'),(55,9,32,500.00,'2026-04-30 22:15:13'),(56,9,29,4000.00,'2026-04-30 22:25:39'),(57,9,19,10.00,'2026-04-30 22:31:16'),(58,9,29,10.00,'2026-04-30 22:45:58'),(59,9,29,5000.00,'2026-04-30 22:48:19'),(60,9,29,1000.00,'2026-04-30 22:48:22'),(61,9,32,100.00,'2026-04-30 22:54:42'),(62,9,32,1000.00,'2026-04-30 22:54:44'),(63,9,28,5000.00,'2026-04-30 22:54:55');
/*!40000 ALTER TABLE `contributions` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_contribution_insert` AFTER INSERT ON `contributions` FOR EACH ROW BEGIN
    -- Update running total
    UPDATE events 
    SET current_amount = current_amount + NEW.amount
    WHERE event_id = NEW.event_id;

    -- Mark funded only if target reached
    UPDATE events
    SET status = 'funded'
    WHERE event_id = NEW.event_id
    AND status = 'approved'
    AND current_amount >= target_amount;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `event_summary`
--

DROP TABLE IF EXISTS `event_summary`;
/*!50001 DROP VIEW IF EXISTS `event_summary`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `event_summary` AS SELECT 
 1 AS `event_id`,
 1 AS `title`,
 1 AS `target_amount`,
 1 AS `current_amount`,
 1 AS `status`,
 1 AS `creator`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `target_amount` decimal(10,2) NOT NULL,
  `current_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `deadline` datetime NOT NULL,
  `status` enum('pending','approved','funded','failed','rejected') DEFAULT 'pending',
  `created_by` int DEFAULT NULL,
  `approved_by` int DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `created_by` (`created_by`),
  KEY `approved_by` (`approved_by`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `events_ibfk_2` FOREIGN KEY (`approved_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `events_chk_1` CHECK ((`target_amount` > 0)),
  CONSTRAINT `events_chk_2` CHECK ((`current_amount` >= 0)),
  CONSTRAINT `events_chk_3` CHECK ((`target_amount` > 0)),
  CONSTRAINT `events_chk_4` CHECK ((`current_amount` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Tech Fest','Super Cool Event',90000.00,88971.00,'2026-12-11 00:00:00','approved',2,NULL),(2,'Dhurandhar Screening','Pretty decent hindi movie',10000.00,1010.00,'2026-09-11 00:00:00','approved',2,NULL),(3,'Annual College Cultural Fest 2025','Our college annual cultural fest \"Tarang\" brings together 2000+ students from 15 colleges across Delhi NCR. Funds go toward stage setup, sound systems, lighting, celebrity performances, and food stalls. Help us make this the biggest fest yet!',150000.00,100000.00,'2025-08-30 00:00:00','failed',2,1),(4,'Rooftop Astronomy Night','A special astronomy event on the college rooftop with 6 high-powered telescopes, guided star-gazing sessions, astrophotography workshop, and a guest lecture by an ISRO scientist. Open to all science enthusiasts.',45000.00,35000.00,'2025-07-20 00:00:00','failed',3,1),(5,'Inter-College Hackathon: Build for Bharat','A 36-hour hackathon focused on solving real Indian problems in healthcare, agriculture, fintech, and education. Cash prizes worth ₹1,00,000, mentorship from industry leaders, and internship offers from top startups.',200000.00,0.00,'2025-09-15 00:00:00','failed',4,1),(6,'Campus Mental Health & Wellness Week','A week-long series of events including therapy sessions, yoga workshops, stress management talks, and anonymous counseling booths. Breaking the stigma around mental health on campus.',60000.00,0.00,'2025-07-10 00:00:00','failed',5,1),(7,'Photography Exhibition: Faces of Delhi','A curated photo exhibition showcasing 200 portraits of everyday Delhiites — street vendors, students, elderly residents — printed on large canvas and displayed in the college auditorium for a week.',35000.00,0.00,'2025-05-01 00:00:00','approved',2,1),(8,'E-Sports Tournament: Valorant & BGMI','A 2-day e-sports tournament with 128 participants across Valorant and BGMI. Prize pool of ₹50,000. Needs funds for gaming setup rental, streaming equipment, trophies, and refreshments.',80000.00,0.00,'2025-08-05 00:00:00','approved',6,NULL),(9,'Open Mic & Spoken Word Night','Monthly open mic event for poets, comedians, musicians, and storytellers. Provides a safe platform for student expression. Funds go toward audio equipment, venue decoration, and promotion.',25000.00,0.00,'2025-07-25 00:00:00','rejected',3,NULL),(10,'Winter Sports Meet 2024','Inter-departmental winter sports competition featuring football, basketball, badminton, and kabaddi. Unfortunately the campaign deadline passed before we reached our target.',120000.00,0.00,'2024-12-15 00:00:00','failed',4,1),(11,'Vaisakhi Da Mela','dadadadq',1000.00,0.00,'2026-04-19 00:00:00','approved',11,NULL),(12,'Vaisakhi Da Mela','v',100.00,0.00,'2026-04-19 00:00:00','approved',9,NULL),(13,'dad','qeq',100.00,0.00,'2026-04-25 00:00:00','approved',9,NULL),(14,'yaaran di yaari','yaaran di yaari',9999.00,100.00,'2026-04-30 00:00:00','approved',9,NULL),(15,'WWE Wrestlemania Screening','welcome',10000.00,100.00,'2026-04-23 00:00:00','approved',11,NULL),(16,'Amit Trivedi Concers','Saturanalia',100000.00,0.00,'2026-07-31 00:00:00','rejected',9,NULL),(17,'Eminem Concert','Lose Yourself',100000.00,6000.00,'2026-11-19 00:00:00','approved',11,NULL),(18,'jatt smw rip barsi','hey hey',1000.00,910.00,'2026-11-26 00:00:00','approved',9,NULL),(19,'sup dawg','heyy',1000.00,510.00,'2026-07-03 00:00:00','approved',9,NULL),(20,'hi','hey',1000.00,600.00,'2026-06-05 00:00:00','approved',9,NULL),(21,'retard fest','hey',100.00,10.00,'2026-04-23 00:00:00','approved',9,NULL),(22,'HELLLO TESTING','',1000.00,0.00,'2026-05-28 00:00:00','rejected',9,NULL),(23,'DBMS Project Submission','Submit the project...',29750.00,6000.00,'2026-06-11 00:00:00','approved',9,NULL),(24,'Agentic AI Hackathon','',10000.00,1909.00,'2026-07-03 00:00:00','approved',12,NULL),(25,'TESTING 123','',1000.00,50.00,'2026-06-05 00:00:00','approved',9,NULL),(26,'SportsFest','',10000.00,1080.00,'2026-08-14 00:00:00','approved',9,NULL),(27,'Agentic AI Hackspire','',10000.00,4000.00,'2026-06-12 00:00:00','approved',12,NULL),(28,'Javed Ali Concert','',10000.00,10000.00,'2026-06-27 00:00:00','funded',9,NULL),(29,'WWE Wrestlemania Screening','',10000.00,10010.00,'2026-05-30 00:00:00','funded',9,NULL),(30,'WWE Wrestlemania Screening','',10000.00,0.00,'2026-07-03 00:00:00','rejected',9,NULL),(31,'WWE Wrestlemania Screening','1000',10000.00,0.00,'2026-05-30 00:00:00','approved',9,NULL),(32,'Vaisakhi','',10000.00,1600.00,'2026-06-05 00:00:00','approved',9,NULL),(33,'WWE Wrestlemania Screening','heyy',10000.00,0.00,'2026-06-05 00:00:00','pending',9,NULL);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `status` enum('sucess','failed') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transaction_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `wallet_balance` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin User','admin@test.com','adminPass123','admin','2026-03-27 11:50:05',0.00),(2,'Student User 1','student@thapar.edu','studentPass123','user','2026-03-27 11:50:05',0.00),(3,'Admin User','admin@cfevents.com','$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVNugQ.0mS','admin','2026-04-18 08:11:39',0.00),(4,'Arjun Sharma','arjun@example.com','$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVNugQ.0mS','user','2026-04-18 08:11:39',0.00),(5,'Priya Mehta','priya@example.com','$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVNugQ.0mS','user','2026-04-18 08:11:39',0.00),(6,'Rohit Verma','rohit@example.com','$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVNugQ.0mS','user','2026-04-18 08:11:39',0.00),(7,'Sneha Kapoor','sneha@example.com','$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVNugQ.0mS','user','2026-04-18 08:11:39',0.00),(8,'Dev Anand','dev@example.com','$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVNugQ.0mS','user','2026-04-18 08:11:39',0.00),(9,'Arnav Gandhi','arnavgandhi14@gmail.com','$2b$10$Kwk3qcdqEOwMIREKUNKlSuGrmfEGMlCyK.DRw7joutOcqDtW8QJ5S','admin','2026-04-18 11:48:41',10830.00),(10,'Arnav Gandhi','arnavalternate619@gmail.com','$2b$10$iUjEBTFiGPPHV7BHns8FZeT3BZWFXd.tGe/5Qes5bxs81kIdNLSrW','user','2026-04-18 11:49:01',0.00),(11,'SMW','jattsmw69@gmai.com','$2b$10$.gpveNi1XC9DIK/F/zYdSOB4g5xP5DQ/5C0wk3D7BqXENoH/r6XJK','user','2026-04-18 11:55:06',0.00),(12,'DBMS Testest','dbms@codechef.com','$2b$10$1IBhY4lWmLERzQC6V1ufLOZiBMW7yY2K2MpXj65j6cA9.IXDiLaVi','user','2026-04-30 20:58:14',4091.00);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet_transactions`
--

DROP TABLE IF EXISTS `wallet_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet_transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `type` enum('credit','debit') DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `wallet_transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet_transactions`
--

LOCK TABLES `wallet_transactions` WRITE;
/*!40000 ALTER TABLE `wallet_transactions` DISABLE KEYS */;
INSERT INTO `wallet_transactions` VALUES (1,9,100.00,'credit','Added Funds','2026-04-30 20:35:24'),(2,9,10.00,'debit','Contribution','2026-04-30 20:35:32'),(3,9,10.00,'debit','Contribution','2026-04-30 20:46:06'),(4,12,2000.00,'credit','Added Funds','2026-04-30 20:59:12'),(5,12,1909.00,'debit','Contribution','2026-04-30 20:59:46'),(6,12,5000.00,'credit','Added Funds','2026-04-30 21:09:38'),(7,9,50.00,'debit','Contribution','2026-04-30 21:44:57'),(8,9,5000.00,'credit','Added Funds','2026-04-30 21:45:03'),(9,9,1000.00,'debit','Contribution','2026-04-30 21:46:46'),(10,9,80.00,'debit','Contribution','2026-04-30 21:46:54'),(11,9,1000.00,'debit','Contribution','2026-04-30 21:55:23'),(12,9,1000.00,'debit','Contribution','2026-04-30 21:55:31'),(13,9,5000.00,'credit','Added Funds','2026-04-30 21:55:35'),(14,9,5000.00,'credit','Added Funds','2026-04-30 21:55:36'),(15,9,5000.00,'credit','Added Funds','2026-04-30 21:55:37'),(16,9,5000.00,'credit','Added Funds','2026-04-30 21:55:38'),(17,9,5000.00,'debit','Contribution','2026-04-30 21:55:45'),(18,9,3000.00,'debit','Contribution','2026-04-30 21:56:06'),(19,12,1000.00,'debit','Contribution','2026-04-30 21:57:18'),(20,12,5000.00,'credit','Added Funds','2026-04-30 21:57:36'),(21,12,5000.00,'debit','Contribution','2026-04-30 21:57:48'),(22,9,900.00,'debit','Contribution','2026-04-30 21:58:47'),(23,9,100.00,'debit','Contribution','2026-04-30 22:00:36'),(24,9,500.00,'debit','Contribution','2026-04-30 22:00:40'),(25,9,5000.00,'debit','Contribution','2026-04-30 22:11:06'),(26,9,500.00,'debit','Contribution','2026-04-30 22:15:13'),(27,9,4000.00,'debit','Contribution','2026-04-30 22:25:39'),(28,9,10.00,'debit','Contribution','2026-04-30 22:31:16'),(29,9,10.00,'debit','Contribution','2026-04-30 22:45:58'),(30,9,5000.00,'credit','Added Funds','2026-04-30 22:48:12'),(31,9,5000.00,'credit','Added Funds','2026-04-30 22:48:13'),(32,9,5000.00,'debit','Contribution','2026-04-30 22:48:19'),(33,9,1000.00,'debit','Contribution','2026-04-30 22:48:22'),(34,9,100.00,'debit','Contribution','2026-04-30 22:54:42'),(35,9,1000.00,'debit','Contribution','2026-04-30 22:54:44'),(36,9,5000.00,'credit','Added Funds','2026-04-30 22:54:49'),(37,9,5000.00,'credit','Added Funds','2026-04-30 22:54:50'),(38,9,5000.00,'debit','Contribution','2026-04-30 22:54:55');
/*!40000 ALTER TABLE `wallet_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'event_management'
--

--
-- Dumping routines for database 'event_management'
--
/*!50003 DROP PROCEDURE IF EXISTS `add_money` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_money`(
	IN uid INT,
    IN amt DECIMAL(10,2)
)
BEGIN
IF amt<=0 THEN
	SIGNAL SQLSTATE '45000'
    SET message_text = 'Invalid Amount';
END IF;

START TRANSACTION;

UPDATE users
SET wallet_balance = wallet_balance + amt
WHERE user_id = uid;

INSERT INTO wallet_transactions(user_id, amount,type, description)
VALUES (uid, amt,'credit','Added Funds');
COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `contribute_to_event` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `contribute_to_event`(
	IN uid INT,
    IN eid INT,
    IN amt DECIMAL(10,2)
)
BEGIN
	DECLARE user_balance DECIMAL(10,2);
    
    START TRANSACTION;
    
    SELECT wallet_balance INTO user_balance
    FROM users
    WHERE user_id = uid
    FOR UPDATE;
IF user_balance < amt THEN
	SIGNAL SQLSTATE '45000'
    SET message_text = 'INSUFFICIENT WALLET BALANCE';
END IF;

UPDATE users
SET wallet_balance = wallet_balance - amt
WHERE user_id = uid;

INSERT INTO wallet_transactions(user_id,amount,type,description)
VALUES (uid,amt,'debit','Contribution');

INSERT INTO contributions(user_id,event_id,amount)
VALUES (uid,eid,amt);

COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `process_refunds` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `process_refunds`(IN eid INT)
BEGIN 
	DECLARE done INT DEFAULT FALSE;
    DECLARE uid INT;
    DECLARE amt DECIMAL(10,2);
	
	DECLARE cur CURSOR FOR
		SELECT user_id, amount 
        FROM contributions
		WHERE event_id = eid;
	
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    START TRANSACTION;
    
    UPDATE events
    SET status = 'failed'
    WHERE event_id = eid;
    
    OPEN cur;
    
    read_loop: LOOP
		FETCH cur INTO uid,amt;
        
	IF done THEN 
		LEAVE read_loop;
	END IF;
    
    UPDATE users
    SET wallet_balance = wallet_balance + amt
    WHERE user_id = uid;

	INSERT INTO wallet_transactions(user_id,amount,type,description)
    VALUES(uid, amt, 'credit', 'Refund for failed event');
    
    END LOOP;
    CLOSE cur;
    
    COMMIT;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `event_summary`
--

/*!50001 DROP VIEW IF EXISTS `event_summary`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `event_summary` AS select `e`.`event_id` AS `event_id`,`e`.`title` AS `title`,`e`.`target_amount` AS `target_amount`,`e`.`current_amount` AS `current_amount`,`e`.`status` AS `status`,`u`.`name` AS `creator` from (`events` `e` join `users` `u` on((`e`.`created_by` = `u`.`user_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-01  4:30:12
