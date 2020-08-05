const express = require("express");
const router = express.Router();

const ticketControllers = require("../controllers/ticket-controllers.js");
const {authenticateUser, checkAdmin, checkEventCreator} = require("../controllers/middlewear/check-auth-middlewear");

// ROOT URL = "/api/tickets"

//Purchase ticket
router.post("/purchase", authenticateUser, ticketControllers.purchaseTicket);

//Get all tickets
router.get("/all", authenticateUser, ticketControllers.getAllTicketsAuthedUser);

//List ticket on marketplace
router.post("/list", authenticateUser, ticketControllers.listTicketOnMarket);

module.exports = router;