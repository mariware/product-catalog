CREATE TABLE `game_genres` (
	`gameId` int NOT NULL,
	`genreId` int NOT NULL,
	CONSTRAINT `game_genres_gameId_genreId_pk` PRIMARY KEY(`gameId`,`genreId`)
);
--> statement-breakpoint
CREATE TABLE `games` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`background_image` varchar(255),
	`rating` decimal(3,2),
	`ratings_count` int,
	`downloads` int,
	`playtime` int,
	`price` decimal(10,2),
	CONSTRAINT `games_id` PRIMARY KEY(`id`),
	CONSTRAINT `games_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `genres` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`background_image` varchar(255),
	CONSTRAINT `genres_id` PRIMARY KEY(`id`),
	CONSTRAINT `genres_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `screenshots` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`gameId` int NOT NULL,
	`image` varchar(255) NOT NULL,
	CONSTRAINT `screenshots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `game_genres` ADD CONSTRAINT `game_genres_gameId_games_id_fk` FOREIGN KEY (`gameId`) REFERENCES `games`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `game_genres` ADD CONSTRAINT `game_genres_genreId_genres_id_fk` FOREIGN KEY (`genreId`) REFERENCES `genres`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `screenshots` ADD CONSTRAINT `screenshots_gameId_games_id_fk` FOREIGN KEY (`gameId`) REFERENCES `games`(`id`) ON DELETE no action ON UPDATE no action;