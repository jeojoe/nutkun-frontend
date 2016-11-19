
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Calendar from 'material-ui/DatePicker/Calendar';
import Dialog from 'material-ui/Dialog';
import areIntlLocalesSupported from 'intl-locales-supported';
import UserCard from '../../components/UserCard';
import { dumpDoctors, dumpPeriods, dumpAppointed, dumpPatients } from '../../dummyData';
import { insertAppoint, checkAppoint } from '../../dummyAPI';

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
      openDone: false,
      errorMessage: '',
    };
    this.renderPeriods = this.renderPeriods.bind(this);
    this.checkAppoint = this.checkAppoint.bind(this);
    this.saveAppoint = this.saveAppoint.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changePeriod = this.changePeriod.bind(this);
  }

  componentWillMount() {
    // eslint-disable-next-line
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

  checkAppoint() {
    const pickedDate = this.calendar.state.selectedDate;
    const { doctor, patient, period } = this.state;
    const result = checkAppoint(doctor.hospitalID, patient.hospitalID, pickedDate, period);
    if (!result.success) {
      this.setState({
        openFail: true,
        errorMessage: result.message,
      });
    } else {
      this.setState({
        openSuccess: true,
        errorMessage: result.message,
      });
    }
  }

  saveAppoint() {
    console.log('yoo');
    const pickedDate = this.calendar.state.selectedDate;
    const { doctor, patient, period } = this.state;
    const result = insertAppoint(doctor, patient, pickedDate, period);
    if (result.success) {
      this.setState({
        openSuccess: false,
        openDone: true,
        errorMessage: result.message,
      });
    }
  }

  changePeriod(value) {
    this.state.periods.map(period => {
      if (period.id === value) {
        this.setState({ period });
      }
    });
  }

  handleClose() {
    this.setState({ openFail: false });
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
    const { doctor, patient, appointment, period, openFail, openSuccess, openDone, errorMessage } = this.state;
    const { role } = this.props.currentUser;
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
        onTouchTap={this.saveAppoint}
        style={{ margin: '15px' }}
      />,
    ];
    const doneActions = [
      <RaisedButton
        label="ย้อนกลับไปที่หน้าหลัก"
        backgroundColor="#95a5a6"
        labelColor="#fff"
        onTouchTap={() => this.props.router.push(`/${role}`)}
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
                shouldDisableDate={(date) => {
                  return moment().isAfter(date, 'day');
                }}
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
            onClick={this.checkAppoint}
          />
        </div>
        <Dialog
          title="ล้มเหลว !"
          actions={failedActions}
          modal={false}
          open={openFail}
          onRequestClose={this.handleClose}
        >
          {errorMessage}
        </Dialog>
        <Dialog
          title="สำเร็จ !"
          actions={successActions}
          modal={false}
          open={openSuccess}
        >
          {errorMessage}
        </Dialog>
        <Dialog
          title="ทำนัดเรียบร้อย !"
          actions={doneActions}
          modal={false}
          open={openDone}
        >
          {errorMessage}
        </Dialog>
      </div>
    );
  }
}

export default withRouter(AppointChooseDate);
