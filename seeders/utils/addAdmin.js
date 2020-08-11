const db = require('../../models');

const { createEvent, assignEventCreator } = require('../../controllers/helpers/event-helpers');
const { userBalanceTransaction } = require('../../controllers/helpers/user-helpers')

module.exports = () => {
    db.User.create({
        id: "a091c4e6-9657-49e1-91d3-3e5d29b1d996",
        email: "ben@fawcett.xyz",
        password: "1234567890",
        role: "admin",
        first_name: "Ben",
        last_name: "Fawcett",
        dob: "1991-04-18",
        is_event_creator: true,
        is_event_admin: true
    }).then(user => {
        console.log("Admin successfully added.");
        return db.Event.create({
            id: "e5286a7a-e2ef-44bd-9ac4-518060544dbc",
            name: "2026 Festival of the Psych",
            description: "Psych out!!",
            price: 10000,
            sale_date: "2019-07-10T13:02:54.000Z",
            start_date: "2026-08-10T13:02:54.000Z",
            venue_name: "The Pit",
            address: "123 Fake St",
            capacity: "1100",
        }).then(event => {
            return assignEventCreator(event, user).then(() => event.addEvent_admins(user, {through:{id: "58dd871d-192e-4345-afc7-7a627e4c64f0"}})).then(response => {
                console.log("Event Created");
                return userBalanceTransaction(100000, "Initial balance", user)
            }).then(() => {
                return db.Ticket.create({
                    id: "3c778ff4-7e67-4c21-b907-fbe2497be622",
                    description: "Test Ticket",
                    secret_key: "8c120727-f273-4b4d-9b19-738c915d4f64",
                }).then(ticket => {
                    ticket.setOwner(user)
                    ticket.setEvent(event)
                })
            })
        })
    }).then(balance => {
        console.log("Balance added.")
    }).then(() => {
        return db.User.create({
            id: "ebf147e3-fffd-46a7-8802-939d32e986aa",
            email: "miles@davis.com",
            password: "1234567890",
            role: "user",
            first_name: "Miles",
            last_name: "Davis",
            dob: "1926-05-26",
            is_event_creator: false,
            is_event_admin: false
        }).then(user => {
            console.log("Miles davis created")
            return userBalanceTransaction(100000, "Initial balance", user)
        })

    }).catch(error => console.log(error));
}