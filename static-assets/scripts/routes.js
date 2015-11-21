import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

// Pages
import App from './pages/app.jsx';
import Dashboard from './pages/dashboard.jsx';

const routes = (
  <Route name='app' path='/' handler={ App }>
    <DefaultRoute handler={ Dashboard } />
    <Route name='example' path='/?' handler={ Dashboard } />
  </Route>
);

export default routes;
