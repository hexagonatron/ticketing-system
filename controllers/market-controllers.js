const {getAllMarketListings, formatMarketListings, processMarketSale, removeMarketListing, getActiveListingByTicketId} = require('./helpers/market-helpers');
const {createTicketHash} = require('./helpers/ticket-helpers');
const {formatOneTransaction} = require('./helpers/transaction-helpers');

module.exports = {
    getAllMarketListingsHandler(req, res) {
        return getAllMarketListings().then(listings => {
            const listingsJson = formatMarketListings(listings);

            return res.status(200).json({listings: listingsJson});
        }).catch(error => {
            console.log(error)
            return res.status(500).json({error})
        })
    },
    purchaseTicketFromMarket(req, res) {
        const listing_id = req.body.id;

        if(!listing_id) return res.status(400).json({error: "Must provide a listing id"})

        processMarketSale(listing_id, req.user.id).then(transaction => {
            
            const response = {
                success: "Ticket purchased successfully",
                ticket: createTicketHash(transaction.ticket),
                transaction: formatOneTransaction(transaction.transaction)
            }

            return res.status(200).json(response);

        }).catch(error => {
            console.log(error)
            return res.status(500).json({error})
        })
    },
    removeMarketListingHandler(req, res) {
        const {id} = req.query;
        
        //make sure ticket provided
        if(!id) return res.status(400).json({error: "No ticket provided"});

        //Get ticket
        return getActiveListingByTicketId(id).then(listing => {
            //Make sure they own ticket or are a super admin
            if(
                (listing.lister.id != req.user.id) &&
                (req.user.role != "admin")

            ){
                return res.status(400).json({error: "Not able to remove listing"})
            }

            //Remove ticket from market
            removeMarketListing(listing).then(transaction => {

                const transactionJson = formatOneTransaction(transaction)

                return res.status(200).json({transaction: transactionJson})
            })


        }).catch(error => {
            console.log(error)
            return res.status(500).json({error})
        })
    }
}