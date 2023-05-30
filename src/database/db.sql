SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*-- to create a new database*/
CREATE DATABASE DevopsProyectdb;

/*-- to use database*/
use DevopsProyectdb;

/*-- creating a new table*/
CREATE TABLE user (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  userName VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(15),
  lastLogInDate DATE,
  createdDate Date
); -- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
COMMIT;
*/

ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

CREATE TABLE solicitud(
  folio INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  estado BOOLEAN,
  fechaInicio DATE,
  fechaEstipuladaDev DATE,
  fechaRealDev DATE,
  observacion VARCHAR(250)
); -- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE alumno (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefono VARCHAR(15),
  licenciatura VARCHAR(200),
  semestre INT
); -- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE computadora (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(50) NOT NULL,
  anioModelo INT,
  capacidadMemoria INT,
  tamanioMonitor INT,
  capacidadRAM INT,
  procesador VARCHAR(50)
); -- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE multa (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  monto FLOAT NOT NULL,
  fecha date,
  observacion VARCHAR(250),
  folioSolicitud DATE,
  estado BOOLEAN
); -- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*-- to show all tables*/
show tables;



