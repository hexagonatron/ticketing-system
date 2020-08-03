import React, {useContext, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {UserContext} from '../utils/UserContext';

import * as API from '../api/api';

const Login = (props) => {

    const [user, setUser] = useContext(UserContext)

    const modalVisible = props.modalVisible;
    const toggleLoginModal = props.toggleLoginModal;

    let history = useHistory();

    const email = useRef()
    const password = useRef()

    const signupButtonHandler = (e) => {
        props.toggleLoginModal(false);
        history.push("/signup")
    }

    const loginButtonHandler = (e) => {
        const body = {
            email: email.current.value,
            password: password.current.value,
        }

        console.log(body);

        API.login(body).then(response => {
            console.log(response);
            setUser(response)
            toggleLoginModal(false)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className={`modal ${modalVisible ? "is-active" : ""}`}>
            <div className="modal-background" onClick={() => toggleLoginModal(false)}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Login</p>
                    <button className="delete" aria-label="close" onClick={() => toggleLoginModal(false)}></button>
                </header>
                <section className="modal-card-body">
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" type="email" placeholder="GeneSimmons@kiss.com" ref={email} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" ref={password}/>
                        </div>
                    </div>

                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={loginButtonHandler}>Login</button>
                    <button className="button is-success" onClick={signupButtonHandler}>Signup</button>
                    <button className="button" onClick={() => toggleLoginModal(false)}>Cancel</button>
                </footer>
            </div>
        </div>
    );
};

export default Login;