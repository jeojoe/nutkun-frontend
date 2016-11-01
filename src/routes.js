import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';

const AppRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>      
    </Route>
  </Router>
);

export default AppRouter;
