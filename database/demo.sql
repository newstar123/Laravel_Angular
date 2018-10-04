/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.6.17 : Database - demo_rejeb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`demo_rejeb` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `demo_rejeb`;

/*Table structure for table `courses` */

DROP TABLE IF EXISTS `courses`;

CREATE TABLE `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `university_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `courses` */

insert  into `courses`(`id`,`university_id`,`name`,`description`,`created_at`,`updated_at`) values (3,1,'safds','fdsfdsa','2015-12-26 07:34:52','2015-12-26 07:34:52'),(4,1,'fadsf','dsfadsf','2015-12-26 07:34:59','2015-12-26 07:34:59'),(5,4,'sadfasd','fsdfsdf','2015-12-26 07:35:06','2015-12-26 07:35:06');

/*Table structure for table `universities` */

DROP TABLE IF EXISTS `universities`;

CREATE TABLE `universities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `universities` */

insert  into `universities`(`id`,`name`,`description`,`created_at`,`updated_at`) values (1,'SGTH','This is description','2015-12-26 06:33:17','2015-12-26 06:36:24'),(4,'HWFS',NULL,'2015-12-26 07:34:28','2015-12-26 07:34:28'),(5,'HREA','dfgdfsgdfs','2015-12-26 07:34:34','2015-12-26 07:34:34');

/*Table structure for table `user_courses` */

DROP TABLE IF EXISTS `user_courses`;

CREATE TABLE `user_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `university_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `user_courses` */

insert  into `user_courses`(`id`,`university_id`,`course_id`,`user_id`,`created_at`,`updated_at`) values (1,4,5,2,'2015-12-28 07:01:20','2015-12-28 07:09:29'),(2,1,4,2,'2015-12-28 07:10:57','2015-12-28 07:49:18');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `user_type` tinyint(4) DEFAULT '2',
  `password` varchar(255) DEFAULT NULL,
  `active` tinyint(4) DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`username`,`email`,`user_type`,`password`,`active`,`created_at`,`updated_at`,`remember_token`) values (1,'Rejeb Zorgani','admin','admin@gmail.com',1,'$2y$10$ZaPhJCX3YDJkp44rQQ0h9.pGJnDgyIdwoYFBP7gvKQjIhODbkpHl.',1,'2015-12-24 10:36:33','2015-12-28 07:11:24','DyGtAFe46M2DYMuxyfJ57euKWxTPQiewiTSZfqonwFuE120xqF6dDTTgT36w'),(2,'Gaurang Ghinaiya','gaurang','gaurangghinaiya@yahoo.in',2,'$2y$10$esBakUunKuxHIkkOYirnBudeLqbc8kfN5wwTSBCizhXhH0WO.JFUS',1,'2015-12-25 06:01:02','2015-12-28 07:59:41','56eH7thMMDfyY8FozrGVxc6lrPlY6dr7tXWGuGL906aODZvRBZ9PkHAPvbPC');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
