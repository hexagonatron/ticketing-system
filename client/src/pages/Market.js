import React, {useState, useEffect} from 'react';

import * as API from '../api/api';

import ListingBlock from '../components/ListingBlock';

const Market = () => {

    const [listings, setListings] = useState([]);
    const [refreshListingsState, setRefreshListings] = useState(false);

    useEffect(() => {
        API.getListings().then(response => {
            if(response.error) return console.log(response.error);
            setListings(response.listings);
        })
    },[refreshListingsState])

    const refreshListings = () => setRefreshListings(!refreshListingsState);

    return (
        <div>
            <div className="section hero-bg-gradient">
                <div className="container">
                    <h1 className="title has-text-white" >Marketplace</h1>
                    <h2 className="subtitle has-text-light">View and purchase tickets from other users</h2>
                </div>
            </div>

            <div className="container">
                <div className="section has-background-white py-5 mt-3 level">
                    <div className="level-left">

                    </div>
                    <div className="level-right">
                        <div className="field has-addons">
                            <div className="control">
                                <input className="input" type="text" placeholder="Find an event"  />
                            </div>
                            <div className="control">
                                <button className="button is-info">
                                    Search
                            </button>
                                <button className="button is-danger">
                                    Reset
                            </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section has-background-white px-3 py-3">
                    { listings.length
                        ? listings.map((listing, i) => <ListingBlock listing={listing} index={i} key={listing.id} refreshListings={refreshListings}/>)
                        : <h1 className="is-size-3 has-text-centered">The Marketplace is currently empty</h1>
                    }
                </div>
            </div>



        </div>
    );
};

export default Market;