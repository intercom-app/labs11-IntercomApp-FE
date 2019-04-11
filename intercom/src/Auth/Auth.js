import auth0 from 'auth0-js';
import history from '../history';
import { AUTH_CONFIG } from './authVars';
import axios from 'axios';
import host from '../host';

export default class Auth {

  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID,
    redirectUri: AUTH_CONFIG.redirectUri,
    audience: AUTH_CONFIG.audience,
    responseType: 'token id_token',
    scope: 'openid email profile'
  });

  login = () => {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    this.auth0.parseHash(async (err, authResult) => {
      // console.log(authResult)
      if (authResult && authResult.accessToken && authResult.idToken) {
        try {
          const user = await axios.post(`${host}/api/users`, authResult.idTokenPayload)
          const id = user.data.id;
          if (user && id) {
            localStorage.setItem('userId', id)
            const route = `/user/${id} `
            this.setSession(authResult, route)
          }
        } catch (err) {
          console.log(err);
          // alert(`Error: ${err.error}.Check the console for further details.`);
        }

      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}.Check the console for further details.`);
      }
    });
  }

  getAccessToken = () => {
    return this.accessToken;
  }

  getIdToken = () => {
    return this.idToken;
  }

  setSession = (authResult, route) => {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // Navigate to the route only if route passed. Stops renew session to redirect back to home
    if (route) {
      history.replace(route);
    }

  }

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(`Could not get a new token(${err.error}: ${err.error_description}).`);
      }
    });
  }

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');  

    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    // let expiresAt = this.expiresAt;
    // return new Date().getTime() < expiresAt;
    return localStorage.getItem('userId')
  }
}