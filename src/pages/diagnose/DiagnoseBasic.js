import React, { Component } from 'react';
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import UserCard from '../../components/UserCard';
import { dumpPatients } from '../../dummyData';

class DiagnoseBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      patient: false,
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

  render() {
    const { patient } = this.state;
    if (!patient) {
      return <div>Loading..</div>;
    }
    return (
      <div className="template" id="patient-history">
        <div className="header-wrapper">
          <div className="left">
            บันทึกการวินิจฉัยโรคเบื้องต้น
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
            <TextField
              floatingLabelText="ความดันเลือด"
              ref={(input) => { this.bloodPressure = input; }}
            />
            <TextField
              floatingLabelText="น้ำหนัก"
              ref={(input) => { this.weight = input; }}
            />
            <TextField
              floatingLabelText="ส่วนสูง"
              ref={(input) => { this.height = input; }}
            />
            <TextField
              floatingLabelText="ผลการวินิจฉัย"
              ref={(input) => { this.diagnose = input; }}
              multiLine={true}
              rows={2}
              rowsMax={4}
            />
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

export default withRouter(DiagnoseBasic);
