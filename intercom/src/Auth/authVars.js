let redirectUri;

process.env.NODE_ENV === 'production' 
    ? redirectUri = `${process.env.REACT_APP_AUTH_CB_PROD}`
    : redirectUri = `${process.env.REACT_APP_AUTH_CB_DEV}`

export const AUTH_CONFIG = {
    domain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
    clientID: `${process.env.REACT_APP_AUTH_CLIENT_ID}`,
    redirectUri,
    audience: `${process.env.REACT_APP_AUTH_AUD}`
}