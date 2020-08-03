import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {UserProvider} from './utils/UserContext';

import Nav from './components/Nav';
import LoginModal from './components/Login';

import Events from './pages/Events';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

function App() {

  const [loginModalVisible, setLoginModal] = useState(false);

  return (
    <div>
      <UserProvider>
        <Router>
          <div className="has-background-grey-lighter main-content">
            <Nav toggleLoginModal={setLoginModal} />

            <Switch>
              <Route path='/events'>
                <Events />
              </Route>

              <Route path='/signup'>
                <Signup />
              </Route>

              <Route path='/profile'>
                <Profile />
              </Route>

            </Switch>
            <LoginModal modalVisible={loginModalVisible} toggleLoginModal={setLoginModal} />
          </div>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
