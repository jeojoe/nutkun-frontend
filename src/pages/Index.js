import React, { Component } from 'react';
import { Link } from 'react-router';
import './Index.css';

class Index extends Component {
  renderButtons(buttons) {
    return buttons.map((btn, i) => (
      <div key={i} >
        <Link
          className="btn"
          to={btn.path}
        >{btn.name}</Link>
      </div>
    ));
  }
  render() {
    const { location, currentUser } = this.props;
    const role = location.pathname.replace(/\//g, '');

    const indexButtons = {
      patient: [
        { name: 'เพิ่มนัดแพทย์', path: `/patient/appoint/${currentUser.hospitalID}` },
        { name: 'ยกเลิก/เลื่อนนัดแพทย์', path: '/reappoint' },
        { name: 'พิมพ์ใบนัดแพทย์', path: '/print' },
        { name: 'ข้อมูลส่วนตัวผู้ป่วย', path: `/patient/history/${currentUser.hospitalID}` },
      ],
      doctor: [
        { name: 'เพิ่มนัดผู้ป่วย', path: `/doctor/appoint/${currentUser.hospitalID}` },
        { name: 'ยกเลิก/เลื่อนนัดผู้ป่วย', path: '/reappoint' },
        { name: 'ดูข้อมูลผู้ป่วย', path: '/doctor/history' },
        { name: 'จัดตารางออกตรวจ', path: `/schedule/${currentUser.hospitalID}` },
        { name: 'บันทึกการวินิจฉัยโรค', path: '/doctor/diagnose' },
      ],
      nurse: [
        { name: 'เพิ่มนัดแพทย์', path: '/nurse/appoint' },
        { name: 'ยกเลิก/เลื่อนนัดแพทย์', path: '/reappoint' },
        { name: 'ดูข้อมูลผู้ป่วย', path: '/nurse/history' },
        { name: 'บันทึกการวินิจฉัยเบื้องต้น', path: '/nurse/diagnose' },
        { name: 'พิมพ์ใบนัดแพทย์', path: '/print' },
      ],
      staff: [
        { name: 'เพิ่มนัดแพทย์', path: '/staff/appoint' },
        { name: 'ยกเลิก/เลื่อนนัดแพทย์', path: '/reappoint' },
        { name: 'จัดตารางออกตรวจแพทย์', path: '/schedule' },
        { name: 'พิมพ์ใบนัดแพทย์', path: '/print' },
      ],
      admin: [
        { name: 'แก้ไขข้อมูลยา', path: '/admin/medicine' },
        { name: 'แก้ไขข้อมูลโรค', path: '/admin/disease' },
        { name: 'จัดการข้อมูลบุคลากร', path: '/admin/personnal' },
        { name: 'ออกรายงานผู้ใช้ระบบ', path: '/admin/report' },
      ],
    };

    return (
      <div className="container">
        <div id="index">
          <p>{`สวัสดี${currentUser.roleText + currentUser.name}, ไม่ทราบว่าต้องการทำอะไรครับ`}</p>
          {this.renderButtons(indexButtons[role])}
        </div>
      </div>
    );
  }
}

export default Index;
