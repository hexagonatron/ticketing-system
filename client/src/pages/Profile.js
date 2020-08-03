import React, { useState, useEffect, useContext, useRef } from 'react';

import moment from 'moment';

import TransactionTable from '../components/TransactionTable'
import TicketBlock from '../components/TicketBlock'

import * as API from '../api/api'
import {UserContext} from '../utils/UserContext'

const Profile = () => {

    const [user, setUser] = useContext(UserContext);

    const [userInfo, setUserInfo] = useState({

        id: "",
        email: "",
        role: "",
        first_name: "",
        last_name: "",
        dob: "",
        is_event_creator: false,
        is_event_admin: false

    })

    const [balance, setBalance] = useState({
        user_id: "",
        balance: 0
    })

    const [tickets, setTickets] = useState([])


    const [transactions, setTransactions] = useState([])

    const [transactionChange, triggerTransactionChange] = useState(true)
    const [balanceChange, triggerBalanceChange] = useState(true)
    

    const balanceInput = useRef();

    const addFundsHandler = (e) => {
        e.preventDefault();
        if(!user.token) return
        if(!balanceInput.current.value) return 

        console.log(balanceInput.current.value * 100)

        API.addFunds(user.token, balanceInput.current.value * 100).then(response => {
            if(response.error) return console.log(response.error)
            console.log(response);
            balanceInput.current.value = "";

            triggerBalanceChange(!balanceChange);
            triggerTransactionChange(!transactionChange);


        })
    }

    useEffect(() => {
        if(!user.token) return
        API.getBalance(user.token).then(response => {
            if(response.error) return console.log(response.error)
            setBalance(response)
            console.log(response);
        })
    },[user, balanceChange])

    useEffect(() => {        
        if(!user.token) return
        API.getTransactions(user.token).then(response => {
            if(response.error) return console.log(response.error)
            console.log(response);
            setTransactions(response.transactions)
        })
    },[user, transactionChange])

    useEffect(() => {
        if(!user.token) return
        API.getTickets(user.token).then(response => {
            if(response.error) return console.log(response.error)
            console.log(response);
            setTickets(response.tickets)
        })
    },[user])

    useEffect(() => {
        if(!user.token) return
        API.getUserInfo(user.token).then(response => {
            if(response.error) return console.log(response.error)
            console.log(response);
            setUserInfo(response)
        })
    },[user])

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
                                    <div className="column is-6">{userInfo.first_name} {userInfo.last_name}</div>
                                </div>
                                <div className="columns">
                                    <div className="column is-6"><strong>Email:</strong></div>
                                    <div className="column is-6">{userInfo.email}</div>
                                </div>
                                <div className="columns">
                                    <div className="column is-6"><strong>DOB:</strong></div>
                                    <div className="column is-6">{moment(userInfo.dob, "YYYY-MM-DD").format("D-M-YYYY")}</div>
                                </div>
                                <div className="columns">
                                    <div className="column is-6"><strong>Roles:</strong></div>
                                    <div className="column is-6">
                                        Patron
                                        {userInfo.is_event_creator ? <p>Event Creator</p> : ""}
                                        {userInfo.is_event_admin ? <p>Event Admin</p> : ""}
                                        {userInfo.role === "admin" ? <p>Site Admin</p> : ""}
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
                                        <input name="card_number" className="input" type="number" ref={balanceInput}/>
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
                                        <button className="button is-primary" >Submit</button>
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