const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const db = require("../../models");
const { userBalanceTransaction } = require('./user-helpers');

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

            if(!ticket) return reject("Ticket not found");

            return resolve(ticket);
        }).catch(error => {
            return reject("Error while getting ticket");
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

const decodeTicketToken = (ticketToken) => {
    try{
        return jwt.decode(ticketToken, {json: true});
    } catch (error) {
        console.log(error);
        throw "Ticket Token is corrupt";
    }
}

const verifyTicketToken = (ticketToken, ticketSecret) => {
    try{
        return jwt.verify(ticketToken, ticketSecret)
    }catch (error) {
        if(error.message === "jwt expired") throw "Token has expired, please refresh";

        throw "Ticket token is not valid";
    }
}

const setTicketCheckedIn = (ticket) => {
    ticket.checked_in = true;
    ticket.checked_in_date = moment();

    //Create user transaction
    const transactionMessage = `Checked into ${ticket.event.name}`

    return Promise.all([
        ticket.save(),
        userBalanceTransaction(0, transactionMessage, ticket.owner)
    ]).then(([ticket, transaction]) => {
        return transaction;
    }).catch(error => {
        throw "Error while trying to check in ticket"
    })
}

module.exports = {
    createTicketJson,
    getTicketById,
    setTicketSaleState,
    transferTicketOwnership,
    createTicketHash,
    verifyTicketToken,
    decodeTicketToken,
    setTicketCheckedIn
}