import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';

import * as API from '../api/api';

import { UserContext } from '../utils/UserContext';

import Error from './Error';

const ListingBlock = (props) => {

    const [confirmModal, setConfirmModal] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useContext(UserContext);

    useEffect(() => setError(""), [confirmModal]);

    const date = moment(props.listing.event_date).format("ddd, Do MMMM YYYY, h:mma")

    const price = (props.listing.list_price / 100).toFixed(2);

    const purchaseTicket = () => {

        if (!user.token) return

        API.purchaseMarketTicket(user.token, props.listing.id).then(response => {
            if (response.error) {
                console.log(response.error)
                return setError(response.error)
            }
            setConfirmModal(false);
            props.refreshListings();
        })
    }

    return (
        <div className={`columns ${props.index % 2 ? "has-background-white-ter" : ""}`}>
            <div className="column p-2">
                <div className="columns is-mobile">

                    <div className="column is-2 listing-image-container">
                        <figure class="image is-128x128 listing-image">
                            <img src="https://bulma.io/images/placeholders/128x128.png" />
                        </figure>
                    </div>

                    <div className="column is-7">
                        <h3 className="is-size-3 is-size-5-mobile">{props.listing.event_name}</h3>
                        <p className="is-size-7-mobile">{date}</p>
                        <p className="is-size-7-mobile">{props.listing.event_venue}</p>
                        <p className="is-size-7-mobile">{props.listing.ticket_description}</p>
                        <p className="is-size-7-mobile">Listed by {props.listing.listed_by}</p>
                    </div>

                    <div className="column is-3 control-box">
                        <div className="price-box">
                            <p className="is-size-3 is-size-5-mobile">
                                ${price}
                            </p>
                        </div>
                        <div className="button-container">
                            <button className="button is-info px-4 py-2 mr-3">
                                Info
                            </button>

                            <button className="button is-primary px-4 py-2" onClick={() => setConfirmModal(true)}>
                                Buy
                            </button>
                        </div>
                    </div>

                </div>

            </div>

            <div className={`modal ${confirmModal ? "is-active" : ""}`}>
                <div className="modal-background" onClick={() => setConfirmModal(false)}></div>
                <div className="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Confirm</p>
                        <button class="delete" aria-label="close" onClick={() => setConfirmModal(false)}></button>
                    </header>
                    <section class="modal-card-body">
                        <p className="has-text-centered">Are you sure you want to buy a ticket to {props.listing.event_name} for ${price}?</p>
                        <Error error={error} />
                    </section>
                    <footer class="modal-card-foot" style={{ display: "flex", justifyContent: "center" }}>
                        <button className="button is-primary mr-3" onClick={purchaseTicket}> Purchase</button>
                        <button className="button is-danger" onClick={() => setConfirmModal(false)}>Cancel</button>
                    </footer>

                </div>
                <button className="modal-close is-large" aria-label="close" onClick={() => setConfirmModal(false)}></button>
            </div>

        </div >
    );
};

export default ListingBlock;