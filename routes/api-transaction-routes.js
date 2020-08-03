const express = require("express");
const router = express.Router();

const transactionControllers = require("../controllers/transaction-controllers.js");
const {authenticateUser, checkAdmin, checkEventCreator} = require("../controllers/middlewear/check-auth-middlewear");


// ROOT URL = "/api/transactions"

//Add balance to account
router.post("/balance/add", authenticateUser, transactionControllers.addBalance);

//Withdraw balance from account
router.post("/balance/withdraw", authenticateUser, transactionControllers.withdrawBalance);

//Get balance
router.get("/balance", authenticateUser, transactionControllers.getBalance);

//Get all transactions
router.get("/all", authenticateUser, transactionControllers.getAllTransactions);







module.exports = router;

