import React from 'react';
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {

    const [user, setUser] = useState({
        user_id: "",
        email: "",
        token: "",
        role: "",
    })

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
};