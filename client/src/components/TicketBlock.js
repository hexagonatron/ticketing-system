import React, { useState, useEffect } from 'react';
import moment from 'moment';
import QRcode from 'qrcode.react';


const TicketBlock = ({ ticket }) => {

    const start_date = moment(ticket.event_start);

    const [modalState, setModalState] = useState(false)

    const [minDimension, setMinDimension] = useState(Math.min(window.innerHeight, window.innerWidth))

    useEffect(() => {
        setMinDimension(Math.min(window.innerHeight, window.innerWidth))
    }, [window.innerHeight, window.innerWidth])


    return (
        <div className="card mb-5">
            <div className="columns is-vcentered pl-3">
                <div className="column is-2">
                    <div className="has-background-info has-text-centered">
                        <p><strong className="has-text-white has-text-weight-medium">{start_date.format("ddd").toUpperCase()}</strong></p>
                        <p><strong className="has-text-white has-text-weight-medium">{start_date.format("D").toUpperCase()}</strong></p>
                        <p><strong className="has-text-white has-text-weight-medium">{start_date.format("MMM").toUpperCase()}</strong></p>
                    </div>

                </div>
                <div className="column is-4">
                    <QRcode value={ticket.token} />
                </div>
                <div className="column is-6">
                    <h1 className="title is-5">{ticket.event_name}</h1>
                    <button className="button is-primary mr-3">Sell</button>
                    <button className="button is-primary" onClick={() => setModalState(true)}>View</button>
                </div>
            </div>
            <div class={`modal ${modalState ? "is-active" : ""}`}>
                <div class="modal-background" onClick={() => setModalState(false)}></div>
                <div class="modal-content">
                    <QRcode value={ticket.token} imageSettings={{}} size={minDimension < 500 ? minDimension -20 : 500} />
                </div>
                <button class="modal-close is-large" aria-label="close" onClick={() => setModalState(false)}></button>
            </div>
        </div>
    );
};

export default TicketBlock;