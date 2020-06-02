var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const db = require("../model/helper");
const supersecret = process.env.SUPER_SECRET;
require("dotenv").config();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// GET ratings list
// baseURL/questions/?n=10

// INSERT a new question into the DB
router.post("/", (req, res, next) => {
    //your code here
    db(
            `INSERT INTO ratings (q_id, user_id, value) VALUES ("${req.body.q_id}", "${req.body.user_id}", "${req.body.value}");`
        )
        .then((results) => {
            db(`SELECT * FROM users WHERE ;`)
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
                var token = jwt.sign({ userID: results.data[0].id }, supersecret);
                res.send({ message: "User OK!", token });
            } else {
                res.status(404).send({ message: "User not found!" });
            }
        })
        .catch((err) => res.status(500).send(err));
});

//This resourse is protected
router.get("/profile", function(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.status(401).send({ message: "Please log in!" });
    } else {
        jwt.verify(token, supersecret, function(err, decoded) {
            if (err) res.status(401).send({ message: err.message });
            else {
                const { userID } = decoded;
                console.log(userID)
                res.send({ message: "here is your private info!", decoded })
            }
        });
    }
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