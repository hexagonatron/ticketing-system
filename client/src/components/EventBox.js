import React, { useState, useContext } from 'react';
import moment from 'moment';

import { UserContext } from '../utils/UserContext'
import * as API from '../api/api'

const EventBox = ({ event }) => {

    const [user, setUser] = useContext(UserContext);

    const [modalState, setModalState] = useState(false);

    const showModal = () => {
        setModalState(true);
    }
    const hideModal = () => {
        setModalState(false);
    }

    const [error, setError] = useState("")

    const purchaseTicketHandler = () => {
        if (!user.token) return

        API.purchaseTicket(user.token, event.id).then(response => {
            if (response.error) {
                setError(response.error);
                return console.log(response.error)
            };

            console.log(response);
        })
    }

    const time = moment(event.time).format("ddd Mo MMM YYYY")
    return (
        <div className="column is-4">
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title has-text-centered is-4">{event.name}</p>
                        </div>
                    </div>

                    <div className="content">
                        <p>
                            {event.description}
                        </p>
                        <p className="has-text-centered is-size-5">
                            ${(event.price / 100).toFixed(2)}
                        </p>
                        <p className="has-text-centered">
                            <strong>{time}</strong>
                        </p>
                    </div>
                    <div className="level">
                        <button className="button is-primary" onClick={showModal}>Purchase</button>
                        <button className="button is-info">Info</button>
                    </div>
                </div>
            </div>
            <div class={`modal ${modalState ? "is-active" : ""}`}>
                <div class="modal-background" onClick={hideModal}></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Are You Sure?</p>
                        <button class="delete" aria-label="close" onClick={hideModal}></button>
                    </header>
                    <section class="modal-card-body">
                        <p className="has-text-centered">
                            Are you sure you want to purchase a ticket to <strong>{event.name}</strong> for ${(event.price / 100).toFixed(2)}?
                        </p>
                        {error ? <article class="message is-danger">
                            <div class="message-body">
                                {error}
                            </div>
                        </article> : ""}
                    </section>
                    <footer class="modal-card-foot" style={{ justifyContent: 'center' }}>
                        <button class="button is-success" onClick={purchaseTicketHandler}>Confirm</button>
                        <button class="button" onClick={hideModal}>Cancel</button>
                    </footer>
                </div>
            </div>

        </div>
    );
};

export default EventBox;