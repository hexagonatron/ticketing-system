const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const db = require("../../models");
const { models } = require('mongoose');


//takes balance change amount + user obj
const userBalanceTransaction = (balanceChangeAmount, message, user) => {
    balanceChangeAmount = Number(balanceChangeAmount);
    return new Promise((resolve, reject) => {
        getUserBalance(user).then(balance => {
            if(balance + balanceChangeAmount < 0) return reject("Insufficient funds");

            // console.log(`Balance: ${balance}`)
            // console.log(`Change: ${balanceChangeAmount}`)
            // console.log(`Running: ${balance + balanceChangeAmount}`)

            db.Transaction.create({
                id: uuidv4(),
                value: balanceChangeAmount,
                running_total: balance + balanceChangeAmount,
                timestamp: moment().format(),
                description: message
            }).then(transaction => {
                transaction.setUser(user).then(transaction => {
                    return resolve({success: "Transaction successful", transaction});
                })
            }).catch(error => {
                return reject({error: "Error while adding transaction"});
            })
        })
    })
}

//Takes user obj
const getUserBalance = (user) => {
    return new Promise((resolve, reject) => {
        return db.Transaction.findAll({where: {user_id: user.id}}).then(transactions => {
            let total = transactions.reduce((runningTotal, transaction) => {
                return runningTotal += transaction.value
            }, 0);
            total = Number(total);
            return resolve(total);

        }).catch(error => {
            return reject(error)
        })

    })
}


const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.User.findOne({ where: { id }, include: ['admin_events', 'created_events', 'tickets', 'transactions'],order: [[{model: models.Transaction}, 'timestamp','ASC']] }).then(user => {
            return resolve(user);
        }).catch(error => {
            console.log(error);
            return reject("User not found");
        })
    })
}

const getAllUserTransactions = (id) => {
    return new Promise((resolve, reject) => {
        return getUserById(id).then(user => {
            return resolve(user.transactions)
        }).catch(error => {
            return reject("Error getting user transactions")
        })
    })
}

module.exports = {
    userBalanceTransaction,
    getUserBalance,
    getUserById,
    getAllUserTransactions
}