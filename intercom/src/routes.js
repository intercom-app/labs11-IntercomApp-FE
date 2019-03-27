import React from 'react';
import { Router, Route } from 'react-router-dom';

import history from './history';

// Main Router  
import App from './App';

// Auth Routes
import Auth from './Auth/Auth';
import Authenticating from './Auth/Authenticating';
import Intro from './components/Intro/Intro';

// App Routes
import Team from './components/Team/Team';
import Users from './components/Users/Users';
import SingleUser from './components/Users/SingleUser';
import Groups from './components/Groups/Groups';
import SingleGroup from './components/Groups/SingleGroup';


// Create new Auth session
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
        
        <Route path="/team" render={(props) => <Team auth={auth} {...props} />} />
        <Route exact path="/users" render={(props) => <Users auth={auth} {...props} />} />
        <Route exact path="/users/:id" render={(props) => <SingleUser auth={auth} {...props} />} />
        <Route exact path="/groups" render={(props) => <Groups auth={auth} {...props} />} />
        <Route exact path="/groups/:id" render={(props) => <SingleGroup auth={auth} {...props} />} />
      </div>
    </Router>
  );
}