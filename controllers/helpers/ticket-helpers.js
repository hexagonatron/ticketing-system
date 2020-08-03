const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const db = require("../../models");

const createTicketJson = (ticket) => {

    return getTicketById(ticket.id).then(ticket => {

        const ticketHash = {
            owner_id: ticket.ownerId,
            event_id: ticket.eventId,
            id: ticket.id,
            description: ticket.description,
            token: createTicketToken(ticket),
            checked_in: ticket.checked_in,
            event_name: ticket.event.name,
            event_start: ticket.event.start_date
        }
        return ticketHash
    })

}

const createTicketToken = (ticket) => {
    const identifier = {
        owner_id: ticket.ownerId,
        event_id: ticket.eventId,
        id: ticket.id
    }
    return jwt.sign(identifier, ticket.secret_key, { expiresIn: '5m'});
}

const getTicketById = (id) => {
    return new Promise((resolve, reject) => {
        db.Ticket.findOne({ where: { id }, include: ['event', 'owner', 'market'] }).then(ticket => {
            return resolve(ticket);
        }).catch(error => {
            return reject("Ticket not found");
        })
    })
}

module.exports = {
    createTicketJson
}