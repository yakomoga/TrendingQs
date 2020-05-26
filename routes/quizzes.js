var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// GET question list
// baseURL/quizzes
router.get("/", function (req, res, next) {
  db(`SELECT * FROM quizzes;`)
    .then((results) => {
      console.log("Here are the results: ", results.data);

      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// INSERT a new quizz into the DB
router.post("/", function (req, res, next) {
  const { answers, ratings, questions, qname, userid } = req.body;
  //your code here
  db(
    `INSERT INTO quizzes (user_id, quiz_name) VALUES ( "${userid}", "${qname}");`
  )
    .then((results) => {
      db("SELECT id FROM quizzes ORDER BY id DESC LIMIT 1;")
        .then((results) => {
          const quiz_id = results.data[0].id;
          for (let i = 0; i < questions.length; i++) {
            db(
              `INSERT INTO answers (userid, quiz_id, qid, text) VALUES ( "${userid}", "${quiz_id}", "${questions[i].id}", "${answers[i].text}"); INSERT INTO ratings (userid, quiz_id, qid, value) VALUES ( "${userid}", "${quiz_id}", "${questions[i].id}", "${ratings[i].value}"); INSERT INTO quizzes_questions (quiz_id, question_id) VALUES ( "${quiz_id}", "${questions[i].id}");`
            )
              .then((results) => {
                console.log(
                  "Here are the POST into answers, ratings and quizzes results: ",
                  results.data
                );

                res.send(results.data);
              })
              .catch((err) => res.status(500).send(err));
          }
        })
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));
});

// DELETE a question from the DB
router.delete("/", function (req, res, next) {
  //your code here
  //This is a future feature. For now only the bot can delete questions from the database...
});

// UPDATE a question from the DB
router.put("/", function (req, res, next) {
  //your code here
  //This is a future feature. For now only the sysadmin can change questions from the database...
});

module.exports = router;
