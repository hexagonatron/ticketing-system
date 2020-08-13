//NPM Dependencies
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { Op } = require('sequelize');

//Local dependancies
const db = require("../models");

const { createEvent, makeEventAdmin, getAdminEventsForUser } = require('./helpers/event-helpers');
const { getUserById } = require('./helpers/user-helpers');

const eventResponseFormatter = (eventArray, options = {}) => {
    const returnArray = eventArray.map((event) => formatOneEvent(event, options));
    return returnArray;
}

const formatOneEvent = ({
    id,
    name,
    description,
    price,
    sale_date,
    start_date,
    capacity,
    address,
    venue_name,
    deleted,
    sold_out,
    listings
},
    options = {}
) => {
    const eventJson = {
        id,
        name,
        description,
        price,
        sale_date,
        start_date,
        venue_name,
        address,
        sold_out,
    }

    if(listings){
        eventJson.has_listings = !!listings.length
    }

    if (options.creator) {
        eventJson.capacity = capacity
        eventJson.deleted = deleted
    }

    return eventJson;
}


module.exports = {
    createEvent(req, res) {

        return createEvent(req.body, req.user.id).then(event => {
            return res.status(200).json(formatOneEvent(event, { creator: true }));
        }).catch(error => {
            console.log(error)
            return res.status(500).json({ error });
        })


    },
    getAllCreatedEvents(req, res) {

        const createdByUserId = (req.user.role === "admin" && req.query.id)
            ? req.query.id
            : req.user.id;

        db.Event.findAll({ where: { created_by: createdByUserId }, include:[{all:true}] }).then(events => {
            const response = eventResponseFormatter(events, { creator: true });

            return res.status(200).json({ events: response });
        }).catch(error => {
            console.log(error);
            return res.status(500).json({ error: "Error while retriving events" })
        })
    },
    getAllEvents(req, res) {
        db.Event.findAll(
            {
                where: {
                    start_date: {
                        [Op.gte]: moment().toDate()
                    },
                    deleted: false
                },
                order: [
                    ['start_date', 'ASC']
                ],
                include:[
                    {all: true}
                ]
            }).then(events => {
                const responseData = eventResponseFormatter(events);

                return res.status(200).json({ events: responseData });
            })
    },
    getOneEvent(req, res) {
        const eventId = req.params.id;

        db.Event.findOne({ where: { id: eventId } }).then(event => {
            const response = formatOneEvent(event);
            return res.status(200).json(response);

        }).catch(error => {
            return res.status(500).json({ error: "Error fetching Event" })
        })
    },
    deleteOneEvent(req, res) {
        const eventId = req.params.id;

        db.Event.findOne({ where: { id: eventId } }).then(event => {
            if (event.created_by === req.user.id || req.user.role === "admin") {

                event.deleted = true;

                return event.save().then(deleteResults => {
                    return res.status(200).json({ success: "Event successfully deleted." });
                });
            }

            return res.status(403).json({ error: "Insufficient permissions" });

        }).catch(error => {
            return res.status(500).json({ error: "Error deleting event" })
        })
    },
    editOneEvent(req, res) {
        const eventId = req.params.id;

        const {
            name,
            description,
            price,
            sale_date,
            start_date,
            capacity,
            address,
            sold_out,
        } = req.body

        db.Event.findOne({ where: { id: eventId } }).then(event => {
            if (event.created_by === req.user.id || req.user.role === "admin") {

                event.name = name || event.name;
                event.description = description || event.description;
                event.price = price || event.price;
                event.sale_date = sale_date || event.sale_date;
                event.start_date = start_date || event.start_date;
                event.capacity = capacity || event.capacity;
                event.address = address || event.address;
                event.sold_out = sold_out || event.sold_out;

                return event.save().then(updatedEvent => {
                    return res.status(200).json({ success: "Event successfully updated.", event: formatOneEvent(updatedEvent, { creator: true }) })
                });
            }

            return res.status(403).json({ error: "Insufficient permissions" });

        }).catch(error => {
            return res.status(500).json({ error: "Error updating event" })
        })
    },
    makeEventAdminHandler(req, res) {
        const {userId, eventId} = req.body;

        return makeEventAdmin(userId, eventId, req.user.id).then(response => {
            return res.status(200).json({success: "User successfully added as an event admin"});
        }).catch(error => {
            return res.status(500).json({error})
        })
    },
    getAdminEventsHandler(req, res) {
        const id = req.user.id

        getAdminEventsForUser(id).then(events => {
            const response = eventResponseFormatter(events)

            return res.status(200).json({events: response});

        }).catch(error => {
            return res.status(500).json({error})
        })
    }
}