import React, { Component } from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import UserCard from '../../components/UserCard';
import { dumpDoctors } from '../../dummyData';
import './Appoint.css';

class Appoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
    };
    this.allDoctors = [];
    this.getDoctors = this.getDoctors.bind(this);
    this.renderDoctors = this.renderDoctors.bind(this);
  }

  componentWillMount() {
    this.getDoctors();
  }

  getDoctors() {
    const doctors = dumpDoctors();
    this.setState({
      doctors,
    });
  }

  renderDoctors() {
    return this.state.doctors.map(doctor => (
      <UserCard
        src={doctor.image}
        name={`นายแพทย์${doctor.name} ${doctor.surename}`}
        surename={doctor.surename}
        detail={doctor.department}
        buttonText="เพิ่มนัดแพทย์"
        buttonLink={`/patient/appoint/${doctor.hospitalID}`}
        key={doctor.hospitalID}
      />
    ));
  }

  render() {
    return (
      <div className="template" id="patient-appoint">
        <div className="header-wrapper">
          <div className="left">
            เพิ่มนัดแพทย์
          </div>
          <div className="right">
          </div>
        </div>
        <div className="content-wrapper">
          <p className="head-text">กรุณาเลือกแพทย์ที่ต้องการนัด</p>
          <div style={{ marginBottom: '20px' }}>
            {this.renderDoctors() }
          </div>
          <RaisedButton
            label="ย้อนกลับ"
            backgroundColor="#95a5a6"
            labelColor="#fff"
            onClick={() => this.props.router.push('/patient')}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Appoint);