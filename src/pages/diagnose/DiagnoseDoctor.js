import React, { Component } from 'react';
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import UserCard from '../../components/UserCard';
import MedicineSelectField from '../../components/MedicineSelectField';
import MedicineList from '../../components/MedicineList';
import { dumpPatients } from '../../dummyData';

class DiagnoseDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      patient: false,
      medicineNum: 1,
      showAllergy: false,
    };
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    const { patientID } = this.props.params;
    const patient = dumpPatients().find(p => p.hospitalID === patientID);
    this.setState({ patient });
  }

  save() {
    console.log('yo');
  }

  renderMedicineSelectFields() {
    const fields = [];
    for (let i = 0; i < this.state.medicineNum; i += 1) {
      fields.push(<MedicineSelectField key={i} />);
    }
    return fields;
  }

  renderAllergy() {
    return this.state.patient.allergy.map((a, i) => (
      <MedicineList
        no={i + 1}
        name={a.name}
        id={a.id}
        isAllergy
        info={a.info}
      />
    ));
  }

  render() {
    const { patient, showAllergy } = this.state;
    if (!patient) {
      return <div>Loading..</div>;
    }
    return (
      <div className="template" id="patient-history">
        <div className="header-wrapper">
          <div className="left">
            บันทึกการวินิจฉัยโรคของแพทย์
          </div>
          <div className="right">
          </div>
        </div>
        <div className="content-wrapper">
          <div className="users-wrapper">
            <UserCard
              src={patient.image}
              name={`ผู้ป่วย${patient.name} ${patient.surename}`}
              surename={patient.surename}
              detail={`เลขประจำตัวโรงพยาบาล ${patient.hospitalID}`}
            />
          </div>
          <div className="datepicker-wrapper" style={{ position: 'relative' }}>
            <div style={{ marginBottom: '20px' }}>
              <TextField
                floatingLabelText="ผลการวินิจฉัย"
                ref={(input) => { this.diagnose = input; }}
                multiLine
                rows={2}
              />
              { this.renderMedicineSelectFields() }
              {showAllergy ?
                <div style={{ margin: '20px 0' }}>
                  {this.renderAllergy()}
                </div>
                : ''
              }
              <RaisedButton
                label="+ เพิ่มยา"
                onClick={() => this.setState({ medicineNum: this.state.medicineNum + 1 })}
                style={{ margin: '30px 10px 10px 0' }}
              />
              <RaisedButton
                label="- ลดยา"
                onClick={() => {
                  if (this.state.medicineNum > 1) {
                    this.setState({ medicineNum: this.state.medicineNum - 1 });
                  }
                }}
                style={{ margin: '30px 10px 10px 0' }}
              />
              <RaisedButton
                label={showAllergy ? 'ซ่อนรายการแพ้ยา' : 'แสดงรายการแพ้ยา'}
                onClick={() => this.setState({ showAllergy: !showAllergy })}
                style={{ margin: '30px 10px 10px 0' }}
              />
            </div>
          </div>
          <div>
            <RaisedButton
              label="ย้อนกลับ"
              backgroundColor="#95a5a6"
              labelColor="#fff"
              onClick={() => this.props.router.goBack()}
            />
            <RaisedButton
              label="บันทึก"
              backgroundColor="#2ecc71"
              labelColor="#fff"
              style={{ float: 'right' }}
              onClick={this.save}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DiagnoseDoctor);
