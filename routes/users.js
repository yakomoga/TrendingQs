var express = require("express");
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// GET question list
router.get("/", function (req, res, next) {
  db("SELECT * FROM questions;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
