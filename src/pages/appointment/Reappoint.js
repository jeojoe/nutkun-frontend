import React, { Component } from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { dumpAppointed } from '../../dummyData';
import AppointmentCard from '../../components/AppointmentCard';

class Reappoint extends Component {
  constructor(props) {
    super(props);
    this.reappoint = this.reappoint.bind(this);
  }

  reappoint(appointID) {
    this.props.router.push(`/patient/reappoint/${appointID}`);
  }

  cancal() {

  }

  getAppointment() {
    return dumpAppointed();
  }

  renderAppointment() {
    return this.getAppointment().map((ap, i) => (
      <AppointmentCard
        patient={ap.patient}
        doctor={ap.doctor}
        date={ap.datetime}
        period={ap.period}
        id={ap.id}
        reappoint={this.reappoint}
        cancal={this.cancal}
        key={i + 1}
        no={i + 1}
      />
    ));
  }
  render() {
    return (
      <div className="template" id="patient-print">
        <div className="header-wrapper">
          <div className="left">
            พิมพ์ใบนัดแพทย์
          </div>
          <div className="right">
          </div>
        </div>
        <div className="content-wrapper">
          <p className="head-text">กำหนดการนัดแพทย์ที่คุณมีอยู่</p>
          <div>
            { this.renderAppointment() }
          </div>
          <RaisedButton
            label="ย้อนกลับ"
            backgroundColor="#95a5a6"
            labelColor="#fff"
            onClick={() => this.props.router.goBack()}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Reappoint);
