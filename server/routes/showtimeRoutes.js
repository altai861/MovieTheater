const express = require("express");
const router = express.Router();
const showtimeControllers = require("../controllers/showtimeControllers");

router.route("/")
    .get(showtimeControllers.getAllShowTimes);

router.route("/:uzverId")
    .get(showtimeControllers.getSingleShowtime)

router.route("/:uzverId/:customerId")
    .get(showtimeControllers.checkTicket)


module.exports = router;