const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const db = require("../../models");

const { getUserById, getUserBalance, userBalanceTransaction } = require('./user-helpers');

const getEventById = (id) => {
    return new Promise((resolve, reject) => {
        db.Event.findOne({ where: { id: id }, include: ['creator', 'tickets', 'listings'] }).then(event => {
            if(!event) throw "Event not found"
            return resolve(event);
        }).catch(error => {
            console.log(error);
            return reject(error);
        })
    })
}

const getRemainingEventCapacityById = (id) => {
    return getEventById(id).then(event => {
        const ticketsSold = event.tickets.length
        return event.capacity - ticketsSold
    })
}

const purchaseTicketToEvent = (eventId, userId) => {
    return new Promise((resolve, reject) => {
        return Promise.all([
            getEventById(eventId),
            getUserById(userId)]
        ).then(([event, user]) => {

            return getUserBalance(user).then(balance => {
                if (balance - event.price < 0) return reject("Infufficient Funds")

                const transactionMsg = `Purchasing ticket to ${event.name}`;
                return userBalanceTransaction((event.price * -1), transactionMsg, user).then((response) => {
                    return createEventTicket(event, user).then(ticket => {
                        return resolve(ticket);
                    })
                })

            })

        }).catch(error => {
            console.log(error);
            return reject("Error while purchasing ticket")
        })
    })
}

const createEventTicket = (event, user) => {
    return new Promise((resolve, reject) => {
        return db.Ticket.create({
            id: uuidv4(),
            description: "General Admission",
            secret_key: uuidv4()
        }).then(ticket => {
            return ticket.setEvent(event).then(ticket => {
                return ticket.setOwner(user)
            }).then((ticket) => {
                return resolve(ticket);
            })
        }).catch(error => {
            console.log(error);
            return reject("Error creating ticket")
        })
    })
}

const createEvent = (eventParams, userId) => {
    return new Promise((resolve, reject) => {
        const {
            name,
            description,
            price,
            sale_date,
            start_date,
            capacity,
            venue_name,
            address
        } = eventParams;

        if (
            name === undefined
            || price === undefined
            || start_date === undefined
            || capacity === undefined
            || venue_name === undefined
            || address === undefined
        ) return reject("missing information");

        return Promise.all([
            db.Event.create({
                id: uuidv4(),
                name,
                description,
                price,
                sale_date: sale_date || moment().format(),
                start_date,
                capacity,
                venue_name,
                address
            }),
            db.User.findOne({ where: { id: userId } })
        ]).then(([event, user]) => {

                return assignEventCreator(event, user).then(event => {
                    return resolve(event);
                })

            }).catch(error => {
                console.log(error);
                return reject("Error while adding event");
            })
    })
}

const assignEventCreator = (event, user) => {
    return new Promise((resolve, reject) => {
        return event.setCreator(user).then(event => {
            return resolve(event)
        })
    })
}

module.exports = {
    getEventById,
    createEventTicket,
    purchaseTicketToEvent,
    createEvent,
    assignEventCreator,
}