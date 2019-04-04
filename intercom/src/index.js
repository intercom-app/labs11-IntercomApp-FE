import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';
import './styling/css/bootstrap.min.css'
import './styling/css/patros.css'
import './styling/font-awesome/css/font-awesome.min.css'

// import './styling/js/jquery.js'
// import './styling/js/jquery.quicksand.js'
// import'./styling/js/bootstrap.min.js'

import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();

ReactDOM.render(
    routes,
document.getElementById('root'));