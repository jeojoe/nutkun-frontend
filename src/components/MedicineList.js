import React from 'react';
import classNames from 'classnames';
import './MedicineList.css';

const MedicineList = ({ no, name, id, isAllergy, info }) => (
  <div className={classNames('medicine-list', { alert: isAllergy })}>
    <div className="no">{parseInt(no, 10) + 1}</div>
    <h6 className="name">ชื่อยา : {name}</h6>
    <p>รหัสยา : {id}</p>
    <div>
      <sub>รายละเอียด : {info}</sub>
    </div>
  </div>
);

export default MedicineList;
