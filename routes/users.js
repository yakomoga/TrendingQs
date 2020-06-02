var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var userMustBeLoggedIn = require("../guards/userMustBeLoggedIn");
const db = require("../model/helper");
const supersecret = process.env.SUPER_SECRET;
require("dotenv").config();

// GET users listing.
router.get("/", (req, res, next) => {
    let { id } = req.params;
    db(`SELECT * FROM users WHERE id = ${id};`)
        .then((results) => {
            res.send(results.data);
        })
        .catch((err) => res.status(500).send(err));
});
// GET ratings list
// baseURL/questions/?n=10

// INSERT a new question into the DB
router.post("/", (req, res, next) => {
    //your code here
    db(
            `INSERT INTO ratings (q_id, user_id, value) VALUES ("${req.body.q_id}", "${req.body.user_id}", "${req.body.value}");`
        )
        .then((results) => {
            db(`SELECT * FROM users;`)
                .then((results) => {
                    res.send(results.data);
                })
                .catch((err) => res.status(500).send(err));
        })
        .catch((err) => res.status(500).send(err));
});

router.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    db(
            `SELECT * FROM users WHERE email = "${email}" AND password = "${password}";`
        )
        .then((results) => {
            if (results.data.length) {
                var token = jwt.sign({ userId: results.data[0].id }, supersecret);
                res.send({ message: "User OK!", token });
            } else {
                res.status(404).send({ message: "User not found!" });
            }
        })
        .catch((err) => res.status(500).send(err));
});

//This resourse is protected
router.get("/gamecard", userMustBeLoggedIn, (req, res, next) => {
    res.send({ message: `Show this data for your user ${req.userId}` });
});

// DELETE a question from the DB
router.delete("/", function(req, res, next) {
    //your code here
    //This is a future feature. For now only the bot can delete questions from the database...
});

// UPDATE a question from the DB
router.put("/", function(req, res, next) {
    //your code here
    //This is a future feature. For now only the sysadmin can change questions from the database...
});

module.exports = router;