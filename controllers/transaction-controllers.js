//NPM Dependencies
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { Op } = require('sequelize');

//Local dependancies
const db = require("../models");

const { getUserById, getUserBalance, userBalanceTransaction } = require('./helpers/user-helpers');

module.exports = {
    addBalance(req, res) {

        const { amount } = req.body;

        const transactionUserId = (req.query.id && req.user.role === 'admin')
            ? req.query.id
            : req.user.id

        getUserById(transactionUserId).then(user => {

            const message = `Adding $${+amount / 100} to account`;

            userBalanceTransaction(amount, message, user).then(response => {
                return res.status(200).json(response);
            })
        }).catch(error => {
            return res.status(500).json({ error: "Error while trying to add balance" });
        })
    },
    withdrawBalance(req, res) {
        const { amount } = req.body;

        const transactionUserId = (req.query.id && req.user.role === 'admin')
            ? req.query.id
            : req.user.id

        getUserById(transactionUserId).then(user => {

            const message = `Withdrawing $${+amount / 100} from account`;

            return userBalanceTransaction((+amount * -1), message, user).then(response => {
                return res.status(200).json(response);
            })
        }).catch(error => {
            return res.status(500).json({ error: "Error while trying to withdraw balance" });
        })
    },
    getBalance(req, res) {
        const transactionUserId = (req.query.id && req.user.role === 'admin')
            ? req.query.id
            : req.user.id;

        getUserById(transactionUserId).then(user => {
            getUserBalance(user).then(balance => {
                return res.status(200).json({ user_id: user.id, balance });
            }).catch(error => {
                return res.status(500).json({ error: "Error while getting balance" });
            })
        })

    }
}