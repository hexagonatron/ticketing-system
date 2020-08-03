import React from 'react';
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {

    const [user, setUser] = useState({
        id: "",
        email: "",
        role: "",
        token: ""
    })

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"))

        if (savedUser.id) setUser(savedUser);
    }, [])


    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user])


    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
};