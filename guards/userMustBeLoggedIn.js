var jwt = require('jsonwebtoken');
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

userMustBeLoggedIn = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.status(401).send({ message: "Please send a token!" })
    } else {
        jwt.verify(token, supersecret, (err, decoded) => {
            if (err) {
                res.status(401).send({ message: err.message })
            } else {
                const { userId } = decoded;
                console.log(userId)
                req.userId = userId;
                next();
            }
        });
    }
}
module.exports = userMustBeLoggedIn;