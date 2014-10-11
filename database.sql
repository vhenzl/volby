CREATE TABLE `CandidateLists` (
  `Id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Year` year NOT NULL,
  `Number` int NOT NULL,
  `Name` varchar(200) NOT NULL
);


CREATE TABLE `Candidates` (
  `Id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Year` year NOT NULL,
  `CandidateListNumber` int NOT NULL,
  `Number` int NOT NULL,
  `Name` varchar(200) NOT NULL,
  `Age` int NOT NULL,
  `Nomination` varchar(100) NOT NULL,
  `Membership` varchar(100) NOT NULL,
  `Votes` int NULL,
  `Order` int NULL,
  `Mandate` boolean NULL
);

CREATE TABLE `People` (
  `Id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Name` varchar(200) NOT NULL,
  `Year` year NOT NULL
);

ALTER TABLE `Candidates`
ADD `PersonId` int NULL,
ADD FOREIGN KEY (`PersonId`) REFERENCES `People` (`Id`) ON DELETE SET NULL;