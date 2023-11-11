-- 1. Run this first
USE master;
GO
ALTER DATABASE MovieTheater SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO
DROP DATABASE MovieTheater;
GO

-- 2. Run this second
create database MovieTheater;

-- 3. Run this third
use MovieTheater;
create table customers (
    customerId int primary key IDENTITY(1, 1),
    username nvarchar(50),
    email nvarchar(50),
    phonenumber nvarchar(50),
    hayg nvarchar(50)
)

create table genre (
    genreId int primary key IDENTITY(1, 1),
    genreName nvarchar(50)
)

create table movies (
    movieId int primary key IDENTITY(100, 1),
    title nvarchar(50),
    genreId int,
    genreIdAlt int,
    director nvarchar(50),
    releaseDate DATE,
    duration int,
    movieDescription nvarchar(300),
    moviePath nvarchar(50)

    foreign key (genreId) REFERENCES genre(genreId),
    foreign key (genreIdAlt) REFERENCES genre(genreId)
)

create table theaters (
    theaterId int primary key IDENTITY(1, 1),
    theaterName nvarchar(50),
    theaterLocation nvarchar(100),
    capacity int,
)

create table screen (
    screenId int primary key IDENTITY(500, 1),
    theaterId int not null,
    suudliinToo int,
    suudliinEgnee int,
    suudliinMur int
)

create table uzveruud (
    uzverId int primary key IDENTITY(1000, 1),
    movieId int not null,
    theaterId int not null,
    startTime DATETIME,
    endTime DATETIME,
    uzverDateStart date,
    uzverDateEnd date,
    price float, 
    screenId int not null,

    foreign key (movieId) references movies(movieId),
    foreign key (theaterId) references theaters(theaterId),
    foreign key (screenId) references screen(screenId)
)

create table tickets (
    customerId int,
    uzverId int not null,
    suudliinDugaar int not null,
    PRIMARY key (uzverId, suudliinDugaar)
)


insert into customers values 
('Altai', 'bbyyydriver@gmail.com', 90292709, null),
('Naljirmaa', 'naljirmaa@gmail.com', 90909090, null),
('Bilegtsaikhan', 'bilgee@yahoo.com', 99999090, null)

insert into genre values 
('Comedy'),('Action'),('Adventure'),('Drama'),
('Sci-Fi'),('Fantasy'),('Horror'),('Mystery'),
('Thriller'),('Crime'),('Romance'),('Animation'),
('Musical'),('Western'),('Historical'),('Biography'),
('War')

insert into theaters VALUES
('Urguu', N'WVFF+8W5, Ард Аюушийн өргөн чөлөө, Ulaanbaatar 16091', 5),
('Tengis', N'WWF3+3GC Tengis cinema, Ulaanbaatar 15141', 5)


insert into movies values 
('Spider-Man: Across the Spider-Verse', 12, 3, 'Joaquim Dos Santos', '2023-06-02', 140, 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.', null),
('The Godfather', 10, 4, 'Francis Ford Coppola', '1972-03-24', 175, 'Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.', null),
('The Wolf of Wall Street', 1, 16, 'Martin Scorsese', '2013-12-09', 180, 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.', null),
('Forrest Gump', 4, 11, 'Robert Zemeckis', '1994-07-06', 142, 'The history of the United States from the 1950s to the 70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.', null),
('Braveheart', 16, 4, 'Mel Gibson', '1995-05-19', 178, 'Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King Edward I of England.', null)
