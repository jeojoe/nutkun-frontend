import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './pages/App';
import Index from './pages/Index';
import Auth from './pages/auth';

// patient
import AppointChooseDoctor from './pages/appointment/AppointChooseDoctor';
import AppointChoosePatient from './pages/appointment/AppointChoosePatient';
import AppointChooseDate from './pages/appointment/AppointChooseDate';
import Reappoint from './pages/appointment/Reappoint';
import PatientPrint from './pages/patient/Print';
import PatientHistory from './pages/patient/History';

const AppRouter = () => (
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
      <IndexRoute component={Auth} />
      <Route path="patient" component={Index} />
      <Route path="patient/appoint/:patientID" component={AppointChooseDoctor} />
      <Route path="patient/appoint/:patientID/:doctorID" component={AppointChooseDate} />
      <Route path="patient/reappoint" component={Reappoint} />
      <Route path="patient/reappoint/:appointmentID" component={AppointChooseDate} />
      <Route path="patient/print" component={PatientPrint} />
      <Route path="patient/history" component={PatientHistory} />

      <Route path="doctor" component={Index} />
      <Route path="doctor/appoint/:doctorID" component={AppointChoosePatient} />
      <Route path="doctor/appoint/:doctorID/:patientID" component={AppointChooseDate} />
    </Route>
  </Router>
);

export default AppRouter;
