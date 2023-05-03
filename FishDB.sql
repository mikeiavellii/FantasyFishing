--CREATE DATABASE FishDB;
--USE FishDB;

--CREATE TABLE [UserInfo] (
--ID int Identity(1,1) NOT NULL Primary Key,
--UserName NVARCHAR(600),
--GoogleName NVARCHAR(150),
--Currency FLOAT,
--BetterRod BIT,
--CleanWaters BIT,
--FasterReel BIT,
--UserLevel FLOAT,
--);

--SELECT * FROM [UserInfo];

--INSERT INTO [UserInfo](UserName, GoogleName, Currency, BetterRod, CleanWaters, FasterReel, UserLevel)
--VALUES ('1234', 'test', 1, 0,0,0,1);

--CREATE TABLE CaughtFish(
--ID int Identity(1,1) NOT NULL Primary Key, 
--UserId NVARCHAR(70),
--FishName NVARCHAR(70),
--FishImage NVARCHAR (MAX),
--FishFamily NVARCHAR(250),
--Species NVARCHAR(200),
--FishClass NVARCHAR(200),
--FishOrder NVARCHAR(200),
--Genus NVARCHAR(100),
--);

--INSERT INTO CaughtFish(UserId, FishName, FishImage, FishFamily, Species, FishClass, FishOrder, Genus)
--VALUES ('John', 'Doe', '12374', '4', '5678','Jane Doe', '012345', '4');

-------------------------------------------DROP TABLE CaughtFish;

--SELECT * FROM [UserInfo];

--SELECT * FROM CaughtFish;
