import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './pages/App';
import Index from './pages/Index';
import Auth from './pages/auth';

// patient
import PatientAppoint from './pages/patient/Appoint';
import PatientAppoint2 from './pages/patient/Appoint2';
import PatientAppointOption from './pages/patient/AppointOption';
import PatientAppointOption2 from './pages/patient/AppointOption2';
import PatientPrint from './pages/patient/Print';
import PatientHistory from './pages/patient/History';

const AppRouter = () => (
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
      <IndexRoute component={Auth} />
      <Route path="patient" component={Index} />
      <Route path="patient/appoint" component={PatientAppoint} />
      <Route path="patient/appoint/:id" component={PatientAppoint2} />
      <Route path="patient/appoint-option" component={PatientAppointOption} />
      <Route path="patient/appoint-option/:id" component={PatientAppointOption2} />
      <Route path="patient/print" component={PatientPrint} />
      <Route path="patient/history" component={PatientHistory} />
      <Route path="doctor" component={Index} />
    </Route>
  </Router>
);

export default AppRouter;
