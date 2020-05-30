CREATE TABLE `questions` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`type_id` INT,
	`text` VARCHAR(255),
	`date` TIMESTAMP NOT NULL,
	`twurl` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `answers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`text` VARCHAR(255),
	`q_id` INT,
	`user_id` INT NOT NULL,
	`quiz_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `quizzes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` varchar(255) NOT NULL,
	`quiz_name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`firstname` varchar(255) NOT NULL,
	`lastname` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`age` INT(255) NOT NULL,
	`subscribed` BINARY(1) NOT NULL,
	`fb_id` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `ratings` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`q_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	`value` DECIMAL NOT NULL,
	`quiz_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `quizzes_questions` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`quiz_id` INT NOT NULL,
	`q_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `quizzes` ADD CONSTRAINT `quizzes_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `ratings` ADD CONSTRAINT `ratings_fk0` FOREIGN KEY (`q_id`) REFERENCES `questions`(`id`);

ALTER TABLE `quizzes_questions` ADD CONSTRAINT `quizzes_questions_fk0` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`);

ALTER TABLE `quizzes_questions` ADD CONSTRAINT `quizzes_questions_fk1` FOREIGN KEY (`q_id`) REFERENCES `questions`(`id`);

