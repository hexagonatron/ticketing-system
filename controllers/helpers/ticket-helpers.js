const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const db = require("../../models");

const createTicketJson = (ticket) => {
    const ticketHash = {
        owner_id: ticket.ownerId,
        event_id: ticket.eventId,
        id: ticket.id,
        description: ticket.description,
        token: createTicketToken(ticket),
        checked_in: ticket.checked_in
    }
    return ticketHash
}

const createTicketToken = (ticket) => {
    const identifier = {
        owner_id: ticket.ownerId,
        event_id: ticket.eventId,
        id: ticket.id
    }
    return jwt.sign(identifier, ticket.secret_key, { expiresIn: '5m'});
}

module.exports = {
    createTicketJson
}