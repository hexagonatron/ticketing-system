import React, { useState } from 'react';

import TransactionTable from '../components/TransactionTable'
import TicketBlock from '../components/TicketBlock'

const Profile = () => {

    const [user, setUser] = useState({

        id: "a091c4e6-9657-49e1-91d3-3e5d29b1d996",
        email: "ben@fawcett.xyz",
        role: "admin",
        first_name: "Ben",
        last_name: "Fawcett",
        dob: "1991-04-18",
        is_event_creator: true,
        is_event_admin: true

    })

    const [balance, setBalance] = useState({

        user_id: "a091c4e6-9657-49e1-91d3-3e5d29b1d996",
        balance: 10000
    })

    const [tickets, setTickets] = useState(
        [
            {
                "owner_id": "a091c4e6-9657-49e1-91d3-3e5d29b1d996",
                "event_id": "e5286a7a-e2ef-44bd-9ac4-518060544dbc",
                "id": "357bd45a-ee17-47d1-b448-88f653af471d",
                "description": "General Admission",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcl9pZCI6ImEwOTFjNGU2LTk2NTctNDllMS05MWQzLTNlNWQyOWIxZDk5NiIsImV2ZW50X2lkIjoiZTUyODZhN2EtZTJlZi00NGJkLTlhYzQtNTE4MDYwNTQ0ZGJjIiwiaWQiOiIzNTdiZDQ1YS1lZTE3LTQ3ZDEtYjQ0OC04OGY2NTNhZjQ3MWQiLCJpYXQiOjE1OTY0MDM5NDQsImV4cCI6MTU5NjQwNDI0NH0.0b9-eUH9cKKJTuvM7BTG56Hf9GiqIm9PXPtbrwf0544",
                "checked_in": false,
                "event_name": "2026 Festival of the Psych",
                "event_start": "2026-08-10T13:02:54.000Z"
            },
            {
                "owner_id": "a091c4e6-9657-49e1-91d3-3e5d29b1d996",
                "event_id": "e5286a7a-e2ef-44bd-9ac4-518060544dbc",
                "id": "5e278c71-f3b9-4acd-81e8-50d9afeec618",
                "description": "General Admission",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcl9pZCI6ImEwOTFjNGU2LTk2NTctNDllMS05MWQzLTNlNWQyOWIxZDk5NiIsImV2ZW50X2lkIjoiZTUyODZhN2EtZTJlZi00NGJkLTlhYzQtNTE4MDYwNTQ0ZGJjIiwiaWQiOiI1ZTI3OGM3MS1mM2I5LTRhY2QtODFlOC01MGQ5YWZlZWM2MTgiLCJpYXQiOjE1OTY0MDM5NDQsImV4cCI6MTU5NjQwNDI0NH0.9W3xWwHgLuPoH0W4cXg3HeCQ4XwpS9WxfawD8reBbJI",
                "checked_in": false,
                "event_name": "2026 Festival of the Psych",
                "event_start": "2026-08-10T13:02:54.000Z"
            },
            {
                "owner_id": "a091c4e6-9657-49e1-91d3-3e5d29b1d996",
                "event_id": "e5286a7a-e2ef-44bd-9ac4-518060544dbc",
                "id": "61c66ca3-5faf-4d07-baa4-a13ed53f0bca",
                "description": "General Admission",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcl9pZCI6ImEwOTFjNGU2LTk2NTctNDllMS05MWQzLTNlNWQyOWIxZDk5NiIsImV2ZW50X2lkIjoiZTUyODZhN2EtZTJlZi00NGJkLTlhYzQtNTE4MDYwNTQ0ZGJjIiwiaWQiOiI2MWM2NmNhMy01ZmFmLTRkMDctYmFhNC1hMTNlZDUzZjBiY2EiLCJpYXQiOjE1OTY0MDM5NDQsImV4cCI6MTU5NjQwNDI0NH0.E62AkyYfYalcSiw2PKdebk0F0zvdyZr7ZlZSlta0c6A",
                "checked_in": false,
                "event_name": "2026 Festival of the Psych",
                "event_start": "2026-08-10T13:02:54.000Z"
            },
            {
                "owner_id": "a091c4e6-9657-49e1-91d3-3e5d29b1d996",
                "event_id": "e5286a7a-e2ef-44bd-9ac4-518060544dbc",
                "id": "b53273f0-1d94-444c-864e-ba25878c8413",
                "description": "General Admission",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcl9pZCI6ImEwOTFjNGU2LTk2NTctNDllMS05MWQzLTNlNWQyOWIxZDk5NiIsImV2ZW50X2lkIjoiZTUyODZhN2EtZTJlZi00NGJkLTlhYzQtNTE4MDYwNTQ0ZGJjIiwiaWQiOiJiNTMyNzNmMC0xZDk0LTQ0NGMtODY0ZS1iYTI1ODc4Yzg0MTMiLCJpYXQiOjE1OTY0MDM5NDQsImV4cCI6MTU5NjQwNDI0NH0.H1dX_hpUQMmm3c5CGXfTfNPoTM0yaNIwmNGdFMZ0qZo",
                "checked_in": false,
                "event_name": "2026 Festival of the Psych",
                "event_start": "2026-08-10T13:02:54.000Z"
            }
        ]
    )


    const [transactions, setTransactions] = useState(
        [
            {
                "id": "cfebee83-bc62-41a2-ac82-90710f7c21d8",
                "description": "Initial balance",
                "value": 10000,
                "running_total": 10000,
                "timestamp": "2020-08-02T23:10:17.000Z",
                "userId": "a091c4e6-9657-49e1-91d3-3e5d29b1d996"
            },
            {
                "id": "59ec27d8-c776-4009-86db-2990ff7eea5b",
                "description": "Adding $100 to account",
                "value": 10000,
                "running_total": 20000,
                "timestamp": "2020-08-02T23:10:18.000Z",
                "userId": "a091c4e6-9657-49e1-91d3-3e5d29b1d996"
            },
            {
                "id": "2e8fede4-4dc6-4f6b-aed5-89765361e0f4",
                "description": "Adding $100 to account",
                "value": 10000,
                "running_total": 30000,
                "timestamp": "2020-08-02T23:10:19.000Z",
                "userId": "a091c4e6-9657-49e1-91d3-3e5d29b1d996"
            },
            {
                "id": "995c7667-c23b-42e1-af4e-cfd5b4588177",
                "description": "Adding $100 to account",
                "value": 10000,
                "running_total": 40000,
                "timestamp": "2020-08-02T23:10:20.000Z",
                "userId": "a091c4e6-9657-49e1-91d3-3e5d29b1d996"
            },
            {
                "id": "24b7d2af-47f4-46a9-b452-d8cfaffeb247",
                "description": "Adding $100 to account",
                "value": 10000,
                "running_total": 50000,
                "timestamp": "2020-08-02T23:10:21.000Z",
                "userId": "a091c4e6-9657-49e1-91d3-3e5d29b1d996"
            },
            {
                "id": "a612a9e5-f2d8-4b95-8c60-9643913789c9",
                "description": "Adding $100 to account",
                "value": 10000,
                "running_total": 60000,
                "timestamp": "2020-08-02T23:10:22.000Z",
                "userId": "a091c4e6-9657-49e1-91d3-3e5d29b1d996"
            },
            {
                "id": "f1a6605d-1f5c-4382-90d2-354e14809b6b",
                "description": "Adding $100 to account",
                "value": 10000,
                "running_total": 70000,
                "timestamp": "2020-08-02T23:10:22.000Z",
                "userId": "a091c4e6-9657-49e1-91d3-3e5d29b1d996"
            },
            {
                "id": "7f747617-3d63-468b-82f9-a8d1d2408f2e",
                "description": "Adding $100 to account",
                "value": 10000,
                "running_total": 80000,
                "timestamp": "2020-08-02T23:10:24.000Z",
                "userId": "a091c4e6-9657-49e1-91d3-3e5d29b1d996"
            },
            {
                "id": "36656c14-d8a5-49ca-bc9d-c8d3a355df47",
                "description": "Adding $100 to account",
                "value": 10000,
                "running_total": 90000,
                "timestamp": "2020-08-02T23:10:25.000Z",
                "userId": "a091c4e6-9657-49e1-91d3-3e5d29b1d996"
            }
        ]
    )

    const addFundsHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <div className="section hero-bg-gradient">
                <div className="container">
                    <h1 className="title has-text-white" >Profile</h1>
                </div>
            </div>

            <div className="container">
                <div className="section has-background-white py-5 mt-3 has-text-centered">
                    <h1 className="title">Welcome Home!</h1>
                </div>

                <div className="columns mt-3">
                    <div className="column is-6">

                        <div className="section has-background-white mb-5">
                            <h1 className="title has-text-centered">Your Information</h1>
                            <div className="is-size-5 mt-3">
                                <div className="columns">
                                    <div className="column is-6"><strong>Name:</strong></div>
                                    <div className="column is-6">{user.first_name} {user.last_name}</div>
                                </div>
                                <div className="columns">
                                    <div className="column is-6"><strong>Email:</strong></div>
                                    <div className="column is-6">{user.email}</div>
                                </div>
                                <div className="columns">
                                    <div className="column is-6"><strong>DOB:</strong></div>
                                    <div className="column is-6">{user.dob}</div>
                                </div>
                                <div className="columns">
                                    <div className="column is-6"><strong>Roles:</strong></div>
                                    <div className="column is-6">
                                        Patron
                                        {user.is_event_creator ? <p>Event Creator</p> : ""}
                                        {user.is_event_admin ? <p>Event Admin</p> : ""}
                                        {user.role === "admin" ? <p>Site Admin</p> : ""}
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className="section has-background-white mb-5">
                            <h1 className="title has-text-centered">Your Tickets</h1>
                            {tickets.map(ticket => <TicketBlock ticket={ticket} key={ticket.id}/>)}
                        </div>

                    </div>
                    <div className="column is-6">
                        <div className="section has-background-white mb-5">
                            <h1 className="title has-text-centered">Your Balance</h1>
                            <h2 className="is-size-4 has-text-centered">Current Balance</h2>
                            <h2 className="is-size-2 has-text-centered">${(balance.balance / 100).toFixed(2)}</h2>
                        </div>

                        <div className="section has-background-white mb-5">
                            <h1 className="title has-text-centered">Add Funds</h1>
                            <form onSubmit={addFundsHandler}>
                                <div className="field">
                                    <label className="label">Amount</label>
                                    <div className="control">
                                        <input name="card_number" className="input" type="number" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Card Number</label>
                                    <div className="control">
                                        <input name="card_number" className="input" type="text" placeholder="xxxx-xxxx-xxxx-xxxx" disabled />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Expiry</label>
                                    <div className="control">
                                        <input name="expiry" className="input" type="text" placeholder="xxxx-xx" disabled />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">CCV</label>
                                    <div className="control">
                                        <input name="ccv" className="input" type="number" placeholder="xxx" disabled />
                                    </div>
                                </div>
                                <div className="field is-grouped is-grouped-centered">
                                    <div className="control">
                                        <button className="button is-primary">Submit</button>
                                    </div>
                                </div>
                            </form >
                        </div>

                        <div className="section has-background-white mb-5">
                            <h1 className="title has-text-centered">Transactions</h1>
                            <TransactionTable transactions={transactions} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;