import React from 'react';

const Login = (props) => {

    const modalVisible = props.modalVisible;
    const toggleLoginModal = props.toggleLoginModal;


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
                            <input className="input" type="email" placeholder="GeneSimmons@kiss.com" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password"/>
                        </div>
                    </div>

                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success">Login</button>
                    <button className="button is-success">Signup</button>
                    <button className="button" onClick={() => toggleLoginModal(false)}>Cancel</button>
                </footer>
            </div>
        </div>
    );
};

export default Login;