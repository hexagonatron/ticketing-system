import React, { useContext, useState } from 'react';

import { Link, withRouter } from 'react-router-dom'

import { UserContext } from '../utils/UserContext';

const Nav = (props) => {

    const [user, setUser] = useContext(UserContext);

    const [burgerState, setBurgerState] = useState(false);

    const toggleLoginModal = props.toggleLoginModal;

    const logoutHandler = () => {
        setUser({
            id: "",
            email: "",
            role: "",
            token: ""
        })
        props.history.push('/')
    }

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <span className="navbar-item is-size-4">
                    HashTicket
                </span>

                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navBarMenu" onClick={()=> setBurgerState(!burgerState)}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navBarMenu" className={`navbar-menu ${burgerState? "is-active":""}`}>
                <div className="navbar-start">

                    <Link to="/events" className="navbar-item">
                        Home
                    </Link>

                    <Link to="/events" className="navbar-item">
                        Events
                    </Link>

                    <Link to="/market" className="navbar-item">
                        Market
                    </Link>

                    {user.id? <Link to="/profile" className="navbar-item">
                        Profile
                    </Link>: null}
                    
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        {!user.token ? <div className="buttons">
                            <Link className="button is-primary" to={"/signup"}>
                                <strong>Sign up</strong>
                            </Link>
                            <button className="button is-info" onClick={() => toggleLoginModal(true)}>
                                <strong>Login</strong>
                            </button>
                        </div>
                            : <div className="buttons">
                                <button className="button is-danger" onClick={logoutHandler}>
                                    <strong>Logout</strong>
                                </button>
                            </div>}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default withRouter(Nav);