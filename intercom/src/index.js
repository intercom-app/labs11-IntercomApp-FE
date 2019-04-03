import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';
import './styling/css/bootstrap.min.css'
import './styling/css/patros.css'
import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();

ReactDOM.render(
    routes,
document.getElementById('root'));