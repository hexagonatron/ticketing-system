const { getEventById } = require('./event-helpers');
const {getTicketById, decodeTicketToken, verifyTicketToken, setTicketCheckedIn } = require('./ticket-helpers');
const { getUserById } = require('./user-helpers');

const checkinOneTicket = (adminUserId, eventId, ticketToken) => {
    return new Promise((resolve, reject) => {
        return Promise.all([
            getUserById(adminUserId),
            getEventById(eventId)
        ]).then(([admin, event]) => {
            return admin.hasAdmin_events(event).then(isEventAdmin => {
                //Verify checkerinerer is an admin of the event they're trying to check into
                if (!isEventAdmin) return reject("You are not an admin for this event");

                //Make sure ticket to the event trying to check into
                const decodedTicket = decodeTicketToken(ticketToken);

                if(!decodedTicket) return reject("Ticket Token is corrupt")

                if (decodedTicket.event_id != eventId) return reject("Ticket is not for this event");

                //Make sure ticket hasn't already been checked in
                return getTicketById(decodedTicket.id).then(ticket => {
                    if (ticket.checked_in === true) return reject(`Ticket already checked in on ${ticket.checked_in_date}`);

                    if(ticket.for_sale) return reject("Cannot checkin a ticket that's listed on the market"); 

                    //Verify token
                    verifyTicketToken(ticketToken, ticket.secret_key)

                    //Update ticket to reflect checkin
                    return setTicketCheckedIn(ticket).then(transaction => {
                        return resolve(transaction);
                    }).catch(error => {
                        return reject(error)
                    })

                }).catch(error => {
                    console.log(error);
                    return reject(error);
                })



            }).catch(error => {
                return reject(error);
            })
        }).catch(error => {
            return reject(error);
        })


    })
}

module.exports = {
    checkinOneTicket
}