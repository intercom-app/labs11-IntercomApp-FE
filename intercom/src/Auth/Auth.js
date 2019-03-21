import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'voicechatroom.auth0.com',
    clientID: 'hbi2AUNG4AwK4eVjRf6wIzmWgdpXT337',
    redirectUri: 'http://localhost:3000/voicechatroom',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}