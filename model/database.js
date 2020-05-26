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

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = `


DROP TABLE question_types;
DROP TABLE answers;
DROP TABLE quizzes;
DROP TABLE users;
DROP TABLE quizzes_questions;
DROP TABLE multiple_choice_answers;
DROP TABLE question_answers;
DROP TABLE scale_ranges;
DROP TABLE ratings;


CREATE TABLE questions (
	id INT NOT NULL AUTO_INCREMENT,
	type_id INT,
	text VARCHAR(255),
	date TIMESTAMP NOT NULL,
	twurl varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE question_types (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255),
	PRIMARY KEY (id)
);

CREATE TABLE answers (
	id INT NOT NULL AUTO_INCREMENT,
	text VARCHAR(255),
	qid INT,
	userid INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE done_assessments (
	done_assessment_id INT NOT NULL AUTO_INCREMENT,
	assessment_id INT,
	date TIMESTAMP,
	PRIMARY KEY (done_assessment_id)
);

CREATE TABLE multiple_choice_answers (
	id INT NOT NULL AUTO_INCREMENT,
	question_id INT,
	content TEXT,
	order_position INT,
	is_correct BOOLEAN,
	PRIMARY KEY (id)
);

CREATE TABLE question_answers (
	id INT NOT NULL AUTO_INCREMENT,
	question_id INT,
	scale_answer DECIMAL,
	multiple_choice_answer_id INT,
	open_ended_answer TEXT,
	done_assessments_id INT,
	binary_answer BINARY NOT NULL,
	checklist_answer varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE scale_ranges (
	id INT NOT NULL AUTO_INCREMENT,
	question_id INT,
	lower_limit DECIMAL,
	upper_limit DECIMAL,
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

ALTER TABLE done_assessments ADD CONSTRAINT done_assessments_fk0 FOREIGN KEY (assessment_id) REFERENCES answers(id);

ALTER TABLE multiple_choice_answers ADD CONSTRAINT multiple_choice_answers_fk0 FOREIGN KEY (question_id) REFERENCES questions(id);

ALTER TABLE question_answers ADD CONSTRAINT question_answers_fk0 FOREIGN KEY (question_id) REFERENCES questions(id);

ALTER TABLE question_answers ADD CONSTRAINT question_answers_fk1 FOREIGN KEY (multiple_choice_answer_id) REFERENCES multiple_choice_answers(id);

ALTER TABLE question_answers ADD CONSTRAINT question_answers_fk2 FOREIGN KEY (done_assessments_id) REFERENCES done_assessments(done_assessments_id);

ALTER TABLE scale_ranges ADD CONSTRAINT scale_ranges_fk0 FOREIGN KEY (question_id) REFERENCES questions(id);

ALTER TABLE quizzes ADD CONSTRAINT quizzes_fk0 FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE ratings ADD CONSTRAINT ratings_fk0 FOREIGN KEY (qid) REFERENCES questions(id);

ALTER TABLE quizzes_questions ADD CONSTRAINT quizzes_questions_fk0 FOREIGN KEY (quiz_id) REFERENCES quizzes(id);

ALTER TABLE quizzes_questions ADD CONSTRAINT quizzes_questions_fk1 FOREIGN KEY (question_id) REFERENCES questions(id);



`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `questions` was successful!");

    console.log("Closing...");
  });

  con.end();
});
