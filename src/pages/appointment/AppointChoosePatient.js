import React, { Component } from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import Loading from '../../components/Loading';
import UserCard from '../../components/UserCard';

class AppointChoosePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      loading: true,
    };
    this.renderPatients = this.renderPatients.bind(this);
  }

  componentDidMount() {
    axios.get('https://nutkun.himikorin.com:4443/api/user')
    .then(res => {
      const patients = res.data.data.filter(u => u.role === 'patient');
      this.setState({ patients, loading: false });
    });
  }

  renderPatients() {
    const { doctorID } = this.props.params;
    const path = this.props.location.pathname;
    const isNurseOrStaff = path.indexOf('nurse') > 0 || path.indexOf('staff') > 0;
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
    if (this.state.loading) return <Loading />
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
          <p className="head-text">กรุณาเลือกผู้ป่วยที่ต้องการนัด</p>
          <div style={{ marginBottom: '20px' }}>
            {this.renderPatients() }
          </div>
          <RaisedButton
            label="ย้อนกลับ"
            backgroundColor="#95a5a6"
            labelColor="#fff"
            className="btn-back"
            onClick={() => this.props.router.goBack()}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(AppointChoosePatient);
