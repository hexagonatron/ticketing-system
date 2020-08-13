import React, { useState, useEffect, useRef, useContext } from 'react';
import moment from 'moment';
import QRcode from 'qrcode.react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import * as API from '../api/api';

import { UserContext } from '../utils/UserContext'

import Error from './Error';

const TicketBlock = ({ ticket, refreshTickets }) => {

    const start_date = moment(ticket.event_start);

    const [user, setUser] = useContext(UserContext);

    const [ticketToken, setTicketToken] = useState(ticket.token);

    const [modalState, setModalState] = useState(false);
    const [listModalState, setListModalState] = useState(false);
    const [removeListModalState, setRemoveListModalState] = useState(false);

    const [listError, setListError] = useState("");
    const [removeListError, setRemoveListError] = useState("");

    useEffect(() => setListError(""), [listModalState]);
    useEffect(() => setRemoveListError(""), [removeListModalState]);

    const [maxPrice, setMaxPrice] = useState(0);
    const listPriceInput = useRef(null)

    const [minDimension, setMinDimension] = useState(Math.min(window.innerHeight, window.innerWidth))

    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        setMinDimension(Math.min(window.innerHeight, window.innerWidth))
    }, [window.innerHeight, window.innerWidth])

    useEffect(() => {
        API.getEventInfo(ticket.event_id).then(response => {
            if (response.error) return console.log(response.error)

            setMaxPrice(response.price);
        })
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setCountdown(countdown + 300);
        }, 300);

        return () => clearTimeout(timer)
    }, [countdown])

    useEffect(() => {
        if (countdown > 30000) {
            setCountdown(0)
            console.log("Triggered");
            API.refreshTicket(user.token, ticket.id).then(response => {
                if (response.error) return console.log(response.error)

                setTicketToken(response.ticket.token);

            })
        }
    }, [countdown > 30000])

    const listTicket = () => {

        const body = {
            list_price: Math.floor(listPriceInput.current.value * 100),
            id: ticket.id
        }

        API.listTicketOnMarket(user.token, body).then(response => {
            if (response.error) {
                console.log(response.error)
                return setListError(response.error);
            }

            setListModalState(false);
            refreshTickets();
        })
    }

    const removeListTicket = () => {

        API.removeTicketFromMarket(user.token, ticket.id).then(response => {
            if (response.error) {
                console.log(response.error)
                return setRemoveListError(response.error);
            }

            setRemoveListModalState(false)
            refreshTickets();
        })
    }

    return (
        <div className="card mb-5">
            <div className="columns is-vcentered pl-3 is-mobile">
                <div className="column is-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="has-background-info has-text-centered" style={{ width: '100%' }}>
                        <p><strong className="has-text-white has-text-weight-medium">{start_date.format("ddd").toUpperCase()}</strong></p>
                        <p><strong className="has-text-white has-text-weight-medium">{start_date.format("D").toUpperCase()}</strong></p>
                        <p><strong className="has-text-white has-text-weight-medium">{start_date.format("MMM").toUpperCase()}</strong></p>
                    </div>
                    <div className="py-2" style={{ maxWidth: '50px' }}>
                        <CircularProgressbar value={countdown} maxValue={30000} background={true} strokeWidth={50}
                            styles={buildStyles({
                                strokeLinecap: "butt"
                            })} />
                    </div>

                </div>
                <div className="column is-4">
                    <div style={{ width: '100%' }}>
                        <QRcode value={ticketToken || ticket.token} imageSettings={{width:"100%"}}/>

                    </div>
                </div>
                <div className="column is-6">
                    <h1 className="title is-5 has-text-centered">{ticket.event_name}</h1>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        {!ticket.for_sale
                            ? <button className="button is-primary mr-3" onClick={() => setListModalState(true)}>
                                Sell
                        </button>
                            : <button className="button is-danger mr-3" onClick={() => setRemoveListModalState(true)}>
                                Cancel Sale
                        </button>
                        }

                        <button className="button is-primary" onClick={() => setModalState(true)}>View</button>
                    </div>
                </div>
            </div>

            <div class={`modal ${modalState ? "is-active" : ""}`}>
                <div class="modal-background" onClick={() => setModalState(false)}></div>
                <div class="modal-content px-3 py-3 has-background-white" style={{ display: "flex", justifyContent: "center" }}>
                    <QRcode value={ticketToken || ticket.token} imageSettings={{}} size={minDimension < 500 ? minDimension - 20 : 500} />
                </div>
                <button class="modal-close is-large" aria-label="close" onClick={() => setModalState(false)}></button>
            </div>

            <div class={`modal ${listModalState ? "is-active" : ""}`}>
                <div class="modal-background" onClick={() => setListModalState(false)}></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Confirm</p>
                        <button class="delete" aria-label="close" onClick={() => setListModalState(false)}></button>
                    </header>
                    <section class="modal-card-body">
                        <p className="has-text-centered">
                            How much would you like to list your ticket for? (max ${(maxPrice / 100).toFixed(2)})
                        </p>
                        <div className="columns is-centered mt-2">
                            <div className="column is-6">
                                <input class="input" type="number" ref={listPriceInput} placeholder={maxPrice / 100}></input>
                            </div>
                        </div>
                        <Error error={listError} />
                    </section>
                    <footer class="modal-card-foot" style={{ display: "flex", justifyContent: "center" }}>
                        <button class="button is-success" onClick={listTicket}>Confirm</button>
                        <button class="button is-danger" onClick={() => setListModalState(false)}>Cancel</button>
                    </footer>
                </div>
                <button class="modal-close is-large" aria-label="close" onClick={() => setListModalState(false)}></button>
            </div>

            <div class={`modal ${removeListModalState ? "is-active" : ""}`}>
                <div class="modal-background" onClick={() => setRemoveListModalState(false)}></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Confirm</p>
                        <button class="delete" aria-label="close" onClick={() => setRemoveListModalState(false)}></button>
                    </header>
                    <section class="modal-card-body">
                        <p className="has-text-centered">
                            Are you sure you want to cancel the market listing for this ticket?
                        </p>
                        <Error error={removeListError} />
                    </section>
                    <footer class="modal-card-foot" style={{ display: "flex", justifyContent: "center" }}>
                        <button class="button is-success" onClick={removeListTicket}>Yes</button>
                        <button class="button is-danger" onClick={() => setRemoveListModalState(false)}>No</button>
                    </footer>
                </div>
                <button class="modal-close is-large" aria-label="close" onClick={() => setRemoveListModalState(false)}></button>
            </div>


        </div>
    );
};

export default TicketBlock;