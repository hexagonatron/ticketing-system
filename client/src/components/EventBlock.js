import React from 'react';
import { Link } from 'react-router-dom'

import moment from 'moment';

const EventBlock = (props) => {

    const dateStr = moment(props.event.start_date).format("Do MMM YYYY")
    const timeStr = moment(props.event.start_date).format("h:mma")

    return (
        <div className={`columns is-mobile ${(props.index + 1) % 2 ? "has-background-white-ter" : ""}`}>
            <div className={`column p-2`}>
                <div className="columns">

                    <div className="column is-2 listing-image-container">
                        <figure class="listing-image">
                            <img src={props.event.image_url} />
                        </figure>
                    </div>

                    <div className="column is-2 flex-v-center">
                        <h2 className="has-text-centered">
                            <p>
                                {dateStr}
                            </p>
                            <p>
                                {timeStr}
                            </p>
                        </h2>
                    </div>

                    <div className="column is-5 flex-v-center">
                        <h1 className="title">
                            {props.event.name}
                        </h1>
                    </div>

                    <div className="column is-3 flex-v-center pr-3" style={{display:'flex', justifyContent:'center'}}>
                        <Link to={{ pathname: "/checkin", state: { event: props.event } }} className="button is-info">
                            Launch Checkin
                        </Link>
                    </div>





                </div>
            </div>

        </div>
    );
};

export default EventBlock;