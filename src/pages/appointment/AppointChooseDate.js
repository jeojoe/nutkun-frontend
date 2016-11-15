import React, { Component } from 'react';
import { withRouter } from 'react-router';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Calendar from 'material-ui/DatePicker/Calendar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import areIntlLocalesSupported from 'intl-locales-supported';
import UserCard from '../../components/UserCard';
import { dumpDoctors, dumpPeriods, dumpAppointed, dumpPatients } from '../../dummyData';

let DateTimeFormat;

if (areIntlLocalesSupported(['th', 'th-TH'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
}

class AppointChooseDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: false,
      patient: false,
      appointment: false,
      period: false,
      periods: [],
      allAppointments: [],
      openSuccess: false,
      openFail: false,
      selectedDate: '',
      selectedPeriod: '',
    };
    this.renderPeriods = this.renderPeriods.bind(this);
    this.checkIsFree = this.checkIsFree.bind(this);
    this.handleCloseFail = this.handleCloseFail.bind(this);
    this.handleCloseSuccess = this.handleCloseSuccess.bind(this);
    this.changePeriod = this.changePeriod.bind(this);
  }

  componentWillMount() {
    let { params: { doctorID, patientID, appointmentID } } = this.props;
    const allAppointments = dumpAppointed();
    const allPatients = dumpPatients();
    const allDoctors = dumpDoctors();
    const periods = dumpPeriods();

    let appointment;
    let patient;
    let doctor;

    allAppointments.forEach(app => {
      if (app.id === appointmentID) {
        appointment = app;
      }
    });

    if (!doctorID || !patientID) {
      doctorID = appointment.doctor.hospitalID;
      patientID = appointment.patient.hospitalID;
    }

    allPatients.forEach(pat => {
      if (pat.hospitalID === patientID) {
        patient = pat;
      }
    });

    allDoctors.forEach(doc => {
      if (doc.hospitalID === doctorID) {
        doctor = doc;
      }
    });

    this.setState({ appointment, patient, doctor, periods, allAppointments, period: appointment ? appointment.period : { id: '1', name: 'ช่วงเช้า' } });
  }

  checkIsFree() {
    const pickedDate = this.calendar;
    let isFailed = false;
    this.state.allAppointments.map((date) => {
      const isSame = moment(pickedDate.state.selectedDate).isSame(date.datetime, 'day');
      if (isSame) {
        this.setState({
          openFail: true,
          selectedDate: pickedDate.state.selectedDate,
        });
        isFailed = true;
      }
    });
    if (!isFailed) this.setState({
      openSuccess: true,
      selectedDate: pickedDate.state.selectedDate,
    });
  }

  handleCloseFail() {
    this.setState({ openFail: false });
  }

  handleCloseSuccess() {
    this.setState({ openSuccess: false });
  }

  changePeriod(value) {
    this.state.periods.map(period => {
      if (period.id === value) {
        this.setState({ period });
      }
    });
  }

  renderPeriods() {
    return this.state.periods.map(p => (
      <RadioButton
        value={p.id}
        label={p.name}
        key={p.id}
      />
    ));
  }

  render() {
    const { doctor, patient, appointment, period, openFail, openSuccess, selectedDate } = this.state;
    const failedActions = [
      <RaisedButton
        label="เลือกเวลานัดใหม่"
        backgroundColor="#95a5a6"
        keyboardFocused
        labelColor="#fff"
        onTouchTap={() => this.setState({ openFail: false })}
        style={{ margin: '15px' }}
      />,
    ];
    const successActions = [
      <RaisedButton
        label="เลือกเวลานัดใหม่"
        backgroundColor="#95a5a6"
        labelColor="#fff"
        onTouchTap={() => this.setState({ openSuccess: false })}
        style={{ margin: '15px' }}
      />,
      <RaisedButton
        label="ยืนยันการนัดแพทย์"
        backgroundColor="#2ecc71"
        keyboardFocused
        labelColor="#fff"
        onTouchTap={this.handleCloseSuccess}
        style={{ margin: '15px' }}
      />,
    ];

    return (
      <div className="template" id="patient-appoint-choose-date">
        <div className="header-wrapper">
          <div className="left">
            เพิ่มนัดแพทย์
          </div>
          <div className="right">
          </div>
        </div>
        <div className="content-wrapper">
          <p className="head-text">กรุณาเลือกวันและเวลาที่ต้องการนัด</p>
          <div style={{ marginBottom: '20px' }}>
            <div className="users-wrapper">
              <UserCard
                src={doctor.image}
                name={`นายแพทย์${doctor.name} ${doctor.surename}`}
                surename={doctor.surename}
                detail={`แผนก${doctor.department}`}
              />
              <UserCard
                src={patient.image}
                name={`ผู้ป่วย${patient.name} ${patient.surename}`}
                surename={patient.surename}
                detail={`รหัส${patient.hospitalID}`}
              />
            </div>
            <div className="datepicker-wrapper">
              <RadioButtonGroup
                name="periods" defaultSelected={period.id}
                onChange={(e, value) => {
                  this.changePeriod(value);
                }}
              >
                {this.renderPeriods()}
              </RadioButtonGroup>
              <Calendar
                firstDayOfWeek={1}
                DateTimeFormat={DateTimeFormat}
                defaultDate={appointment ? appointment.datetime : false}
                locale="th"
                formatDate={new DateTimeFormat('th', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                }).format}
                style={{ width: '100%' }}
                ref={(input) => { this.calendar = input; }}
              />
            </div>
          </div>
          <RaisedButton
            label="ย้อนกลับ"
            backgroundColor="#95a5a6"
            labelColor="#fff"
            onClick={() => this.props.router.goBack()}
          />
          <RaisedButton
            label="ตรวจสอบเวลานัด"
            backgroundColor="#e67e22"
            labelColor="#fff"
            style={{ float: 'right' }}
            onClick={this.checkIsFree}
          />
        </div>
        <Dialog
          title="ล้มเหลว !"
          actions={failedActions}
          modal={false}
          open={openFail}
          onRequestClose={this.handleCloseFail}
        >
          {`ไม่สามารถนัดแพทย์ได้ในวันที่ ${moment(selectedDate).format('LL')} (${period.name})`}
        </Dialog>
        <Dialog
          title="สำเร็จ !"
          actions={successActions}
          modal={false}
          open={openSuccess}
          onRequestClose={this.handleCloseSuccess}
        >
          {`สามารถนัดแพทย์ได้ในวันที่ ${moment(selectedDate).format('LL')} (${period.name})`}
        </Dialog>
      </div>
    );
  }
}

export default withRouter(AppointChooseDate);
