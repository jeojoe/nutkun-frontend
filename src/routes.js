import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './pages/App';
import Auth from './pages/auth';
import PatienceHome from './pages/patience';

const AppRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Auth} />
      <Route path="patience" component={PatienceHome} />
    </Route>
  </Router>
);

export default AppRouter;
