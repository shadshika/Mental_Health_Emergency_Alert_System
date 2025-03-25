-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2025 at 07:23 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stress_prediction`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin@123');

-- --------------------------------------------------------

--
-- Table structure for table `contact_form`
--

CREATE TABLE `contact_form` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `school_name` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_form`
--

INSERT INTO `contact_form` (`id`, `name`, `email`, `phone`, `school_name`, `message`, `created_at`) VALUES
(1, 'shadshu', 'shadshi@gmail.com', '0777603907', 'shanmuha', 'im so sad', '2025-03-20 05:30:08'),
(2, 'Shadshika', 'sri@gmail.com', '0123546894', 'shanmuha', 'i need your help', '2025-03-20 10:41:53'),
(3, 'pathmananthan kandeepan', 'pathmanathan@gmail.com', '0774563210', 'Hindu college', 'Im so sad ', '2025-03-23 18:12:37'),
(4, 'Pathmanathan Paheerathan', 'pathmanathan@gmail.com', '0774563210', 'Hindu college', 'Hi, \r\nI\'m Pahee  Recently I\'m so sad ', '2025-03-23 20:49:55');

-- --------------------------------------------------------

--
-- Table structure for table `predictions`
--

CREATE TABLE `predictions` (
  `id` int(11) NOT NULL,
  `gender` int(11) NOT NULL,
  `sleep` int(11) NOT NULL,
  `diet` int(11) NOT NULL,
  `suicidal` int(11) NOT NULL,
  `study_hours` int(11) NOT NULL,
  `financial_stress` int(11) NOT NULL,
  `conflict` int(11) NOT NULL,
  `mood` float NOT NULL,
  `depression` int(11) NOT NULL,
  `predicted_score` float NOT NULL,
  `stress_level` varchar(20) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `predictions`
--

INSERT INTO `predictions` (`id`, `gender`, `sleep`, `diet`, `suicidal`, `study_hours`, `financial_stress`, `conflict`, `mood`, `depression`, `predicted_score`, `stress_level`, `timestamp`) VALUES
(42, 1, 2, 1, 1, 12, 5, 1, 0.7, 1, 77.74, 'High Stress', '2025-03-22 14:01:27'),
(43, 0, 0, 0, 0, 2, 0, 0, 0, 0, 61.44, 'Normal Stress', '2025-03-22 14:11:28'),
(49, 0, 0, 2, 0, 3, 0, 0, 0.2, 0, 59.8, 'Low stress', '2025-03-22 16:45:05'),
(50, 1, 2, 1, 1, 12, 5, 1, 0.7, 1, 77.74, 'High Stress', '2025-03-23 01:56:51'),
(51, 1, 2, 1, 1, 12, 5, 1, 0.7, 1, 77.74, 'High Stress', '2025-03-23 01:59:07'),
(52, 1, 2, 1, 1, 12, 5, 1, 0.7, 1, 77.74, 'High Stress', '2025-03-23 02:16:33'),
(53, 1, 0, 0, 0, 2, 0, 0, 0, 0, 65.42, 'Normal Stress', '2025-03-23 02:19:27'),
(54, 0, 0, 0, 0, 2, 1, 0, 0, 0, 61.44, 'Normal Stress', '2025-03-23 02:21:14'),
(56, 1, 2, 1, 1, 12, 5, 1, 0.7, 1, 77.74, 'High Stress', '2025-03-23 21:17:58'),
(58, 0, 0, 2, 0, 3, 0, 0, 0.2, 0, 59.8, 'Low stress', '2025-03-23 22:23:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'tharmi', 'tharmi@gmail.com', 'scrypt:32768:8:1$wbOE80kGewOyTUYD$e3cde26194f8e527d6fe56bdbbdf949692d1a55ce7ec00b0451af264a95c5dbfe8c47b97fe82805b058ef7dc3dbe609ff10bed2b1feaa21199e14882405c250a'),
(2, 'yoganathan', 'yoganathan@gmail.com', 'scrypt:32768:8:1$HYThwUsqL4oDcNgp$3a351c7e8063d5ee068f5bc31bee0f9040da8dbf2b4c16c764d02a6592d334f47409459fa4ec0a44c54e7726179efd1a85392b331f7ea1eca9764f098737bae9'),
(6, 'Thushanth', 'thanan@gmail.com', 'scrypt:32768:8:1$CrbmlKFIsRrSFiLW$a6ff0dd143f132375f5f6b7c5bde7410f1234086ec88b5bf550e69958164c898eb9bafc764efb482f3d2389402d93530a620fca96dc381c079926d7690311540'),
(7, 'srikantha', 'sri@gmail.com', 'scrypt:32768:8:1$sFxIsQROPVeweUWg$de71113d37deb545c1587ffc3bd5e35d595b06db52d237dbee3e286611c98da46c2901baacf8a41c80763935bf10b7ebf6294dd07b908499d38b2d6d869a1945'),
(8, 'kandee', 'kandee@gmail.com', 'scrypt:32768:8:1$H4AyIsoTERwS30AZ$c5f57f2d8ac7d922f866b82a4ca35a4f7b41d158b22d9a46683b637de070c4a0a54465aba0a2141cdacf95c21d7fb9c58cbeff7b93188ac5e3123aec99091551'),
(9, 'kaja', 'k@gmail.com', 'scrypt:32768:8:1$QQykzjAlr1SzRycg$ad300bae346fdddcb8412a0c6040e40761013bf65ec211ee9e39433d5aa5f76739180af7eeb1455c9628f710de3adc9ed541e96da8c9ca82c5b78557cd6418c3'),
(10, 'keerthi', 'keerthi@gmail.com', 'scrypt:32768:8:1$7BtQtu6TagcxLj7j$18719307f5a0ea321322ff0168d71785cfbc182c8d632da53bcd6fd76e49f2073b9734dc49d8216c6582f1a27889e6b89af908c0087288b038373aafe8d8cb9e'),
(11, 'pahee', 'pahee@gmail.com', 'scrypt:32768:8:1$LLk5UIzFslG7zZ5o$af35060d05160d16ac75df1145dd166d6609350c29ac283c44a30a10b4e3a9337ad3ff34c2bbd6cf768733006e7b32135871791bb881dbbeb63429bcd852094d'),
(12, 'kamala', 'kamal@gmail.com', 'scrypt:32768:8:1$LSKC8Ud7gQBAY108$4b5df9295a914d467bf862c4c677043261a293a5d01f6ff356b42f61c2cfbb83db2ec89ed5a1effacb97d37ada81a24e56032197c171325de1379da2de9b465b'),
(13, 'Nive', 'nive@gmail.com', 'scrypt:32768:8:1$96OxCPfBCX1tb6jr$de13931440ba054c48d2b2ae304f59e8d0680cf5c0025ff1152e00d435c6d8b319d0bde043b3a40c1537f722832ecf1641958b4ef632ea1800643752ae3ef704'),
(15, 'admin', 'tharmi@gmail.com', 'scrypt:32768:8:1$TKQmJsG99IdGNiFZ$ee2d9871bb0391f5c08a235c87d60f5ae3edc50e42dd774cd128c8d2ebd9cc2f0a2ef93e5a4aecf0fa039955abfbcdb36000c2345bd6aef3e5544147c35ced11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `contact_form`
--
ALTER TABLE `contact_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `predictions`
--
ALTER TABLE `predictions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact_form`
--
ALTER TABLE `contact_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `predictions`
--
ALTER TABLE `predictions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
