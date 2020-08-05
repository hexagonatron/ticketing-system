const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const db = require("../../models");

const createTicketJson = (ticket) => {

    return getTicketById(ticket.id).then(ticket => {

        return createTicketHash(ticket)
    })
    
}

const createTicketHash = (ticket) => {
    const ticketHash = {
        owner_id: ticket.ownerId,
        event_id: ticket.eventId,
        id: ticket.id,
        description: ticket.description,
        token: createTicketToken(ticket),
        checked_in: ticket.checked_in,
        event_name: ticket.event.name,
        event_start: ticket.event.start_date,
        for_sale: ticket.for_sale
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

const getTicketById = (id) => {
    return new Promise((resolve, reject) => {
        db.Ticket.findOne({ where: { id }, include: ['event', 'owner', 'market'] }).then(ticket => {

            if(!ticket) throw "Ticket not found"

            return resolve(ticket);
        }).catch(error => {
            return reject(error);
        })
    })
}

const setTicketSaleState = (ticket, state) => {
    ticket.for_sale = state

    return ticket.save()
}

const setNewTicketKey = (ticket) => {
    ticket.secret_key = uuidv4();

    return new Promise((resolve, reject) => {
        return ticket.save().then(ticket => {
            return resolve(ticket)
        }).catch(error => {
            console.log(error)
            return reject("Couldn't set new ticket key")
        })
    })
}

const transferTicketOwnership = (ticket, user) => {
    return new Promise((resolve, reject) => {
        return ticket.setOwner(user).then(ticket => {
            return setNewTicketKey(ticket);
        }).then(ticket => {
            return getTicketById(ticket.id);
        }).then(ticket => {
            return resolve(ticket);
        }).catch(error => {
            console.log(error)
            return reject("Error Transferring ownership of ticket")
        })
    })
}

module.exports = {
    createTicketJson,
    getTicketById,
    setTicketSaleState,
    transferTicketOwnership,
    createTicketHash
}