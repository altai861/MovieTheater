const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers.js");

router.route("/login")
    .post(authControllers.login)

router.route("/register")
    .post(authControllers.register)


module.exports = router;