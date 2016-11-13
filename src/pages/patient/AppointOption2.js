import React, { Component } from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Calendar from 'material-ui/DatePicker/Calendar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import areIntlLocalesSupported from 'intl-locales-supported';
import UserCard from '../../components/UserCard';
import { dumpPeriods, dumpAppointed } from '../../dummyData';
import moment from 'moment';
import './Appoint2.css';

let DateTimeFormat;

if (areIntlLocalesSupported(['th', 'th-TH'])) {
  console.log('yo');
  DateTimeFormat = global.Intl.DateTimeFormat;
}

class AppointOption2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDoc: false,
      chosenPat: false,
      periods: [],
      appointedDates: [],
      openSuccess: false,
      openFail: false,
      selectedDate: '',
      selectedPeriod: '',
    };
    this.allDoctors = [];
    this.getAppointment = this.getAppointment.bind(this);
    this.renderPeriods = this.renderPeriods.bind(this);
    this.checkIsFree = this.checkIsFree.bind(this);
    this.handleCloseFail = this.handleCloseFail.bind(this);
    this.handleCloseSuccess = this.handleCloseSuccess.bind(this);
  }

  componentWillMount() {
    this.getAppointment();
  }

  getAppointment() {
    // Get doctor
    const appointments = dumpAppointed();
    let chosenAppointment = false;
    for (let i = 0; i < appointments.length; i += 1) {
      if (appointments[i].id === this.props.params.id) {
        chosenAppointment = appointments[i];
      }
    }


    const chosenDoc = chosenAppointment.doctor;
    const chosenPat = chosenAppointment.patient;

    // Get periods
    const periods = dumpPeriods();

    // Get Appointed Date
    const appointedDates = dumpAppointed();
    console.log(chosenDoc, chosenPat);
    if (!chosenDoc) {
      this.props.router.goBack();
    } else {
      this.setState({ chosenDoc, chosenPat, periods, appointedDates });
    }
  }

  checkIsFree() {
    const pickedDate = this.calendar;
    let isFailed = false;
    this.state.appointedDates.map((date) => {
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
    const { params: { id } } = this.props;
    const { chosenDoc, openFail, openSuccess, selectedDate } = this.state;
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
      <div className="template" id="patient-appoint2">
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
            <UserCard
              src={chosenDoc.image}
              name={`นายแพทย์${chosenDoc.name} ${chosenDoc.surename}`}
              surename={chosenDoc.surename}
              detail={`แผนก${chosenDoc.department}`}
            />
            <div className="datepicker-wrapper">
              <RadioButtonGroup
                name="periods" defaultSelected="1"
                onChange={(e, value) => {
                  console.log(value);
                }}
              >
                {this.renderPeriods()}
              </RadioButtonGroup>
              <Calendar
                firstDayOfWeek={1}
                DateTimeFormat={DateTimeFormat}
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
            onClick={() => this.props.router.push('/patient/appoint')}
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
          {`ไม่สามารถนัดแพทย์ได้ใน${moment(selectedDate).format('LLLL')}`}
        </Dialog>
        <Dialog
          title="สำเร็จ !"
          actions={successActions}
          modal={false}
          open={openSuccess}
          onRequestClose={this.handleCloseSuccess}
        >
          {`สามารถนัดแพทย์ได้ใน${moment(selectedDate).format('LLLL')}`}
        </Dialog>
      </div>
    );
  }
}

export default withRouter(AppointOption2);
