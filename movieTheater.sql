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


create table movies (
    movieId int primary key IDENTITY(100, 1),
    title nvarchar(50),
    genres nvarchar(100),
    director nvarchar(50),
    releaseDate DATE,
    duration int,
    movieDescription nvarchar(300),
    moviePath nvarchar(50),
    posterPath nvarchar(50)
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
    screenRows int,
    screenColumns int
)

create table uzveruud (
    uzverId int primary key IDENTITY(1000, 1),
    movieId int not null,
    theaterId int not null,
    startTime TIME,
    endTime TIME,
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
    uzverDate date not null,
    suudliinDugaar int not null,
    borluulsanUne float,
    PRIMARY key (uzverId, suudliinDugaar)
)


insert into customers values 
('Altai', 'bbyyydriver@gmail.com', 90292709, null),
('Naljirmaa', 'naljirmaa@gmail.com', 90909090, null),
('Bilegtsaikhan', 'bilgee@yahoo.com', 99999090, null)

insert into theaters VALUES
('Urguu', N'WVFF+8W5, Ард Аюушийн өргөн чөлөө, Ulaanbaatar 16091', 5),
('Tengis', N'WWF3+3GC Tengis cinema, Ulaanbaatar 15141', 5)


insert into movies values 
('Spider-Man: Across the Spider-Verse', 'Animation;Adventure' , 'Joaquim Dos Santos', '2023-06-02', 140, 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.', null, 'spiderman-across-spider-verse.jpeg'),
('The Godfather', 'Crime;Drama', 'Francis Ford Coppola', '1972-03-24', 175, 'Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.', null, 'godfather.jpeg'),
('The Wolf of Wall Street', 'Comedy;Biography', 'Martin Scorsese', '2013-12-09', 180, 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.', null, 'wolf-wall-street.jpeg'),
('Forrest Gump', 'Drama;Romance', 'Robert Zemeckis', '1994-07-06', 142, 'The history of the United States from the 1950s to the 70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.', null, 'forrest-gump.jpeg'),
('Braveheart', 'Biography;Drama', 'Mel Gibson', '1995-05-19', 178, 'Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King Edward I of England.', null, 'braveheart.jpeg'),
('Transformers','Action;Adventure', 'Micheal Bay', '2007-06-27', 144 , 'An ancient struggle between two Cybertronian races, the heroic Autobots and the evil Decepticons, comes to Earth, with a clue to the ultimate power held by a teenager.', null, 'transformers.jpeg'),
('The Shawshank Redemption', 'Drama;Mystery', 'Frank Darabont', '1994-09-13', 142, 'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.', null, 'shawshank-redemption.jpeg'),
('Fight Club', 'Drama;Mystery', 'David Fincher', '1999-10-15', 139, 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.', null, 'fight-club.jpeg-club.jpeg'),
('Inception', 'Action;Adventure', 'Christopher Nolan', '2010-07-08', 148, 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.', null, 'inception.jpeg'),
('Interstellar', 'Adventure;Drama', 'Christopher Nolan', '2014-10-26', 149, 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.', null, 'interstellar.jpeg'),
('Spirited Away', 'Animation;Adventure', 'Hayao Miyazaki', '2001-07-20', 125, 'During her family('')s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, a world where humans are changed into beasts.', null, 'spirited-away.jpeg')

insert into screen values 
(1, 100, 10, 10),
(1, 120, 12, 10),
(1, 80, 10, 8),
(1, 90, 9, 10),
(1, 100, 10, 10),
(2, 140, 14, 10),
(2, 120, 12, 10),
(2, 100, 10, 10),
(2, 100, 10, 10),
(2, 100, 10, 10)


insert into uzveruud values 
(100, 1, '15:30:00', '18:00:00', '2023-11-13', '2023-12-31', 10000, 500),
(101, 1, '18:30:00', '21:00:00', '2023-11-13', '2023-12-31', 10000, 501),
(102, 1, '15:00:00', '18:00:00', '2023-11-13', '2023-12-31', 11000, 502),
(103, 1, '14:30:00', '17:30:00', '2023-11-13', '2023-12-31', 10000, 503),
(104, 1, '18:30:00', '21:30:00', '2023-11-13', '2023-12-31', 12000, 504),
(105, 2, '16:00:00', '18:30:00', '2023-11-13', '2023-12-31', 9000, 505),
(106, 2, '15:30:00', '18:00:00', '2023-11-13', '2023-12-31', 10000, 505),
(107, 2, '15:30:00', '18:00:00', '2023-11-13', '2023-12-31', 10000, 506),
(108, 2, '15:30:00', '18:00:00', '2023-11-13', '2023-12-31', 10000, 507),
(109, 2, '15:30:00', '18:00:00', '2023-11-13', '2023-12-31', 10000, 508),
(110, 2, '15:30:00', '18:00:00', '2023-11-13', '2023-12-31', 10000, 509)


select * from uzveruud 
join movies on movies.movieId = uzveruud.movieId
join theaters on theaters.theaterId = uzveruud.theaterId
where GETDATE() between uzveruud.uzverDateStart and uzveruud.uzverDateEnd

