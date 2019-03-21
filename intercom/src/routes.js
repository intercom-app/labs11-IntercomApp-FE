import React from 'react';
import { Router, Route } from 'react-router-dom';

import App from './App';
import history from './history';
import Auth from './Auth/Auth';
import Authenticating from './Auth/Authenticating';
import Intro from './components/Intro/Intro';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route path="/" render={(props) => <App auth={auth} {...props} />} />
        <Route path="/intro" render={(props) => <Intro auth={auth} {...props} />} />
        <Route path="/authenticating" render={(props) => {
          handleAuthentication(props);
          return <Authenticating {...props} /> 
        }}/>
      </div>
    </Router>
  );
}