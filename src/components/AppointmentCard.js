import React, { PropTypes } from 'react';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import './AppointmentCard.css';

const AppointmentCard = ({ id, patient, doctor, date, period, no, print, reappoint, cancal }) => (
  <div className="appoint-card">
    <div className="no">{no}</div>

    {/*
      Left Side
    */}
    <div className="left">
      <p>
        {`นายแพทย์${doctor.name} ${doctor.surename}`}
      </p>
      <p className="sub">
        {doctor.department}
      </p>
      <p className="plus"> + </p>
      <p>
        {`ผู้ป่วย${patient.name} ${patient.surename}`}
      </p>
      <p className="sub">
        {patient.hospitalID}
      </p>
    </div>

    {/*
      Right Side
    */}
    <div className="right">
      <p>คุณนัดแพทย์ไว้เมื่อ</p>
      <p className="date">
        {/*`${moment(date).date()} ${moment(date).month()} ${moment(date).year()}`*/}
        {`วันที่ ${moment(date).date()} ${moment(date).format('MMMM')} ${moment(date).year() + 543}`}
      </p>
      <p className="period">{ period.id === '1' ? 'ช่วงเช้า' : 'ช่วงบ่าย'}</p>
      { print ?
        <RaisedButton
          label="พิมพ์ใบนัดแพทย์"
          backgroundColor="#3498db"
          // buttonStyle={{ borderRadius: '8px' }}
          labelColor="#fff"
          className="btn"
          onClick={() => { print(id); }}
        /> : ''
      }
      { reappoint ?
        <RaisedButton
          label="เลื่อนนัดแพทย์"
          backgroundColor="#3498db"
          // buttonStyle={{ borderRadius: '8px' }}
          labelColor="#fff"
          className="btn"
          onClick={() => { reappoint(id); }}
        /> : ''
      }
      { cancal ?
        <RaisedButton
          label="ยกเลิกนัดแพทย์"
          backgroundColor="#e74c3c"
          // buttonStyle={{ borderRadius: '8px' }}
          labelColor="#fff"
          className="btn"
          onClick={() => { cancal(id); }}
        /> : ''
      }
    </div>
  </div>
);

AppointmentCard.propTypes = {
  id: PropTypes.string,
  patient: PropTypes.object,
  doctor: PropTypes.object,
  date: PropTypes.string,
  period: PropTypes.string,
  no: PropTypes.number,
  print: PropTypes.func,
};

export default AppointmentCard;
