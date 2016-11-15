import React, { Component } from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import UserCard from '../../components/UserCard';
import { dumpPatients } from '../../dummyData';

class AppointChoosePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
    };
    this.getPatients = this.getPatients.bind(this);
    this.renderPatients = this.renderPatients.bind(this);
  }

  componentWillMount() {
    this.getPatients();
  }

  getPatients() {
    const patients = dumpPatients();
    this.setState({
      patients,
    });
  }

  renderPatients() {
    const { doctorID } = this.props.params;
    const path = this.props.location.pathname;
    const isNurseOrStaff = path.indexOf('nurse') > 0 || path.indexOf('staff');
    const isDiagnose = path.indexOf('diagnose') > 0;

    return this.state.patients.map(patient => (
      <UserCard
        src={patient.image}
        name={`ผู้ป่วย${patient.name} ${patient.surename}`}
        surename={patient.surename}
        detail={`รหัสโรงพยาบาล ${patient.hospitalID}`}
        buttonText={doctorID ? 'เพิ่มนัดผู้ป่วย'
          : isDiagnose ?
            'วินิจฉัยโรคผู้ป่วย'
              : 'ดูข้อมูลผู้ป่วย'}
        buttonLink={doctorID ?
          `/${isNurseOrStaff ? 'nurse' : 'doctor'}/appoint/${doctorID}/${patient.hospitalID}`
          : isDiagnose ?
            `/${isNurseOrStaff ? 'nurse' : 'doctor'}/diagnose/${patient.hospitalID}`
            : `/${isNurseOrStaff ? 'nurse' : 'doctor'}/history/${patient.hospitalID}`}
        buttonText2={doctorID || isDiagnose ? false : 'ดูประวัติการรักษา'}
        buttonLink2={doctorID || isDiagnose ? false : `/doctor/treat-history/${patient.hospitalID}`}
        key={patient.hospitalID}
      />
    ));
  }

  render() {
    const { doctorID } = this.props.params;
    return (
      <div className="template" id="patient-appoint">
        <div className="header-wrapper">
          <div className="left">
            {doctorID ? 'เพิ่มนัดผู้ป่วย' : 'เลือกผู้ป่วย'}
          </div>
          <div className="right">
          </div>
        </div>
        <div className="content-wrapper">
          <p className="head-text">กรุณาเลือกแพทย์ที่ต้องการนัด</p>
          <div style={{ marginBottom: '20px' }}>
            {this.renderPatients() }
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

export default withRouter(AppointChoosePatient);
