//NPM Dependencies
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { Op } = require('sequelize');

//Local dependancies
const db = require("../models");

const {purchaseTicketToEvent} = require('./helpers/event-helpers');
const {createTicketJson} =require('./helpers/ticket-helpers');
const {getUserById} = require('./helpers/user-helpers');

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
    }
}