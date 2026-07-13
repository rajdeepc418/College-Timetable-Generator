-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: college_timetable
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `classrooms`
--

DROP TABLE IF EXISTS `classrooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classrooms` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_name` varchar(50) DEFAULT NULL,
  `room_type` varchar(20) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classrooms`
--

LOCK TABLES `classrooms` WRITE;
/*!40000 ALTER TABLE `classrooms` DISABLE KEYS */;
INSERT INTO `classrooms` VALUES (7,'A101','Theory',60),(8,'A102','Theory',60),(9,'A201','Theory',80),(10,'Lab-1','Lab',30),(11,'Lab-2','Lab',30),(12,'Lab-3','Lab',40);
/*!40000 ALTER TABLE `classrooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `faculty_id` int NOT NULL AUTO_INCREMENT,
  `faculty_name` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`faculty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (5,'Dr. Rajesh Kumar','Information Technology','rajesh@college.edu','9876467542'),(6,'Prof.Anita Sharma','Information Technology','anita@college.edu','9876467543'),(7,'Dr.Amit Varma','Computer Science','amit@college.edu','9876467544'),(8,'Prof.Neha Singh','Computer Science','neha@college.edu','9876467544'),(9,'Dr.Viivek Gupta','Electronics','vivek@college.edu','9876467546');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty_preferences`
--

DROP TABLE IF EXISTS `faculty_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty_preferences` (
  `preference_id` int NOT NULL AUTO_INCREMENT,
  `faculty_id` int DEFAULT NULL,
  `morning_preference` varchar(30) DEFAULT NULL,
  `lecture_position` varchar(30) DEFAULT NULL,
  `max_lectures` int DEFAULT NULL,
  `max_workload` int DEFAULT NULL,
  `max_subjects` int DEFAULT NULL,
  `theory_lab_same` varchar(20) DEFAULT NULL,
  `minimum_gap` int DEFAULT NULL,
  PRIMARY KEY (`preference_id`),
  KEY `faculty_id` (`faculty_id`),
  CONSTRAINT `faculty_preferences_ibfk_1` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty_preferences`
--

LOCK TABLES `faculty_preferences` WRITE;
/*!40000 ALTER TABLE `faculty_preferences` DISABLE KEYS */;
INSERT INTO `faculty_preferences` VALUES (3,5,'Anything','Beginning',4,20,2,'Yes',1),(4,6,'Anything','Middle',4,18,2,'Yes',1),(5,7,'Theory Teaching','End',5,22,3,'Yes',1),(6,8,'Anything','Middle',4,20,2,'Yes',1),(7,9,'Theory Teaching','End',3,15,1,'Yes',2);
/*!40000 ALTER TABLE `faculty_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `subject_id` int NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(100) DEFAULT NULL,
  `semester` int DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `faculty_id` int DEFAULT NULL,
  `theory_hours` int DEFAULT NULL,
  `practical_hours` int DEFAULT NULL,
  PRIMARY KEY (`subject_id`),
  KEY `faculty_id` (`faculty_id`),
  CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (6,'Data Structures',3,'Information Technology',5,3,2),(7,'DBMS',3,'Information Technology',5,3,2),(8,'Operating System',3,'Information Technology',6,3,2),(9,'Computer Network',3,'Information Technology',6,3,2),(10,'Java Programming',3,'Computer Science',7,3,2),(11,'Software Engineering',3,'Computer Science',8,3,2),(12,'Digital Electronics',3,'Electronic',9,3,2);
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time_slots`
--

DROP TABLE IF EXISTS `time_slots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_slots` (
  `slot_id` int NOT NULL AUTO_INCREMENT,
  `day_name` varchar(20) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  PRIMARY KEY (`slot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_slots`
--

LOCK TABLES `time_slots` WRITE;
/*!40000 ALTER TABLE `time_slots` DISABLE KEYS */;
INSERT INTO `time_slots` VALUES (1,'Monday','09:00:00','10:00:00'),(2,'Monday','10:00:00','11:00:00'),(3,'Monday','11:00:00','12:00:00'),(4,'Monday','12:00:00','13:00:00'),(5,'Monday','14:00:00','15:00:00'),(6,'Monday','15:00:00','16:00:00'),(7,'Tuesday','09:00:00','10:00:00'),(8,'Tuesday','10:00:00','11:00:00'),(9,'Tuesday','11:00:00','12:00:00'),(10,'Tuesday','12:00:00','01:00:00'),(11,'Tuesday','02:00:00','03:00:00'),(12,'Tuesday','03:00:00','04:00:00'),(13,'Wednesday','09:00:00','10:00:00'),(14,'Wednesday','10:00:00','11:00:00'),(15,'Wednesday','11:00:00','12:00:00'),(16,'Wednesday','12:00:00','01:00:00'),(17,'Wednesday','02:00:00','03:00:00'),(18,'Wednesday','03:00:00','04:00:00'),(19,'Thrusday','09:00:00','10:00:00'),(20,'Thrusday','10:00:00','11:00:00'),(21,'Thrusday','11:00:00','12:00:00'),(22,'Thrusday','12:00:00','01:00:00'),(23,'Thrusday','02:00:00','03:00:00'),(24,'Thrusday','03:00:00','04:00:00'),(25,'Friday','09:00:00','10:00:00'),(26,'Friday','10:00:00','11:00:00'),(27,'Friday','11:00:00','12:00:00'),(28,'Friday','12:00:00','01:00:00'),(29,'Friday','02:00:00','03:00:00'),(30,'Friday','03:00:00','04:00:00'),(31,'Monday','09:00:00','10:00:00'),(32,'Monday','10:00:00','11:00:00'),(33,'Monday','11:00:00','12:00:00'),(34,'Monday','12:00:00','01:00:00'),(35,'Monday','02:00:00','03:00:00'),(36,'Monday','03:00:00','04:00:00'),(37,'Tuesday','09:00:00','10:00:00'),(38,'Tuesday','10:00:00','11:00:00'),(39,'Tuesday','11:00:00','12:00:00'),(40,'Tuesday','12:00:00','01:00:00'),(41,'Tuesday','02:00:00','03:00:00'),(42,'Tuesday','03:00:00','04:00:00'),(43,'Wednesday','09:00:00','10:00:00'),(44,'Wednesday','10:00:00','11:00:00'),(45,'Wednesday','11:00:00','12:00:00'),(46,'Wednesday','12:00:00','01:00:00'),(47,'Wednesday','02:00:00','03:00:00'),(48,'Wednesday','03:00:00','04:00:00'),(49,'Thrusday','09:00:00','10:00:00'),(50,'Thrusday','10:00:00','11:00:00'),(51,'Thrusday','11:00:00','12:00:00'),(52,'Thrusday','12:00:00','01:00:00'),(53,'Thrusday','02:00:00','03:00:00'),(54,'Thrusday','03:00:00','04:00:00'),(55,'Friday','09:00:00','10:00:00'),(56,'Friday','10:00:00','11:00:00'),(57,'Friday','11:00:00','12:00:00'),(58,'Friday','12:00:00','01:00:00'),(59,'Friday','02:00:00','03:00:00'),(60,'Friday','03:00:00','04:00:00'),(61,'Monday','09:00:00','10:00:00'),(62,'Monday','10:00:00','11:00:00'),(63,'Monday','11:00:00','12:00:00'),(64,'Monday','12:00:00','01:00:00'),(65,'Tuesday','09:00:00','10:00:00'),(66,'Tuesday','10:00:00','11:00:00'),(67,'Tuesday','11:00:00','12:00:00'),(68,'Tuesday','12:00:00','01:00:00'),(69,'Monday','13:00:00','14:00:00'),(70,'Tuesday','13:00:00','14:00:00'),(71,'Wednesday','13:00:00','14:00:00'),(72,'Thursday','13:00:00','14:00:00'),(73,'Friday','13:00:00','14:00:00');
/*!40000 ALTER TABLE `time_slots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timetable`
--

DROP TABLE IF EXISTS `timetable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timetable` (
  `timetable_id` int NOT NULL AUTO_INCREMENT,
  `faculty_id` int DEFAULT NULL,
  `subject_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `slot_id` int DEFAULT NULL,
  PRIMARY KEY (`timetable_id`),
  KEY `faculty_id` (`faculty_id`),
  KEY `subject_id` (`subject_id`),
  KEY `room_id` (`room_id`),
  KEY `slot_id` (`slot_id`),
  CONSTRAINT `timetable_ibfk_1` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`),
  CONSTRAINT `timetable_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`),
  CONSTRAINT `timetable_ibfk_3` FOREIGN KEY (`room_id`) REFERENCES `classrooms` (`room_id`),
  CONSTRAINT `timetable_ibfk_4` FOREIGN KEY (`slot_id`) REFERENCES `time_slots` (`slot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=784 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timetable`
--

LOCK TABLES `timetable` WRITE;
/*!40000 ALTER TABLE `timetable` DISABLE KEYS */;
INSERT INTO `timetable` VALUES (763,6,8,11,60),(764,6,8,12,61),(765,6,8,8,62),(766,8,11,9,37),(767,8,11,12,38),(768,8,11,11,39),(769,5,7,8,34),(770,5,7,11,35),(771,5,7,9,36),(772,7,10,11,42),(773,7,10,11,43),(774,7,10,10,44),(775,5,6,12,33),(776,5,6,10,38),(777,5,6,9,39),(778,9,12,11,32),(779,9,12,8,33),(780,9,12,10,34),(781,6,9,10,1),(782,6,9,8,2),(783,6,9,9,3);
/*!40000 ALTER TABLE `timetable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'college_timetable'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-12 20:16:40
