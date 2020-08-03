import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import UserContext from "./utils/UserContext";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Nav from './components/Nav';
import LoginModal from './components/Login';

import Events from './pages/Events';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

function App() {

  const [userState, setUserState] = useState({
    user_id: "",
    email: "",
    token: "",
    role: "",
    setUser: (user) => {

    },
    logout: () => {

    }
  })

  const [loginModalVisible, setLoginModal] = useState(false);

  return (
    <div>
      <UserContext.Provider value={userState}>
        <Router>
          <div className="has-background-grey-lighter main-content">
            <Nav toggleLoginModal={setLoginModal}/>

            <Switch>
              <Route path='/events'>
                <Events/>
              </Route>

              <Route path='/signup'>
                <Signup/>
              </Route>

              <Route path='/profile'>
                <Profile/>
              </Route>

            </Switch>
            <LoginModal modalVisible={loginModalVisible} toggleLoginModal={setLoginModal}/>
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
