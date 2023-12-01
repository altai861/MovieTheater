const express = require("express");
const router = express.Router();
const showtimeControllers = require("../controllers/showtimeControllers");

router.route("/")
    .get(showtimeControllers.getAllShowTimes);

module.exports = router;