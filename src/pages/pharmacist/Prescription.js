import React, { Component } from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import UserCard from '../../components/UserCard';
import MedicineList from '../../components/MedicineList';
import DispensaryHistory from '../../components/DispensaryHistory';
import { dumpPrescriptions } from '../../dummyData';

class Prescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prescription: null,
      isShowAllergy: true,
    };
    this.getPrescription = this.getPrescription.bind(this);
  }

  componentWillMount() {
    this.getPrescription();
  }

  getPrescription() {
    const { prescriptionID } = this.props.params;
    const prescription = dumpPrescriptions().find(p => p.id === prescriptionID);
    this.setState({ prescription });
  }

  renderMedicine() {
    const { medicine, patient } = this.state.prescription;
    return medicine.map((m, i) => (
      <MedicineList
        key={i}
        no={i}
        name={m.name}
        id={m.id}
        isAllergy={patient.allergy.find(a => a.id === m.id)}
      />
    ));
  }

  renderAllergy() {
    return this.state.prescription.patient.allergy.map((m, i) => (
      <MedicineList
        key={i}
        no={i}
        name={m.name}
        id={m.id}
      />
    ));
  }

  render() {
    const { prescription: { patient }, isShowAllergy } = this.state;
    const btnStyles = {
      float: 'right',
      margin: '10px',
    };
    return (
      <div className="template" id="prescription">
        <div className="header-wrapper">
          <div className="left">
            รายการจ่ายยาผู้ป่วย
          </div>
          <div className="right">
          </div>
        </div>
        <div className="content-wrapper">
          <div className="users-wrapper" style={{textAlign: 'center'}}>
            <UserCard
              src={patient.image}
              name={`ผู้ป่วย${patient.name} ${patient.surename}`}
              surename={patient.surename}
              detail={`เลขประจำตัว ${patient.hospitalID}`}
            />
            <DispensaryHistory patient={patient} />
          </div>
          <div className="datepicker-wrapper" style={{ position: 'relative' }}>
            <p>รายการยาทั้งหมดของผู้ป่วย</p>
            { this.renderMedicine() }
            <hr />
            { isShowAllergy ?
              <div className="allergy-list">
                <p>รายการแพ้ยาของผู้ป่วย{patient.name}</p>
                { this.renderAllergy() }
              </div>
              : ''
            }
          </div>
          <div style={{ marginTop: '50px' }}>
            <RaisedButton
              label="ย้อนกลับ"
              backgroundColor="#95a5a6"
              labelColor="#fff"
              onClick={() => this.props.router.goBack()}
            />
            <RaisedButton
              label="ยืนยัน"
              backgroundColor="#2ecc71"
              labelColor="#fff"
              style={btnStyles}
              onClick={() => this.props.router.goBack()}
            />
            <RaisedButton
              label="ส่งคำร้อง"
              backgroundColor="#e74c3c"
              labelColor="#fff"
              style={btnStyles}
              onClick={() => this.props.router.goBack()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Prescription);
