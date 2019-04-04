import ReactDOM from 'react-dom';
import loadjs from 'loadjs';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';
// import $ from 'jquery';
// import "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"
// import './styling/js/jquery.js'
// import './styling/js/bootstrap.min.js'
// import './styling/js/jquery.quicksand.js'
import './styling/css/bootstrap.min.css'
import './styling/css/patros.css'
import './styling/font-awesome/css/font-awesome.min.css'


import { makeMainRoutes } from './routes';
// loadjs('./styling/js/jquery.js')

const routes = makeMainRoutes();

ReactDOM.render(
    routes,
document.getElementById('root'));