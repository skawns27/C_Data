-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sasi4db
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `clothtb`
--

DROP TABLE IF EXISTS `clothtb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothtb` (
  `csn` int NOT NULL AUTO_INCREMENT,
  `wsn` int NOT NULL,
  `clothCat` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `clothName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `clothGen` char(1) NOT NULL DEFAULT 'A',
  `clothText` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`csn`),
  KEY `fk_clothTB_weatherTB1_idx` (`wsn`),
  CONSTRAINT `fk_clothTB_weatherTB1` FOREIGN KEY (`wsn`) REFERENCES `weathertb` (`wsn`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothtb`
--

LOCK TABLES `clothtb` WRITE;
/*!40000 ALTER TABLE `clothtb` DISABLE KEYS */;
INSERT INTO `clothtb` VALUES (1,1,' T','패딩','A','1'),(2,1,'T','겨울코트','A','1'),(3,1,'T','기모후드','A','1'),(4,1,'B','기모바지','A','1'),(5,1,'B','카고바지','A','1'),(6,1,'E','목도리','A','1'),(7,1,'E','털모자','A','1'),(8,1,'E','귀돌이','A','1'),(9,2,'T','코트','A','1'),(10,2,'T','가죽자켓','A','1'),(11,2,'B','레깅스','W','1'),(12,2,'B','통바지','A','1'),(13,2,'B','가을팬츠','A','1'),(14,3,'T','자켓','A','1'),(15,3,'T','트렌치코트','A','1'),(16,3,'T','야상니트','A','1'),(17,3,'B','청바지','A','1'),(18,3,'B','스타킹','W','1'),(19,3,'E','캡모자','A','1'),(20,3,'E','빵모자','A','1'),(21,4,'T','자켓','A','1'),(22,4,'T','가디건','A','1'),(23,4,'B','면바지','A','1'),(24,4,'B','청바지','A','1'),(25,4,'T','야상','A','1'),(26,5,'B','얇은니트','A','1'),(27,5,'T','맨투맨','A','1'),(28,5,'B','청바지','A','1'),(29,5,'B','면바지','A','1'),(30,6,'T','얇은가디건','A','1'),(31,6,'T','긴팔티','A','1'),(32,6,'B','면바지','A','1'),(33,6,'B','청바지','A','1'),(34,7,'T','반팔','A','1'),(35,7,'T','얇은 셔츠','A','1'),(36,7,'B','반바지','A','1'),(37,7,'B','면바지','A','1'),(38,8,'T','민소매','A','1'),(39,8,'T','민소매','W','1'),(40,8,'T','반팔','A','1'),(41,8,'B','반바지','A','1'),(42,8,'T','원피스','W','1'),(43,9,'T','발열조끼','A','1'),(44,10,'T','방호복','A','1'),(45,10,'B','방호슈즈','A','1'),(46,9,'T','패딩','A','1'),(47,2,'B','청바지','A','1');
/*!40000 ALTER TABLE `clothtb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colortb`
--

DROP TABLE IF EXISTS `colortb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colortb` (
  `clsn` int NOT NULL AUTO_INCREMENT,
  `wsn` int NOT NULL,
  `colorName` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `colorText` varchar(45) NOT NULL,
  `todaySky` int NOT NULL,
  PRIMARY KEY (`clsn`),
  KEY `fk_colorTB_weatherTB1_idx` (`wsn`),
  CONSTRAINT `fk_colorTB_weatherTB1` FOREIGN KEY (`wsn`) REFERENCES `weathertb` (`wsn`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colortb`
--

LOCK TABLES `colortb` WRITE;
/*!40000 ALTER TABLE `colortb` DISABLE KEYS */;
INSERT INTO `colortb` VALUES (1,1,'검정색','1',1),(2,1,'초록색','1',2),(3,2,'빨강색','1',1),(4,2,'흰색','1',2),(5,3,'회색','1',1),(6,3,'베이지색','1',2),(7,4,'갈색','1',1),(8,4,'주황색','1',2),(9,5,'흰색','1',1),(10,5,'노란색','1',2),(11,6,'베이지색','1',1),(12,6,'흰색','1',2),(13,7,'하늘색','1',1),(14,7,'분홍색','1',2),(15,8,'파란색','1',1),(16,8,'흰색','1',2);
/*!40000 ALTER TABLE `colortb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foodtb`
--

DROP TABLE IF EXISTS `foodtb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foodtb` (
  `fsn` int NOT NULL AUTO_INCREMENT,
  `wsn` int NOT NULL,
  `foodCat` char(1) NOT NULL,
  `foodName` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `todayPty` int NOT NULL,
  PRIMARY KEY (`fsn`),
  KEY `fk_foodTB_weatherTB1_idx` (`wsn`),
  CONSTRAINT `fk_foodTB_weatherTB1` FOREIGN KEY (`wsn`) REFERENCES `weathertb` (`wsn`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foodtb`
--

LOCK TABLES `foodtb` WRITE;
/*!40000 ALTER TABLE `foodtb` DISABLE KEYS */;
INSERT INTO `foodtb` VALUES (1,1,'M','샤브샤브',0),(2,1,'D','코코아',0),(3,1,'M','돼지국밥',1),(4,1,'D','붕어빵',1),(5,2,'M','곱창',0),(6,2,'D','아메리카노',0),(7,2,'M','라면',1),(8,2,'D','귤',1),(9,3,'M','마라탕',0),(10,3,'D','조각케이크',0),(11,3,'M','떡볶이',1),(12,3,'D','에그타르트',1),(13,4,'M','피자',0),(14,4,'D','딸기케이크',0),(15,4,'M','비밤밥',1),(16,4,'D','스무디',1),(17,5,'M','삼겹살',0),(18,5,'D','루이보스차',0),(19,5,'M','라면',1),(20,5,'D','호떡',1),(21,6,'M','파스타',0),(22,6,'D','핫케이크',0),(23,6,'M','파전',1),(24,6,'D','쉐이크',1),(25,7,'M','비빔냉면',0),(26,7,'D','빙수',0),(27,7,'M','부대찌개',1),(28,7,'D','식혜',1),(29,8,'M','냉면',0),(30,8,'D','아이스크림',0),(31,8,'M','삼계탕',1),(32,8,'D','아이스커피',1);
/*!40000 ALTER TABLE `foodtb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemtb`
--

DROP TABLE IF EXISTS `itemtb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemtb` (
  `isn` int NOT NULL AUTO_INCREMENT,
  `wsn` int NOT NULL,
  `itemName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `itemText` varchar(45) NOT NULL,
  `todayPty` int NOT NULL,
  PRIMARY KEY (`isn`),
  KEY `fk_itemTB_weatherTB1_idx` (`wsn`),
  CONSTRAINT `fk_itemTB_weatherTB1` FOREIGN KEY (`wsn`) REFERENCES `weathertb` (`wsn`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemtb`
--

LOCK TABLES `itemtb` WRITE;
/*!40000 ALTER TABLE `itemtb` DISABLE KEYS */;
INSERT INTO `itemtb` VALUES (1,1,'핫팩','추운날이네요. 따뜻한 핫팩으로 몸 녹이세요~',0),(2,1,'우산','오늘 눈/비가 예정이에요. 우산 준비하세요~',1),(3,2,'스마트폰 거치대','방콕하기 좋은날 스마트폰 거치대 어떠신가요?',0),(4,2,'우산','오늘 눈/비가 예정이에요. 우산 준비하세요~',1),(5,3,'비타민','환절기인만큼 건강에 유의하세요.',0),(6,3,'우산','오늘 비가 내리고 있어요 우산 준비하세요~',1),(7,4,'암밴드','밖에 나가기 좋은 시원한 날씨. 조깅은 어떤가요?',0),(8,4,'우산','오늘 비가 내리고 있어요 우산 준비하세요~',1),(9,5,'자전거','따뜻하고 포근한 오늘 자전거로 산책 어떤가요?',0),(10,5,'우산','오늘 비가 내리고 있어요 우산 준비하세요~',1),(11,6,'썬크림','야외활동 하기 좋은날! 피부관리 필수!',0),(12,6,'우산','오늘 비가 내리고 있어요 우산 준비하세요~',1),(13,7,'아이스팩','더운날씨 식혀줄 아이스팩 어떤가요?',0),(14,7,'우산','오늘 비가 내리고 있어요 우산 준비하세요~',1),(15,8,'미니선풍기','뜨거운날씨를 식혀줄 미니선풍기가 필요해보이네요.',0),(16,8,'우산','오늘 비가 내리고 있어요 우산 준비하세요~',1),(17,9,'화로','이걸로 될지는 모르겠지만 일단 추위는 막아야겠죠?',0),(18,10,'방독면','효과 있을지는 모르지만 세기말인거 같아 추천해요 :D',0);
/*!40000 ALTER TABLE `itemtb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weathertb`
--

DROP TABLE IF EXISTS `weathertb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weathertb` (
  `wsn` int NOT NULL AUTO_INCREMENT,
  `weatherText` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `maxTemp` float NOT NULL,
  `minTemp` float NOT NULL,
  PRIMARY KEY (`wsn`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weathertb`
--

LOCK TABLES `weathertb` WRITE;
/*!40000 ALTER TABLE `weathertb` DISABLE KEYS */;
INSERT INTO `weathertb` VALUES (1,'추운날씨입니다. 따뜻하게 입고가세요~!',-20,5),(2,'쌀쌀한 날씨입니다. 따뜻하게 입고가세요~!',5,9),(3,'서늘한 날씨입니다. 겉옷 챙기세요~!',9,12),(4,'시원한 날씨입니다. 감기조심하세요~!',12,17),(5,'따뜻한 날씨입니다. 외출하기 좋은 날입니다. XD',17,20),(6,'포근한 날씨입니다. 산책은 어떠신가요?',20,23),(7,'더운 날씨입니다. 수분보충에 주의하세요!',23,28),(8,'무더운 날씨입니다. 시원한 음료는 필수!!!',28,43),(9,'밖에 나가면 얼음동상되기 좋은날 영화 투모로우가 시작되는 오늘이네요.',-999,-20),(10,'지구가 오븐 그자체가 되었군요... 모두 살아남길 바래요.',43,999);
/*!40000 ALTER TABLE `weathertb` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-25 21:47:53
