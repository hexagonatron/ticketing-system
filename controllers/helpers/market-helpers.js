const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const db = require("../../models");

const {setTicketSaleState, transferTicketOwnership} = require('./ticket-helpers')
const {userBalanceTransaction, getUserById, getUserBalance} = require('./user-helpers');
const {formatOneTransaction} = require('./transaction-helpers')

const createMarketListing = (ticket, list_price) => {
    return new Promise((resolve, reject) => {
        
        const transactionMsg = `Listing ticket to ${ticket.event.name} for sale on marketplace`;
        
        return db.Market.create({
            id: uuidv4(),
            list_price,
            list_date: moment()
        }).then(listing => {
            return Promise.all([
                listing.setTicket(ticket),
                listing.setLister(ticket.owner),
                listing.setEvent(ticket.event),
                setTicketSaleState(ticket, true),
                userBalanceTransaction(0, transactionMsg, ticket.owner)
            ])
        }).then(([listingTicket, listingOwner, listingEvent, ticket, {transaction}]) => {
            return getListingById(listingTicket.id).then(listing => {
                return resolve({transaction, listing});
            })
        }).catch(error => {
            console.log(error);
            return reject(error)
        })
    })
}

const getListingById = (id) => {
    return new Promise((resolve, reject) => {
        return db.Market.findOne({where: {id}, include:[{all: true}]}).then(listing => {
            if(!listing) throw "Listing not found"
            return resolve(listing)
        }).catch(error => {
            console.log(error)
            return reject(error);
        })
    })
}

const formatOneMarketListing = (listing) => {
    
    const {
        id,
        list_price,
        list_date,
        active,
    } = listing;

    return {
        id,
        list_price,
        list_date,
        active,
        listed_by_id: listing.lister.id,
        listed_by: listing.lister.first_name,
        event_id: listing.event.id,
        event_name: listing.event.name,
        event_date: listing.event.start_date,
        event_venue: listing.event.venue_name,
        ticket_description: listing.ticket.description,
        image_url: listing.event.image_url
    }
    
}

const getAllMarketListings = () => {
    return new Promise((resolve, reject) => {
        db.Market.findAll({
            where: {
                active: true 
            },
            order: [[ 'event', 'start_date', 'ASC']],
            include:[
                {
                    model: db.Event, 
                    as: 'event',
                    where: {
                        start_date: {
                            [Op.gte]: moment().toDate()
                        }
                    }
                },
                {model: db.Ticket, as: 'ticket'},
                {model: db.User, as: 'lister'},
            ]
        }).then(listings => {
            return resolve(listings);
        }).catch(error => {
            console.log(error)
            return reject("Error getting listings")
        })
    })
}

const formatMarketListings = (listings) => {
    return listings.map(listing => formatOneMarketListing(listing));
}

const processMarketSale = (listing_id, user_id) => {
    return new Promise((resolve, reject) => {
        //get the user and listing object
        return Promise.all([
            getUserById(user_id),
            getListingById(listing_id)
        ]).then(([user, listing]) => {

            if(user.id === listing.lister.id) return reject("You can't buy your own listing");

            const price = listing.list_price;

            //get users current balance
            return getUserBalance(user).then(balance => {
                if((balance - price) < 0) return reject("Insufficient Funds");

                const sellerTransMessage = `Sold a ticket to ${listing.event.name} for $${(price/100).toFixed(2)} on market place to ${user.first_name}`
                const buyerTransMessage = `Bought a ticket to ${listing.event.name} for $${(price/100).toFixed(2)} from ${listing.lister.first_name}`;

                //Set listing active to false
                listing.active = false;
                //Change ticket to not for sale
                listing.ticket.for_sale = false;

                return Promise.all([
                    //Create transactions for both users
                    userBalanceTransaction(price, sellerTransMessage, listing.lister),
                    userBalanceTransaction(-price, buyerTransMessage, user),
                    listing.save(),
                    listing.ticket.save(),
                    transferTicketOwnership(listing.ticket, user)
                ]).then(([
                    sellerTrans, 
                    buyerTrans, 
                    listing, 
                    ticket, 
                    newTicket]) => {
                        return resolve({
                            success: "Ticket successfully purchased",
                            ticket: newTicket,
                            transaction: buyerTrans.transaction
                        })
                }).catch(error => {
                    console.log(error)
                    return reject("Error while processing transaction")
                })
            }).catch(error => {
                console.log(error)
                return reject("Error while processing transaction")
            })
        }).catch(error => {
            console.log(error)
            return reject("Error while processing transaction")
        })
    })
}

const getActiveListingByTicketId = (ticketId) => {
    return new Promise((resolve, reject) => {
        return db.Market.findOne({
            where:{
                active: true, 
                ticket_id: ticketId
            },
            include: [{all: true}]
        }).then(listing => {
            if(!listing) return reject("Ticket is not on market");

            return resolve(listing);

        }).catch(error => {
            console.log(error)
            return reject("Error while retriving listing")
        })

    })
}

const removeMarketListing = (listing) => {
    return new Promise((resolve, reject) => {
        listing.active = false;
        listing.ticket.for_sale = false;

        const transactionMsg = `Removing ticket for ${listing.event.name} from market listings.`

        return Promise.all([
            listing.save(),
            listing.ticket.save(),
            userBalanceTransaction(0, transactionMsg, listing.lister)
        ]).then(([listing, ticket, {transaction}]) => {
            return resolve(transaction)
        }).catch(error => {
            console.log(error)
            return reject("Couldn't update ticket")
        })
    })
}

module.exports = {
    createMarketListing,
    formatOneMarketListing,
    getAllMarketListings,
    formatMarketListings,
    processMarketSale,
    removeMarketListing,
    getActiveListingByTicketId
}