const express = require("express");
const router = express.Router();

const marketControllers = require("../controllers/market-controllers.js");
const {authenticateUser, checkAdmin} = require("../controllers/middlewear/check-auth-middlewear");



// ROOT URL = "/api/market"

//Get all active listings
router.get('/all', marketControllers.getAllMarketListingsHandler);

//Purchase ticket from market
router.post('/purchase', authenticateUser, marketControllers.purchaseTicketFromMarket);

//Remove market listing
router.delete('/remove', authenticateUser, marketControllers.removeMarketListingHandler)

module.exports = router