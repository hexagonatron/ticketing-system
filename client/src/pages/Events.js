import React, { useState } from 'react';

import EventBox from '../components/EventBox';

const Events = () => {

    const [events, setEvents] = useState(
        [
            {
                "id": "bf836be6-f4cb-4ee5-b65d-d8f963d7bae4",
                "name": "Festival of the Metal",
                "description": "An event not to be missed",
                "price": 8000,
                "sale_date": "2019-07-10T13:02:54.000Z",
                "start_date": "2020-08-10T13:02:54.000Z",
                "venue_name": "Adelaide Oval",
                "address": "War Memorial Dr, North Adelaide SA 5006",
                "sold_out": false
            },
            {
                "id": "dc4c0b23-e223-401a-9814-7aafaeeb98c2",
                "name": "Adelchella",
                "description": "Coachella but in Adelaide",
                "price": 8000,
                "sale_date": "2019-07-10T13:02:54.000Z",
                "start_date": "2020-09-15T13:02:54.000Z",
                "venue_name": "Bonython Park",
                "address": "Adelaide SA 5000",
                "sold_out": false
            },
            {
                "id": "4dc7ced5-c92f-44dc-8380-b028466f0bab",
                "name": "South Australia Open Air",
                "description": "Open air music festival",
                "price": 8000,
                "sale_date": "2019-07-10T13:02:54.000Z",
                "start_date": "2020-10-28T13:02:54.000Z",
                "venue_name": "The Desert",
                "address": "66 Desert Rd, Middle of nowhere",
                "sold_out": false
            },
            {
                "id": "282751a1-32f2-4a03-b90c-e16b16ab8cf3",
                "name": "The Rock of Ages",
                "description": "Rock 'n' Roll",
                "price": 8000,
                "sale_date": "2019-07-10T13:02:54.000Z",
                "start_date": "2020-12-10T13:02:54.000Z",
                "venue_name": "The Gov",
                "address": "59 Port Rd, Hindmarsh SA 5007",
                "sold_out": false
            },
            {
                "id": "e5286a7a-e2ef-44bd-9ac4-518060544dbc",
                "name": "2026 Festival of the Psych",
                "description": "Psych out!!",
                "price": 10000,
                "sale_date": "2019-07-10T13:02:54.000Z",
                "start_date": "2026-08-10T13:02:54.000Z",
                "venue_name": "The Pit",
                "address": "123 Fake St",
                "sold_out": false
            }
        ]
    )

    return (
        <div>
            <div className="section hero-bg-gradient">
                <div className="container">
                    <h1 className="title has-text-white" >Events</h1>
                    <h2 className="subtitle has-text-light">View upcoming events</h2>
                </div>
            </div>

            <div className="container">
                <div className="section has-background-white py-5 mt-3 level">
                    <div className="level-left">

                    </div>
                    <div className="level-right">
                        <div className="field has-addons">
                            <div className="control">
                                <input className="input" type="text" placeholder="Find an event" />
                            </div>
                            <div className="control">
                                <a className="button is-info">
                                    Search
                            </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section has-background-white mt-3">
                    <div className="columns is-multiline">
                        {events.map(event => <EventBox event={event} key={event.id} />)}

                    </div>
                </div>
            </div>



        </div>
    );
};

export default Events;