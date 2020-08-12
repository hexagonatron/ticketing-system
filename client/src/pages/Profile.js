import React, { useState, useEffect, useContext, useRef } from 'react';

import moment from 'moment';
import serialize from 'form-serialize';

import TransactionTable from '../components/TransactionTable'
import TicketBlock from '../components/TicketBlock'
import Error from '../components/Error';

import * as API from '../api/api'
import { UserContext } from '../utils/UserContext'

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
    const [updateUserInfo, setUpdateUserInfo] = useState(false);

    const [balance, setBalance] = useState({
        user_id: "",
        balance: 0
    })

    const [tickets, setTickets] = useState([])
    const [refreshTickets, toggleRefreshTickets] = useState(false)
    const triggerTicketRefresh = () => {
        toggleRefreshTickets(!refreshTickets)
    }

    const [transactions, setTransactions] = useState([])

    const [transactionChange, triggerTransactionChange] = useState(true)
    const [balanceChange, triggerBalanceChange] = useState(true)

    const [tabState, setTabState] = useState("dashboard");

    const [changePasswordError, setChangePasswordError] = useState("");

    const balanceInput = useRef(null);

    const addFundsHandler = (e) => {
        e.preventDefault();
        if (!user.token) return
        if (!balanceInput.current.value) return

        console.log(balanceInput.current.value * 100)

        API.addFunds(user.token, balanceInput.current.value * 100).then(response => {
            if (response.error) return console.log(response.error)
            console.log(response);
            balanceInput.current.value = "";

            triggerBalanceChange(!balanceChange);
            triggerTransactionChange(!transactionChange);


        })
    }

    useEffect(() => {
        if (!user.token) return
        API.getBalance(user.token).then(response => {
            if (response.error) return console.log(response.error)
            setBalance(response)
            console.log(response);
        })
    }, [user, balanceChange])

    useEffect(() => {
        if (!user.token) return
        API.getTransactions(user.token).then(response => {
            if (response.error) return console.log(response.error)
            console.log(response);
            setTransactions(response.transactions)
        })
    }, [user, transactionChange, refreshTickets])

    useEffect(() => {
        if (!user.token) return
        API.getTickets(user.token).then(response => {
            if (response.error) return console.log(response.error)
            console.log(response);
            setTickets(response.tickets)
        })
    }, [user, refreshTickets])

    useEffect(() => {
        if (!user.token) return
        API.getUserInfo(user.token).then(response => {
            if (response.error) return console.log(response.error)
            console.log(response);
            setUserInfo(response)
        })
    }, [user, updateUserInfo])

    const changePasswordHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        
        const formData = serialize(e.target, { hash: true });
        console.log(formData);
        
        e.target.reset();

        API.changePassword(user.token, formData).then(response => {
            if(response.error){
                console.log(response.error)
                return setChangePasswordError(response.error)
            }
        })
    }

    const becomeEventCreatorHandler = () => {
        API.becomeEventCreator(user.token).then(response => {
            if(response.error){
                return console.log(response.error);
            }
            setUpdateUserInfo(!updateUserInfo);

        })
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
                    <div class="tabs is-centered">
                        <ul className="tab-list" style={{ border: "none" }}>
                            <li className={tabState === "dashboard" ? "is-active" : ""} onClick={() => setTabState("dashboard")}><a>Dashboard</a></li>
                            <li className={tabState === "settings" ? "is-active" : ""} onClick={() => setTabState("settings")}><a>Settings</a></li>
                        </ul>
                    </div>
                </div>

                {tabState === "dashboard"
                    ? (
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
                                    {tickets.map(ticket => <TicketBlock ticket={ticket} key={ticket.id} refreshTickets={triggerTicketRefresh} />)}
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
                                                <input name="card_number" className="input" type="number" ref={balanceInput} />
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

                    )
                    : tabState === "settings"
                        ? (
                            <div className="columns mt-3">
                                <div className="column is-6">

                                    <div className="section has-background-white mb-5">
                                        <h1 className="title has-text-centered">Your Settings</h1>
                                        <div className="is-size-5 mt-3">
                                            <div className="setting mb-3">
                                                <div>
                                                    Become event creator
                                                </div>
                                                <div>
                                                    <button className="button is-info" onClick={becomeEventCreatorHandler} disabled={userInfo.is_event_creator}>
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="setting mb-3">
                                                <div>
                                                    Delete Account
                                                </div>
                                                <div>
                                                    <button className="button is-info">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-6">
                                    <div className="section has-background-white mb-5">
                                        <h1 className="title has-text-centered">Change Password</h1>
                                        <form onSubmit={changePasswordHandler}>
                                            <div class="field">
                                                <label class="label">Current Password</label>
                                                <div class="control">
                                                    <input class="input" name="oldPassword" type="password" />
                                                </div>
                                            </div>

                                            <div class="field">
                                                <label class="label">New Password</label>
                                                <div class="control">
                                                    <input class="input" name="newPassword" type="password" />
                                                </div>
                                            </div>

                                            <div class="field">
                                                <label class="label">Confirm Password</label>
                                                <div class="control">
                                                    <input class="input" name="confirmPassword" type="password" />
                                                </div>
                                            </div>
                                            <Error error={changePasswordError}/>
                                            <div class="field is-grouped is-grouped-centered">
                                                <p class="control">
                                                    <button class="button is-info" type="submit">
                                                        Submit
                                                    </button>
                                                </p>
                                                <p class="control">
                                                    <a class="button is-light">
                                                        Clear
                                                    </a>
                                                </p>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        )
                        : ""}
            </div>
        </div>
    );
};

export default Profile;