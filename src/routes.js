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
import Schedule from './pages/schedule/Schedule';
import Temp from './pages/schedule/Temp';
import Print from './pages/print/Print';
import PatientHistory from './pages/history/History';
import DiagnoseBasic from './pages/diagnose/DiagnoseBasic';
import PharmacistIndex from './pages/pharmacist/Index';
import Prescription from './pages/pharmacist/Prescription';
import EditMedicine from './pages/admin/EditMedicine';
import EditDisease from './pages/admin/EditDisease';
import EditPersonnal from './pages/admin/EditPersonnal';
import EditPersonnal2 from './pages/admin/EditPersonnal2';
import Report from './pages/admin/Report';

const AppRouter = () => (
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
      <IndexRoute component={Auth} />

      {/* Patient */}
      <Route path="patient" component={Index} />
      <Route path="patient/appoint/:patientID" component={AppointChooseDoctor} />
      <Route path="patient/appoint/:patientID/:doctorID" component={AppointChooseDate} />
      <Route path="patient/history/:patientID" component={PatientHistory} />

      {/* Doctor */}
      <Route path="doctor" component={Index} />
      <Route path="doctor/appoint/:doctorID" component={AppointChoosePatient} />
      <Route path="doctor/appoint/:doctorID/:patientID" component={AppointChooseDate} />
      <Route path="doctor/history" component={AppointChoosePatient} />
      <Route path="doctor/history/:patientID" component={PatientHistory} />
      <Route path="doctor/treat-history/:patientID" component={PatientHistory} />

      {/* Nurse */}
      <Route path="nurse" component={Index} />
      <Route path="nurse/appoint" component={AppointChooseDoctor} />
      <Route path="nurse/appoint/:doctorID" component={AppointChoosePatient} />
      <Route path="nurse/appoint/:doctorID/:patientID" component={AppointChooseDate} />
      <Route path="nurse/history" component={AppointChoosePatient} />
      <Route path="nurse/history/:patientID" component={PatientHistory} />
      <Route path="nurse/diagnose" component={AppointChoosePatient} />
      <Route path="nurse/diagnose/:patientID" component={DiagnoseBasic} />

      {/* Staff */}
      <Route path="staff" component={Index} />
      <Route path="staff/appoint" component={AppointChooseDoctor} />
      <Route path="staff/appoint/:doctorID" component={AppointChoosePatient} />
      <Route path="staff/appoint/:doctorID/:patientID" component={AppointChooseDate} />

      {/* admin */}
      <Route path="admin" component={Index} />
      <Route path="admin/medicine" component={EditMedicine} />
      <Route path="admin/disease" component={EditDisease} />
      <Route path="admin/personnal" component={EditPersonnal} />
      <Route path="admin/personnal/:personnalID" component={EditPersonnal2} />
      <Route path="admin/report" component={Report} />

      {/* Reappointment */}
      <Route path="reappoint" component={Reappoint} />
      <Route path="reappoint/:appointmentID" component={AppointChooseDate} />

      {/* Print */}
      <Route path="print" component={Print} />

      {/* Schedule */}
      <Route path="schedule/:doctorID" component={Temp} />

      <Route path="pharmacist" component={PharmacistIndex} />
      <Route path="pharmacist/prescription/:prescriptionID" component={Prescription} />

    </Route>
  </Router>
);

export default AppRouter;
