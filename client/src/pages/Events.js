import React, { useState, useEffect, useRef } from 'react';

import * as API from '../api/api'
import EventBox from '../components/EventBox';

const Events = () => {

    const [events, setEvents] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const searchInput = useRef();

    useEffect(() => {
        API.getEvents().then(response => {
            if (response.error) return console.log(response.error);
            setEvents(response.events)
        })
    }, [])

    const applySearch = () => {
        setSearchTerm(searchInput.current.value)
    }

    const resetFilters = () => {
        setSearchTerm("");
        searchInput.current.value = "";
    }

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
                                <input className="input" type="text" placeholder="Find an event" ref={searchInput} />
                            </div>
                            <div className="control">
                                <button className="button is-info" onClick={applySearch}>
                                    Search
                            </button>
                                <button className="button is-danger" onClick={resetFilters}>
                                    Reset
                            </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section has-background-white mt-3">
                    <div className="columns is-multiline">
                        {events.filter(event => event.name.toLowerCase().includes(searchTerm)).map(event => <EventBox event={event} key={event.id} />)}

                    </div>
                </div>
            </div>



        </div>
    );
};

export default Events;