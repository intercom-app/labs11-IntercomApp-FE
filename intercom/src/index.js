// import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
// import App from './App';
import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();

ReactDOM.render(
    // <App />,
    routes,
document.getElementById('root'));

