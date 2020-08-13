const express = require("express");
const router = express.Router();

const checkinControllers = require("../controllers/checkin-controllers.js");
const {authenticateUser, checkAdmin, checkEventCreator} = require("../controllers/middlewear/check-auth-middlewear");

// ROOT URL = "/api/checkin"


//Checkin a ticket
router.post('/', authenticateUser, checkinControllers.checkinOneTicketHandler);


module.exports = router;