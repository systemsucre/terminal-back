-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-07-2023 a las 15:39:46
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `terminal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asiento`
--

CREATE TABLE `asiento` (
  `id` int(11) NOT NULL,
  `idasientoubi` int(11) DEFAULT NULL,
  `idvehiculo` int(11) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `creado` datetime DEFAULT NULL,
  `modificado` datetime DEFAULT NULL,
  `usuario` int(11) NOT NULL,
  `eliminado` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asiento`
--

INSERT INTO `asiento` (`id`, `idasientoubi`, `idvehiculo`, `numero`, `x`, `y`, `creado`, `modificado`, `usuario`, `eliminado`) VALUES
(180, NULL, 12, 1, 1, 2, '2023-06-17 01:15:35', NULL, 25, 0),
(182, NULL, 12, 2, 1, 3, '2023-06-17 01:27:06', NULL, 25, 0),
(183, NULL, 12, 3, 2, 1, '2023-06-19 14:59:01', NULL, 24, 0),
(184, NULL, 12, 4, 2, 2, '2023-06-19 14:59:06', NULL, 24, 0),
(185, NULL, 12, 5, 2, 3, '2023-06-19 14:59:18', NULL, 24, 0),
(186, NULL, 12, 6, 3, 1, '2023-06-19 14:59:24', NULL, 24, 0),
(187, NULL, 12, 7, 3, 2, '2023-06-19 14:59:31', NULL, 24, 0),
(188, NULL, 12, 8, 3, 3, '2023-06-19 14:59:36', NULL, 24, 0),
(189, NULL, 12, 9, 4, 1, '2023-06-19 14:59:46', NULL, 24, 0),
(190, NULL, 12, 10, 4, 2, '2023-06-19 14:59:53', NULL, 24, 0),
(191, NULL, 12, 11, 4, 3, '2023-06-19 15:00:13', NULL, 24, 0),
(192, NULL, 12, 12, 5, 1, '2023-06-19 15:00:18', NULL, 24, 0),
(193, NULL, 12, 13, 5, 2, '2023-06-19 15:00:25', NULL, 24, 0),
(194, NULL, 12, 14, 5, 3, '2023-06-19 15:00:29', NULL, 24, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asientoubicacion`
--

CREATE TABLE `asientoubicacion` (
  `id` int(11) NOT NULL,
  `ubicacion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asientoubicacion`
--

INSERT INTO `asientoubicacion` (`id`, `ubicacion`) VALUES
(1, 'VENTANILLA'),
(2, 'PASIILLO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nombre` text DEFAULT NULL,
  `apellido1` text DEFAULT NULL,
  `apellido2` text DEFAULT NULL,
  `ci` text DEFAULT NULL,
  `telefono` text DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT 0,
  `creado` datetime DEFAULT NULL,
  `modificado` datetime DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `nombre`, `apellido1`, `apellido2`, `ci`, `telefono`, `direccion`, `eliminado`, `creado`, `modificado`, `usuario`) VALUES
(7, 'FANNY', 'MORALES', 'PUMA', '2344233', '678723', 'SUCRE EXAEROPUERTO', 0, '2023-06-13 02:21:41', NULL, 5),
(8, 'RONAL', 'CAMARON', 'CHICARITA', '68736', '77687', 'SUCRE BOLIVIA', 0, '2023-06-13 02:24:57', NULL, 5),
(10, 'CARLA', 'JANKO', 'MORALES', '7867677', '67657657', 'PADCOYO', 0, '2023-06-13 13:32:37', NULL, 5),
(11, 'CATALINA', 'TORRES', 'NINAJA', '8768777', '78768777', 'PALACIO TAMBO', 0, '2023-06-13 13:43:39', NULL, 5),
(12, 'LIRA', 'TORRES', 'NINAJA', '8768777', '78768777', 'PALACIO TAMBO', 0, '2023-06-13 13:49:24', '2023-06-15 04:49:32', 5),
(13, 'JUAN', 'CARLOS', 'FLORES', '6456455', '78879878', 'SUCRE BOLIVIA', 0, '2023-06-15 05:43:11', NULL, 5),
(14, 'CARMEN', 'PUMA', 'CRUS', '87988782', '67878387', 'PUCA PAMPA SAN LUCAS', 0, '2023-06-15 05:43:48', NULL, 5),
(15, 'BARACK', 'NEVER', 'RUNER', '56765723', '78787237', 'PADILLA DISTRITO 4', 0, '2023-06-15 05:44:26', NULL, 5),
(16, 'IVAN WILMER', 'AGUILAR', 'TORRES', '898983', '7666622', 'PALACIO TAMBO CALLE NUEVO AMANECER', 0, '2023-06-15 05:45:24', NULL, 5),
(17, 'GUIDO', 'AGUILAR ', 'TORRESQ', '34234233', '7768768', 'PALACION TAMBO', 0, '2023-06-15 06:18:41', NULL, 5),
(18, 'NESTOR', 'TORRES', 'WALLPA', '324344', '7878768', 'ACHILLA', 0, '2023-06-15 06:21:16', NULL, 5),
(19, 'CARMEN', 'PUMA', 'CRUZ', '1675267', '898782', 'PALACIO TAMBO LOS CINTIS', 0, '2023-06-19 15:03:56', NULL, 24),
(20, 'CATALINA', 'TORRES', 'NINAJA', '6543555', '7878787', 'PALACIO TAMBO', 0, '2023-06-19 15:39:27', NULL, 24),
(21, 'FRAN', 'BIRD', 'AKOS', '89898878', '79876877', 'SUCRE BOLIVIA', 0, '2023-06-19 15:51:12', NULL, 24),
(22, 'JAIME', 'MONTERINO', 'PEREZ', '433343', '787878', 'VILAVISTA', 0, '2023-06-19 16:16:19', NULL, 24),
(23, 'RICHARD', 'JAMES', 'ROLLINGS', '234343', '88797627', 'EEUU', 0, '2023-06-19 16:17:38', NULL, 24),
(24, 'GUIDO ALEXANDER', 'AGUILAR', 'TORRES', '8566456', '7878783', 'PALACIO TAMBO', 0, '2023-06-19 19:11:39', NULL, 24),
(25, 'MIRIAN', 'PUMA', 'CARLOS', '7878278', '7872778', 'VILLA CHARCAS', 0, '2023-06-20 23:02:14', NULL, 24),
(26, 'CARLOS', 'MEDRANO', 'ARANJUEZ', '6863776', '78676767', 'ACCHILLA', 0, '2023-06-20 23:03:05', NULL, 24),
(27, 'JUANA', 'GUTIERREZ', 'PUMA', '7862376', '7867366', '-', 0, '2023-06-20 23:04:03', NULL, 24),
(28, 'ALBERTO', 'PUMA', 'PUMA', '782787', '76727628', 'CRUZ MAYU', 0, '2023-06-20 23:04:32', NULL, 24),
(29, 'ALBERTO', 'PUMA', 'PUMA', '782787', '76727628', 'CRUZ MAYU', 0, '2023-06-20 23:05:10', '2023-06-20 04:03:32', 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `id` int(11) NOT NULL,
  `nombre` varchar(400) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `origen` varchar(400) DEFAULT NULL,
  `direccion` text NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`id`, `nombre`, `telefono`, `origen`, `direccion`, `activo`) VALUES
(1, 'Sindicato de transporte 18 de Marzo', '7665753', 'Palacio Tambo - Bolivia', 'Plaza Principal #12', 1),
(2, 'San lorenzo', '67662221', 'Tarija - Bolivia', 'Calle 13 de mayo #123', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encomienda`
--

CREATE TABLE `encomienda` (
  `id` int(11) NOT NULL,
  `idviaje` int(11) DEFAULT NULL,
  `emisor` int(11) DEFAULT NULL,
  `recepcion` datetime DEFAULT NULL,
  `despachador` int(11) DEFAULT NULL,
  `entregador` int(11) DEFAULT NULL,
  `receptor` int(11) DEFAULT NULL,
  `contenido` text DEFAULT NULL,
  `tarifa` text DEFAULT NULL,
  `estado` int(11) DEFAULT 0,
  `porpagar` tinyint(1) DEFAULT NULL,
  `fechahora` datetime DEFAULT NULL,
  `telefono` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipaje`
--

CREATE TABLE `equipaje` (
  `id` int(11) NOT NULL,
  `idpasaje` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `monto` int(11) DEFAULT NULL,
  `peso` float DEFAULT NULL,
  `creado` datetime DEFAULT NULL,
  `modificado` datetime DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oficina`
--

CREATE TABLE `oficina` (
  `id` int(11) NOT NULL,
  `idempresa` int(11) DEFAULT NULL,
  `lugar` text DEFAULT NULL,
  `telefono` text DEFAULT NULL,
  `direcion` text DEFAULT NULL,
  `eliminado` tinyint(4) NOT NULL DEFAULT 0,
  `modificado` datetime DEFAULT NULL,
  `creado` datetime DEFAULT NULL,
  `usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `oficina`
--

INSERT INTO `oficina` (`id`, `idempresa`, `lugar`, `telefono`, `direcion`, `eliminado`, `modificado`, `creado`, `usuario`) VALUES
(1, 1, 'PALACIO TAMBO', '67676272', 'PLAZA PALACION TAMBO', 0, NULL, NULL, 0),
(2, 1, 'SUCRE', '78734343', 'EL RELOJ', 0, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasaje`
--

CREATE TABLE `pasaje` (
  `id` int(11) NOT NULL,
  `idviaje` int(11) DEFAULT NULL,
  `idasiento` int(11) DEFAULT NULL,
  `idcliente` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `eliminado` tinyint(4) NOT NULL,
  `modificado` datetime NOT NULL,
  `usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pasaje`
--

INSERT INTO `pasaje` (`id`, `idviaje`, `idasiento`, `idcliente`, `fecha`, `hora`, `estado`, `eliminado`, `modificado`, `usuario`) VALUES
(20, 40, 180, 19, '2023-06-19', '15:03:00', 1, 0, '0000-00-00 00:00:00', 24),
(21, 40, 183, 20, '2023-06-19', '15:39:00', 1, 0, '0000-00-00 00:00:00', 24),
(22, 40, 194, 21, '2023-06-19', '15:51:00', 1, 0, '0000-00-00 00:00:00', 24),
(23, 40, 193, 22, '2023-06-19', '16:16:00', 1, 0, '0000-00-00 00:00:00', 24),
(24, 40, 192, 23, '2023-06-19', '16:17:00', 1, 0, '0000-00-00 00:00:00', 24),
(25, 40, 191, 24, '2023-06-19', '19:11:00', 1, 0, '0000-00-00 00:00:00', 24),
(26, 40, 182, 25, '2023-06-20', '23:02:00', 1, 0, '0000-00-00 00:00:00', 24),
(27, 40, 184, 26, '2023-06-20', '23:03:00', 1, 0, '0000-00-00 00:00:00', 24),
(28, 40, 185, 27, '2023-06-20', '23:04:00', 1, 0, '0000-00-00 00:00:00', 24),
(29, 40, 186, 28, '2023-06-20', '23:04:00', 1, 0, '0000-00-00 00:00:00', 24),
(30, 40, 187, 29, '2023-06-20', '23:05:00', 1, 0, '0000-00-00 00:00:00', 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `rol` varchar(50) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `rol`, `numero`) VALUES
(1, 'admin', 1),
(2, 'secretaria', 2),
(3, 'chofer', 3),
(4, 'pasajero', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta`
--

CREATE TABLE `ruta` (
  `id` int(11) NOT NULL,
  `origen` int(11) DEFAULT NULL,
  `destino` int(11) DEFAULT NULL,
  `lugarorigen` text NOT NULL,
  `lugardestino` text NOT NULL,
  `duracion` int(11) NOT NULL,
  `dia` text DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `costo` float NOT NULL,
  `creado` datetime DEFAULT NULL,
  `modificado` datetime DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `eliminado` tinyint(4) NOT NULL DEFAULT 0,
  `idempresa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ruta`
--

INSERT INTO `ruta` (`id`, `origen`, `destino`, `lugarorigen`, `lugardestino`, `duracion`, `dia`, `hora`, `costo`, `creado`, `modificado`, `usuario`, `eliminado`, `idempresa`) VALUES
(2, 3, 1, 'EL RELOJ', 'PLAZA PALACIO TAMBO', 6, 'DOMINGO', '13:00:00', 0, '2023-06-02 18:35:53', NULL, 5, 0, 1),
(3, 3, 2, 'PARADA NORTE', 'PLAZA PALACIO TAMBO', 6, 'LUNES', '15:00:00', 0, '2023-06-02 18:50:51', NULL, 5, 0, 1),
(4, 1, 3, 'EL RELOJ', 'PLAZA PALACIO TAMBO', 6, 'DOMINGO', '15:00:00', 0, '2023-06-02 18:53:37', NULL, 24, 0, 1),
(5, 1, 2, 'PARADA NOTE', 'PLAZA PALACIO TAMBO', 10, 'MARTES', '15:00:00', 0, '2023-06-02 18:54:27', NULL, 5, 0, 1),
(7, 1, 2, 'WEWE', 'WEWE', 4, 'DOMINGO', '22:00:00', 25, '2023-06-17 21:16:50', NULL, 24, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesion`
--

CREATE TABLE `sesion` (
  `id` int(11) NOT NULL,
  `rol` int(11) NOT NULL,
  `empresa` int(11) NOT NULL,
  `oficina` int(11) NOT NULL,
  `idusuario` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `token` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sesion`
--

INSERT INTO `sesion` (`id`, `rol`, `empresa`, `oficina`, `idusuario`, `fecha`, `token`) VALUES
(70, 2, 1, 2, 25, '2023-06-17 00:09:54', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoic3VjcmUiLCJhcDEiOiJBR1VJTEFSIiwiYXAyIjoiVE9SUkVTIiwibmFtZSI6IkFOSVRBIiwiZmVjaGEiOiIyMDIzLTA2LTE3IDAwOjA5OjU0IiwiaWF0IjoxNjg2OTc0OTk0LCJleHAiOjE2ODgxODQ1OTR9.hOkgBD3jixP6Y2ilhM8nfQ8Lk48KJhoTQ81pkNlXoEA'),
(81, 2, 1, 2, 25, '2023-06-19 14:19:51', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoic3VjcmUiLCJhcDEiOiJBR1VJTEFSIiwiYXAyIjoiVE9SUkVTIiwibmFtZSI6IkFOSVRBIiwiZmVjaGEiOiIyMDIzLTA2LTE5IDE0OjE5OjUxIiwiaWF0IjoxNjg3MTk4NzkxLCJleHAiOjE2ODg0MDgzOTF9.DJWjWp8cRRv2LEkt7_QpH9Y7VrWfS40dYxJ7bRUc9sA'),
(85, 2, 1, 1, 24, '2023-06-20 00:48:50', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoicGFsYWNpbyIsImFwMSI6IlZJTExDQSIsImFwMiI6IlBFUkVTIiwibmFtZSI6IkpVQU5BIiwiZmVjaGEiOiIyMDIzLTA2LTIwIDAwOjQ4OjUwIiwiaWF0IjoxNjg3MjM2NTMwLCJleHAiOjE2ODg0NDYxMzB9.NNTZtli9AaeRGR4WvuJPaLQd04YQrQqjkT1x69TpND8');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `terminal`
--

CREATE TABLE `terminal` (
  `id` int(11) NOT NULL,
  `nombre` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `terminal`
--

INSERT INTO `terminal` (`id`, `nombre`) VALUES
(1, 'SUCRE'),
(2, 'POTOSI'),
(3, 'PALACIO TAMBO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo`
--

CREATE TABLE `tipo` (
  `id` int(11) NOT NULL,
  `tipo` text DEFAULT NULL,
  `numero` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo`
--

INSERT INTO `tipo` (`id`, `tipo`, `numero`) VALUES
(15, 'MINIBUS', 3),
(16, 'SURUBÍ', 2),
(17, 'TAXI', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `idrol` int(11) DEFAULT NULL,
  `ci` varchar(20) DEFAULT NULL,
  `username` text NOT NULL,
  `pass` text NOT NULL,
  `nombre` varchar(400) DEFAULT NULL,
  `apellido1` varchar(400) DEFAULT NULL,
  `apellido2` varchar(400) DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `direccion` varchar(400) DEFAULT NULL,
  `eliminado` tinyint(1) DEFAULT 0,
  `creado` datetime DEFAULT NULL,
  `modificado` datetime DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `idoficina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `idrol`, `ci`, `username`, `pass`, `nombre`, `apellido1`, `apellido2`, `celular`, `direccion`, `eliminado`, `creado`, `modificado`, `usuario`, `idoficina`) VALUES
(23, 1, '1267212', 'juan', '81dc9bdb52d04dc20036dbd8313ed055', 'JUAN', 'PEREZ', 'PEREZ', '677454554', 'PALACIO TAMBO', 0, NULL, NULL, NULL, 1),
(24, 2, '676576325', 'palacio', '81dc9bdb52d04dc20036dbd8313ed055', 'JUANA', 'VILLCA', 'PERES', '7877778', 'PALACION TAMBO', 0, '2023-06-17 23:40:15', '2023-06-17 23:49:34', 23, 1),
(25, 2, '67654434', 'sucre', '81dc9bdb52d04dc20036dbd8313ed055', 'ANITA', 'AGUILAR', 'TORRES', '7877778', 'SUCRE BOLIVA', 0, '2023-06-17 23:49:16', NULL, 23, 2),
(26, 3, '3423434-4K', 'gabo', '81dc9bdb52d04dc20036dbd8313ed055', 'GABRIEL', 'CARMONA', 'QUIROGA', '78978798', 'PALACIO TAMBO', 0, '2023-06-17 23:57:50', '2023-06-17 01:45:45', 25, 2),
(27, 3, '66876872', 'eloy', '81dc9bdb52d04dc20036dbd8313ed055', 'ELOY', 'AGUILAR', 'VILLCA', '73463878', 'SUCRE BOLIVA', 0, '2023-06-17 23:59:57', NULL, 25, 2),
(28, 3, '3454354', 'osman', '81dc9bdb52d04dc20036dbd8313ed055', 'OSMAN', 'CRUS', 'PUMA', '98787898', 'CANCHAS BLANCAS', 0, '2023-06-17 00:13:29', NULL, 24, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE `vehiculo` (
  `id` int(11) NOT NULL,
  `idtipo` int(11) DEFAULT NULL,
  `idusuario` int(11) DEFAULT NULL,
  `placa` text DEFAULT NULL,
  `modelo` text DEFAULT NULL,
  `filas` int(11) NOT NULL,
  `columnas` int(11) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `eliminado` tinyint(4) NOT NULL DEFAULT 0,
  `creado` datetime DEFAULT NULL,
  `modificado` datetime DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`id`, `idtipo`, `idusuario`, `placa`, `modelo`, `filas`, `columnas`, `capacidad`, `eliminado`, `creado`, `modificado`, `usuario`) VALUES
(12, 15, 26, '5676-TYR', '2022', 5, 3, 14, 0, '2023-06-17 01:09:45', '2023-06-17 01:45:45', 25),
(13, 15, 28, '5665-FGH', '2023', 5, 3, 14, 0, '2023-06-17 01:18:45', '2023-06-17 01:18:50', 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viaje`
--

CREATE TABLE `viaje` (
  `id` int(11) NOT NULL,
  `idruta` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `idvehiculo` int(11) DEFAULT NULL,
  `carril` text NOT NULL,
  `costo` double DEFAULT NULL,
  `estado` tinyint(1) DEFAULT 1,
  `creado` datetime DEFAULT NULL,
  `modificado` datetime DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `eliminado` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `viaje`
--

INSERT INTO `viaje` (`id`, `idruta`, `fecha`, `idvehiculo`, `carril`, `costo`, `estado`, `creado`, `modificado`, `usuario`, `eliminado`) VALUES
(40, 3, '2023-06-01', 12, '13', 25, 1, '2023-06-19 13:42:49', '2023-06-19 14:39:05', 24, 0),
(41, 3, '2023-06-17', 13, '2', 0, 1, '2023-06-19 14:04:29', '2023-06-20 00:49:46', 24, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asiento`
--
ALTER TABLE `asiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idasientoubi` (`idasientoubi`),
  ADD KEY `idvehiculo` (`idvehiculo`);

--
-- Indices de la tabla `asientoubicacion`
--
ALTER TABLE `asientoubicacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `encomienda`
--
ALTER TABLE `encomienda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idviaje` (`idviaje`),
  ADD KEY `emisor` (`emisor`),
  ADD KEY `receptor` (`receptor`);

--
-- Indices de la tabla `equipaje`
--
ALTER TABLE `equipaje`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idpasaje` (`idpasaje`);

--
-- Indices de la tabla `oficina`
--
ALTER TABLE `oficina`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idempresa` (`idempresa`);

--
-- Indices de la tabla `pasaje`
--
ALTER TABLE `pasaje`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idviaje` (`idviaje`),
  ADD KEY `idasiento` (`idasiento`),
  ADD KEY `idcliente` (`idcliente`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `origen` (`origen`),
  ADD KEY `ruta_ibfk_3` (`idempresa`);

--
-- Indices de la tabla `sesion`
--
ALTER TABLE `sesion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idusuario` (`idusuario`);

--
-- Indices de la tabla `terminal`
--
ALTER TABLE `terminal`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo`
--
ALTER TABLE `tipo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ci` (`ci`),
  ADD KEY `idrol` (`idrol`),
  ADD KEY `usuario_ibfk_1` (`idoficina`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idtipo` (`idtipo`),
  ADD KEY `idusuario` (`idusuario`);

--
-- Indices de la tabla `viaje`
--
ALTER TABLE `viaje`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idruta` (`idruta`),
  ADD KEY `idvehiculo` (`idvehiculo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asiento`
--
ALTER TABLE `asiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT de la tabla `asientoubicacion`
--
ALTER TABLE `asientoubicacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `encomienda`
--
ALTER TABLE `encomienda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `equipaje`
--
ALTER TABLE `equipaje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `oficina`
--
ALTER TABLE `oficina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pasaje`
--
ALTER TABLE `pasaje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ruta`
--
ALTER TABLE `ruta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `sesion`
--
ALTER TABLE `sesion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT de la tabla `terminal`
--
ALTER TABLE `terminal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo`
--
ALTER TABLE `tipo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `viaje`
--
ALTER TABLE `viaje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asiento`
--
ALTER TABLE `asiento`
  ADD CONSTRAINT `asiento_ibfk_1` FOREIGN KEY (`idasientoubi`) REFERENCES `asientoubicacion` (`id`),
  ADD CONSTRAINT `asiento_ibfk_2` FOREIGN KEY (`idvehiculo`) REFERENCES `vehiculo` (`id`);

--
-- Filtros para la tabla `encomienda`
--
ALTER TABLE `encomienda`
  ADD CONSTRAINT `encomienda_ibfk_1` FOREIGN KEY (`idviaje`) REFERENCES `viaje` (`id`),
  ADD CONSTRAINT `encomienda_ibfk_2` FOREIGN KEY (`emisor`) REFERENCES `cliente` (`id`),
  ADD CONSTRAINT `encomienda_ibfk_3` FOREIGN KEY (`receptor`) REFERENCES `cliente` (`id`);

--
-- Filtros para la tabla `equipaje`
--
ALTER TABLE `equipaje`
  ADD CONSTRAINT `equipaje_ibfk_1` FOREIGN KEY (`idpasaje`) REFERENCES `pasaje` (`id`);

--
-- Filtros para la tabla `oficina`
--
ALTER TABLE `oficina`
  ADD CONSTRAINT `oficina_ibfk_1` FOREIGN KEY (`idempresa`) REFERENCES `empresa` (`id`);

--
-- Filtros para la tabla `pasaje`
--
ALTER TABLE `pasaje`
  ADD CONSTRAINT `pasaje_ibfk_1` FOREIGN KEY (`idviaje`) REFERENCES `viaje` (`id`),
  ADD CONSTRAINT `pasaje_ibfk_2` FOREIGN KEY (`idasiento`) REFERENCES `asiento` (`id`),
  ADD CONSTRAINT `pasaje_ibfk_3` FOREIGN KEY (`idcliente`) REFERENCES `cliente` (`id`);

--
-- Filtros para la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD CONSTRAINT `ruta_ibfk_1` FOREIGN KEY (`origen`) REFERENCES `terminal` (`id`),
  ADD CONSTRAINT `ruta_ibfk_2` FOREIGN KEY (`origen`) REFERENCES `terminal` (`id`),
  ADD CONSTRAINT `ruta_ibfk_3` FOREIGN KEY (`idempresa`) REFERENCES `empresa` (`id`);

--
-- Filtros para la tabla `sesion`
--
ALTER TABLE `sesion`
  ADD CONSTRAINT `sesion_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idoficina`) REFERENCES `oficina` (`id`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`idrol`) REFERENCES `rol` (`id`);

--
-- Filtros para la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD CONSTRAINT `vehiculo_ibfk_1` FOREIGN KEY (`idtipo`) REFERENCES `tipo` (`id`),
  ADD CONSTRAINT `vehiculo_ibfk_3` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `viaje`
--
ALTER TABLE `viaje`
  ADD CONSTRAINT `viaje_ibfk_1` FOREIGN KEY (`idruta`) REFERENCES `ruta` (`id`),
  ADD CONSTRAINT `viaje_ibfk_2` FOREIGN KEY (`idvehiculo`) REFERENCES `vehiculo` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
