import React, { Component } from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { dumpAppointed } from '../../dummyData';
import AppointmentCard from '../../components/AppointmentCard';

class Reappoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentsOfUser: null,
    }
    this.reappoint = this.reappoint.bind(this);
  }

  componentWillMount() {
    const allAppointments = dumpAppointed();
    const user = this.props.currentUser;

    const appointmentsOfUser = allAppointments.filter((a) => {
      if (user.role === 'patient') {
        return a.patient.hospitalID === user.hospitalID;
      } else if (user.role === 'doctor') {
        return a.doctor.hospitalID === user.hospitalID;
      }
      return true;
    });

    this.setState({ appointmentsOfUser });
  }

  reappoint(appointID) {
    this.props.router.push(`/reappoint/${appointID}`);
  }

  cancal() {

  }

  renderAppointment() {
    if (this.state.appointmentsOfUser.length === 0) {
      return <p style={{ textAlign: 'center', margin: '100px 0 200px', color: '#999' }}>คุณยังไม่มีการทำนัดแพทย์อยู่ในระบบ</p>;
    }
    return this.state.appointmentsOfUser.map((ap, i) => (
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
          <div style={{ marginBottom: '50px' }}>
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
