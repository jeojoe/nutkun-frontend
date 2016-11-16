import React from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import './MedicineList.css';
import './PersonnalList.css';

const PersonnalList = ({ no, name, id, role, department, image, router }) => (
  <div className="medicine-list personnal-list">
    <div className="no">{parseInt(no, 10) + 1}</div>
    <img src={image} role="presentation" />
    <div className="detail-wrapper">
      <h6 className="name">{name}</h6>
      <div>
        <sub>{role} {department}</sub>
      </div>
    </div>
    <p>รหัส {id}</p>
    <RaisedButton
      label="แก้ไข"
      backgroundColor="#3498db"
      labelColor="#fff"
      onClick={() => router.push(`/admin/personnal/${id}`)}
    />
  </div>
);

export default withRouter(PersonnalList);
