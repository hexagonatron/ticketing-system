import React, { useState, useContext, useEffect } from 'react';
import { Link,  } from 'react-router-dom'
import moment from 'moment'

import RotateLoader from "react-spinners/RotateLoader";

import * as API from '../api/api'

import QrReader from 'react-qr-reader'

import { UserContext } from '../utils/UserContext'

const Checkin = (props) => {
    const [user, setUser] = useContext(UserContext);
    const [scanState, setScanState] = useState("scanning")
    const [scanData, setScanData] = useState(null)
    const [message, setMessage] = useState(null)
    
    useEffect(() => {
        if (scanData) {
            setScanState("processing")

            API.checkinTicket(scanData, event.id, user.token).then(response => {
                let delay = 3000

                if (response.error) {
                    console.log(response.error)
                    setMessage({ type: "error", text: response.error })
                    setScanState("message")
                    delay = 10000
                } else {
                    setMessage({ type: "success", text: "Checked in!" })
                    setScanState("message");
                }

                console.log(delay)

                setTimeout(() => {
                    setScanState("scanning")
                    setMessage(null)
                }, delay);
            })
        }
    }, [scanData])

    if(!props.location.state){
        props.history.push('/')
        return null
    }
    
    const event = props.location.state.event;
    const eventDateStr = moment(event.start_date).format("Do MMM YYYY h:mma")

    const handleScan = (data) => {
        if (scanState === "scanning") {
            setScanData(data)
        }
    }

    const handleError = (error) => {
        console.log(error)
    }


    return (
        <div className="has-background-grey-darker checkin" style={{ minHeight: "100vh", minWidth:'100vw' }}>
            <Link to="/profile" className="button is-danger mt-4">Exit</Link>
            <div className="mt-4">
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '75vw', height: '75vw' }}
                />
            </div>
            <div className="mt-4">
                <h1 className="is-size-3 has-text-light has-text-centered"> {event.name}</h1>
                <h1 className="is-size-5 has-text-light has-text-centered"> {eventDateStr}</h1>
                <h1 className="is-size-5 has-text-light has-text-centered"> {event.venue_name}</h1>
            </div>

            <div style={{ width: '100%' }} className="mt-4 px-4 py-4">
                <div className={` px-3 py-3 has-background-grey-lighter ${message
                    ? message.type === "error"
                        ? "error-message"
                        : message.type === "success"
                            ? "success-message"
                            : ""
                    : ""}`} style={{ width: '100%' }}>

                    {scanState === "scanning"
                        ? (<p className="has-text-centered is-size-3">
                            Please Scan Ticket
                        </p>)
                    : (scanState === "processing")
                            ? (<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <p className="has-text-centered is-size-3">
                                    Processing
                                </p>
                                <div style={{ height: "60px", display: 'flex', alignItems: 'center' }}>
                                    <RotateLoader loading={true} size={10} margin={1} />
                                </div>
                            </div>)
                    : (scanState === "message")
                                ? (<p className="has-text-centered is-size-3">
                                    {message.text}
                                </p>)
                    : null
                    }
                </div>
            </div>
        </div >
    );
};

export default Checkin;