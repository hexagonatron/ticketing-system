//NPM Dependencies
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { Op } = require('sequelize');

//Local dependancies
const db = require("../models");

const {purchaseTicketToEvent} = require('./helpers/event-helpers');
const {createTicketJson, getTicketById} =require('./helpers/ticket-helpers');
const {getUserById} = require('./helpers/user-helpers');
const {createMarketListing, formatOneMarketListing} = require('./helpers/market-helpers');
const {formatOneTransaction} = require('./helpers/transaction-helpers');

module.exports = {
    purchaseTicket(req, res) {
        const userId = req.user.id;
        const {event_id} = req.body;

        return purchaseTicketToEvent(event_id, userId).then(ticket => {

            return createTicketJson(ticket).then(ticketJson => {
                return res.status(200).json({success:"Ticket purchased", ticket: ticketJson });
            })

        }).catch(error => {
            console.log(error);
            return res.status(500).json({error: "Error while trying to purchase ticket"});
        })
    },
    getAllTicketsAuthedUser(req, res) {
        const userId = req.user.id;

        getUserById(userId).then(user => {
            const tickets = user.tickets.map(ticket => createTicketJson(ticket));

            Promise.all(tickets).then(tickets => {
                return res.status(200).json({user_id: user.id, tickets: tickets});
            })

        }).catch(error => {
            return res.status(500).json({error: error})
        })
    },
    listTicketOnMarket(req, res) {
        
        const {id, list_price} = req.body;
        
        //make sure ticket provided
        if(!id) return res.status(400).json({error: "No ticket provided"});

        //Get ticket
        return getTicketById(id).then(ticket => {
            //Make sure they own ticket or are a super admin
            if(
                (
                    (ticket.owner.id != req.user.id) ||
                    (list_price > ticket.event.price)
                ) &&
                (req.user.role != "admin")

            ){
                return res.status(400).json({error: "Not able to list ticket"})
            }

            //Check to make sure not already on market
            if(ticket.for_sale){
                return res.status(400).json({error: "Ticket already on market"});
            }

            //Create market listing
            return createMarketListing(ticket, list_price).then(({transaction, listing}) => {
                
                console.log("done")
                const transactionJson = formatOneTransaction(transaction);
                const listingJson = formatOneMarketListing(listing)

                return res.status(200).json({success: "Ticket listed successfully", transaction: transactionJson, listing: listingJson});
            })


        }).catch(error => {
            console.log(error);
            return res.status(500).json({error: error})
        })
        

    }
}