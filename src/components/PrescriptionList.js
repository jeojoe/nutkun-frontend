import React from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import './PrescriptionList.css';

const PrescriptionList = ({ no, patient, prescription, router }) => (
  <div className="prescription-list">
    <div className="no">{no}</div>
    <div className="patient">
      <img role="presentation" src={patient.image} />
      <div className="name">
        <h6>{`${patient.name} ${patient.surename}`}</h6>
        <p>{`${patient.hospitalID}`}</p>
      </div>
    </div>
    <RaisedButton
      label="ดูการจ่ายยา"
      backgroundColor="#3498db"
      labelColor="#fff"
      className="btn"
      onClick={() => router.push(`/pharmacist/prescription/${prescription.id}`)}
    />
  </div>
);

export default withRouter(PrescriptionList);
