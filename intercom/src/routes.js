import React from 'react';
import { Router, Route } from 'react-router-dom';
import AddToBalance from './components/Billing/AddToBalance';
import GroupMembersView from './components/GroupMembers/GroupMembersView';
import AccountSettings from './components/AccountSettings/AccountSettings';
import GroupChatroomView from './components/GroupChatroom/GroupChatroomView';

import history from './history';

// Main Router  
import App from './App';

// Auth Routes
import Auth from './Auth/Auth';
import Authenticating from './Auth/Authenticating';
import User from './components/User/User'

// Landing Page
import LandingPageView from './components/LandingPage/LandingPageView';



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
      <>
        <Route path="/" render={(props) => <App auth={auth} {...props} />} />
        <Route exact path="/" render={(props) => <LandingPageView auth={auth} {...props} />} />
        <Route exact path="/authenticating" render={(props) => {
          handleAuthentication(props);
          return <Authenticating {...props} />
        }} />
        <Route exact path="/user/:id" render={(props) => <User auth={auth} {...props} />} />
        <Route exact path="/user/:id/account" render={(props) => <AccountSettings auth={auth} {...props} />} />        
        <Route exact path="/group/:id" render={(props) => <GroupChatroomView {...props} />} />
        <Route exact path="/group/:id/members" render={(props) => <GroupMembersView {...props} />} />
        <Route exact path="/user/:id/billing" render={(props) => <AddToBalance auth={auth} {...props} />} />        
      </>
    </Router>
  );
}