import React from 'react';
import ReactDOM from 'react-dom'; 
import Router from 'react-router';
import routes from './routes';

Router.run(routes, Router.HistoryLocation, Handler => ReactDOM.render(<Handler />, document.getElementById('app')));
