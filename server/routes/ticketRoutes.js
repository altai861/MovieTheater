const express = require("express");
const router = express.Router();
const ticketControllers = require("../controllers/ticketControllers");


router.route("/:uzverId")
    .get(ticketControllers.getScreenTickets)

router.route("/:uzverId/:date")
    .get(ticketControllers.getTicketsDate)

router.route("/")
    .post(ticketControllers.addTickets)

module.exports = router