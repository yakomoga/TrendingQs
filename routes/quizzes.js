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
  //your code here
  db(
    `INSERT INTO quizzes (userid, quiz_name) VALUES ( "${req.body.userid}", "${req.body.name}");`
  )
    .then((results) => {
      db("SELECT * FROM quizzes;")
        .then((results) => {
          res.send(results.data);
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
