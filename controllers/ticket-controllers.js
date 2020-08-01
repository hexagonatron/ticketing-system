//NPM Dependencies
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { Op } = require('sequelize');

//Local dependancies
const db = require("../models");

const {purchaseTicketToEvent} = require('./helpers/event-helpers');
const {createTicketJson} =require('./helpers/ticket-helpers');

module.exports = {
    purchaseTicket(req, res) {
        const userId = req.user.id;
        const {event_id} = req.body;

        return purchaseTicketToEvent(event_id, userId).then(ticket => {

            const ticketJson = createTicketJson(ticket);

            return res.status(200).json({success:"Ticket purchased", ticket: ticketJson });
        }).catch(error => {
            console.log(error);
            return res.status(500).json({error: "Error while trying to purchase ticket"});
        })
    },
}