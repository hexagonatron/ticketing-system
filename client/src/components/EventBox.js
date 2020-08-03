import React from 'react';
import moment from 'moment';

const EventBox = ({ event }) => {

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
                        <p className="has-text-centered">
                            <strong>{time}</strong>
                        </p>
                    </div>
                    <div className="level">
                        <button className="button is-primary">Purchase</button>
                        <button className="button is-info">Info</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventBox;