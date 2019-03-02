CREATE DATABASE  doctorJS;

USE doctorJS;

CREATE TABLE IF NOT EXISTS users (
  id int(11) NOT NULL AUTO_INCREMENT,
  first_name varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  last_name  varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  email      varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  password   varchar(225) COLLATE utf8_unicode_ci NOT NULL,
  created datetime NOT NULL,
  modified datetime NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS glucose (
  id int(11) NOT NULL AUTO_INCREMENT,
  when_mesuare varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  glucose varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  created datetime NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS bloodPressure (
  id int(11) NOT NULL AUTO_INCREMENT,
  when_reading varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  bloodPresure varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  created datetime NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS carbs (
  id int(11) NOT NULL AUTO_INCREMENT,
  amount_mesuare varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  carbs varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  carbs_time datetime NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS userData (
  id int(11) NOT NULL AUTO_INCREMENT,
  gender varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  age int(10) COLLATE utf8_unicode_ci NOT NULL,
  weight int COLLATE utf8_unicode_ci NOT NULL,
  height int COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (id)
);
