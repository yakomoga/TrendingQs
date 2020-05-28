require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
    host: DB_HOST || "127.0.0.1",
    user: DB_USER || "root",
    password: DB_PASS,
    database: DB_NAME || "trending",
    multipleStatements: true,
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    let sql = `
DROP TABLE IF EXISTS question_types;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS quizzes_questions;
DROP TABLE IF EXISTS multiple_choice_answers;
DROP TABLE IF EXISTS question_answers;
DROP TABLE IF EXISTS scale_ranges;
DROP TABLE IF EXISTS ratings;
CREATE TABLE questions (
	id INT NOT NULL AUTO_INCREMENT,
	type_id INT,
	text VARCHAR(255),
	date TIMESTAMP NOT NULL,
	twurl varchar(255) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE answers (
	id INT NOT NULL AUTO_INCREMENT,
	quiz_id INT,
	text VARCHAR(255),
	qid INT,
	userid INT NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE quizzes (
	id INT NOT NULL AUTO_INCREMENT,
	user_id varchar(255) NOT NULL,
	quiz_name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	firstname varchar(255) NOT NULL,
	lastname varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	age INT(255) NOT NULL,
	subscribed BINARY(1) NOT NULL,
	fb_id varchar(255) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE ratings (
	id INT NOT NULL AUTO_INCREMENT,
	qid INT NOT NULL,
	userid INT NOT NULL,
	value DECIMAL NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE quizzes_questions (
	id INT NOT NULL AUTO_INCREMENT,
	quiz_id INT NOT NULL,
	question_id INT NOT NULL,
	PRIMARY KEY (id)
);
`;

    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table creation `questions` was successful!");

        console.log("Closing...");
    });

    con.end();
});