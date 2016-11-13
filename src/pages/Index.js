import React, { Component } from 'react';
import { Link } from 'react-router';
import './Index.css';

class Index extends Component {
  constructor(props) {
    super(props);
    this.indexButtons = {
      patient: [
        { name: 'เพิ่มนัดแพทย์', path: '/patient/appoint' },
        { name: 'ยกเลิก/เลื่อนนัดแพทย์', path: '/patient/appoint-option' },
        { name: 'พิมพ์ใบนัดแพทย์', path: '/patient/print' },
        { name: 'ข้อมูลส่วนตัวผู้ป่วย', path: '/patient/history' },
      ],
      doctor: [
        { name: 'เพิ่มนัดผู้ป่วย', path: '/doctor/appoint' },
        { name: 'ยกเลิก/เลื่อนนัดผู้ป่วย', path: '/doctor/appoint-option' },
        { name: 'ดูข้อมูลผู้ป่วย', path: '/doctor/history' },
        { name: 'จัดตารางออกตรวจ', path: '/doctor/schedule' },
        { name: 'บันทึกการวินิจฉัยโรค', path: '/doctor/diagnose' },
      ],
    };
  }
  renderButtons(buttons) {
    return buttons.map((btn, i) => (
      <div>
        <Link
          className="btn"
          to={btn.path}
          key={i}
        >{btn.name}</Link>
      </div>
    ));
  }
  render() {
    const { location, currentUser } = this.props;
    const role = location.pathname.replace(/\//g, '');

    return (
      <div className="container">
        <div id="index">
          <p>{`สวัสดี${currentUser.roleText + currentUser.firstname}, ไม่ทราบว่าต้องการทำอะไรครับ`}</p>
          {this.renderButtons(this.indexButtons[role])}
        </div>
      </div>
    );
  }
}

export default Index;
