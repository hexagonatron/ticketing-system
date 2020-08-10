const {purchaseTicketToEvent} = require('./helpers/event-helpers');
const {createTicketJson, getTicketById} =require('./helpers/ticket-helpers');
const {getUserById} = require('./helpers/user-helpers');
const {createMarketListing, formatOneMarketListing} = require('./helpers/market-helpers');
const {formatOneTransaction} = require('./helpers/transaction-helpers');
const {checkinOneTicket} = require('./helpers/checkin-helpers');

module.exports = {
    checkinOneTicketHandler(req, res) {
        
        const userId = req.user.id;
        const {event_id, ticket_token} = req.body;

        if(!userId || !event_id || !ticket_token) return res.status(200).json({error: "Missing information"});

        return checkinOneTicket(userId, event_id, ticket_token).then( transaction => {
            const transactionJson = formatOneTransaction(transaction);

            return res.status(200).json({success: "Successfully checked in", transaction});
        }).catch(error => {
            return res.status(500).json({error})
        })


    }
}