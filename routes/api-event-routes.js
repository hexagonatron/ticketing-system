const express = require("express");
const router = express.Router();

const eventControllers = require("../controllers/event-controllers.js");
const {authenticateUser, checkAdmin, checkEventCreator} = require("../controllers/middlewear/check-auth-middlewear");


// ROOT URL = "/api/events"

//Get all events
router.get("/all", eventControllers.getAllEvents);

//Get created events
router.get("/created/all", authenticateUser, checkEventCreator, eventControllers.getAllCreatedEvents);

//Add new event
router.post("/create", authenticateUser, checkEventCreator, eventControllers.createEvent)

//Delete single event info
router.delete("/delete/:id", authenticateUser, checkEventCreator, eventControllers.deleteOneEvent);

//Edit single event info
router.put("/edit/:id", authenticateUser, checkEventCreator, eventControllers.editOneEvent);


//Get single event info
router.get("/:id", eventControllers.getOneEvent);


module.exports = router;