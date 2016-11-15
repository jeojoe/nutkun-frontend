import React, { Component } from 'react';
import { withRouter } from 'react-router';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { dumpDoctors } from '../../dummyData';
import UserCard from '../../components/UserCard';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

class Schedule extends Component {
  constructor(props) {
    super(props);
  }
  getDoctor(id) {
    const doctors = dumpDoctors();
    console.log('dump!');
    return doctors.find(d => d.hospitalID === id);
  }
  render() {
    let { currentUser, params: { doctorID } } = this.props;
    if (currentUser.hospitalID !== doctorID || currentUser.role !== 'doctor') {
      currentUser = this.getDoctor(doctorID);
    }

    const myEventsList = [
      {
        title: 'All Day Event',
        allDay: true,
        start: new Date(2015, 3, 0),
        end: new Date(2015, 3, 0),
      },
    ];

    return (
      <div className="template" id="patient-">
        <div className="header-wrapper">
          <div className="left">
            จัดตารางออกตรวจแพทย์
          </div>
          <div className="right">
          </div>
        </div>
        <div className="content-wrapper">
          <p className="head-text">ตารางออกตรวจของนายแพทย์{`${currentUser.name} ${currentUser.surename}`}</p>
          <div style={{ marginBottom: '20px' }}>
            <div className="users-wrapper">
              <UserCard
                src={currentUser.image}
                name={`นายแพทย์${currentUser.name} ${currentUser.surename}`}
                surename={currentUser.surename}
                detail={`แผนก${currentUser.department}`}
              />
            </div>
            <div className="datepicker-wrapper">
              <BigCalendar
                events={myEventsList}
                startAccessor="startDate"
                endAccessor="endDate"
                timeslots={10}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Schedule);
