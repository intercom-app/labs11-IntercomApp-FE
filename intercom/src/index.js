import ReactDOM from 'react-dom';

import { makeMainRoutes } from './routes';
// loadjs('./styling/js/jquery.js')

const routes = makeMainRoutes();

ReactDOM.render(
    routes,
document.getElementById('root'));