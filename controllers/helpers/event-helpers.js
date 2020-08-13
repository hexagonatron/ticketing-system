const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const db = require("../../models");

const { getUserById, getUserBalance, userBalanceTransaction } = require('./user-helpers');

const getEventById = (id) => {
    return new Promise((resolve, reject) => {
        db.Event.findOne({ where: { id: id }, include: ['creator', 'tickets', 'listings'] }).then(event => {
            if (!event) throw "Event not found"
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
            address,
            image_url
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
                address,
                image_url
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

const makeEventAdminProcessor = (event, user) => {
    return new Promise((resolve, reject) => {
        return event.addEvent_admins(user).then(event => {
            console.log(event);
            return resolve("Success");
        }).catch(error => {
            console.log(error);
            return reject("Error assigning event Admin");
        })
    })
}

const makeEventAdmin = (userId, eventId, requestUserId) => {
    return new Promise((resolve, reject) => {
        return Promise.all([
            getUserById(userId),
            getEventById(eventId),
            getUserById(requestUserId)
        ]).then(([admin, event, requestor]) => {

            //Check to make sure everything exists
            if (!admin) return reject("Couldn't find user with supplied ID");
            if (!event) return reject("Couldn't find event with supplied ID");
            if (!requestor) return reject("Couldn't find user with supplied ID");

            //Make sure requestor is the event owner or a global admin
            if (
                (event.creatorId != requestor.id) &&
                (requestor.role != "admin")
            ) return reject("You don't have permission to assign admins to this event");

            admin.is_event_admin = true;

            //Everything checks out so make the assignment
            return Promise.all([
                event.addEvent_admins(admin, { through: { id: uuidv4() } }),
                admin.save()
            ]).then(([event, admin]) => {
                return resolve("Success");

            }).catch(error => {
                console.log(error)
                return reject("Error while trying to add user as admin")
            })

        }).catch(error => {
            console.log(error);
            return reject("Error while trying to assign eventId")
        })
    })
}

const getAdminEventsForUser = (userId) => {

    return new Promise((resolve, reject) => {
        return getUserById(userId).then(user => {

            if(!user.admin_events.length) return reject("User is not an admin for any events");
            
            return resolve(user.admin_events)

        }).catch(error => {
            return reject(error)
        })

    })
}

module.exports = {
    getEventById,
    createEventTicket,
    purchaseTicketToEvent,
    createEvent,
    assignEventCreator,
    makeEventAdmin,
    getAdminEventsForUser
}