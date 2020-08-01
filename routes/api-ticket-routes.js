const express = require("express");
const router = express.Router();

const ticketControllers = require("../controllers/ticket-controllers.js");
const {authenticateUser, checkAdmin, checkEventCreator} = require("../controllers/middlewear/check-auth-middlewear");


// ROOT URL = "/api/tickets"

//Purchase ticket
router.post("/purchase", authenticateUser, ticketControllers.purchaseTicket);

module.exports = router;