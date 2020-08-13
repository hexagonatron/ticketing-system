import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { UserProvider } from './utils/UserContext';

import Nav from './components/Nav';
import LoginModal from './components/Login';

import Events from './pages/Events';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Market from './pages/Market';
import Checkin from './pages/Checkin';

function App() {

  const [loginModalVisible, setLoginModal] = useState(false);

  return (
    <div>
      <UserProvider>
        <Router>

          <Switch>

            <Route exact path='/checkin' component={Checkin} />

            <div className="has-background-grey-lighter main-content">
              <Nav toggleLoginModal={setLoginModal} />

              <Route path='/events'>
                <Events />
              </Route>

              <Route path='/signup'>
                <Signup />
              </Route>

              <Route path='/profile'>
                <Profile />
              </Route>

              <Route path='/market'>
                <Market />
              </Route>

              <Route exact path='/'>
                <Events />
              </Route>

            <LoginModal modalVisible={loginModalVisible} toggleLoginModal={setLoginModal} />
            </div>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
