import React, { Component } from 'react';
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import areIntlLocalesSupported from 'intl-locales-supported';
import RaisedButton from 'material-ui/RaisedButton';
import UserCard from '../../components/UserCard';
import { dumpUsers, dumpDepartments } from '../../dummyData';
import './EditPersonnal2.css';

let DateTimeFormat;

if (areIntlLocalesSupported(['th', 'th-TH'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
}

class EditPersonnal2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSeeOnly: false,
      hospitalID: 'new user',
      name: '',
      surename: '',
      department: '',
      role: 'doctor',
      email: '',
      password: '',
      telNo: '',
      gender: 'male',
      PID: '',
      address: '',
      username: '',
      image: '',
      birthdate: Date.now(),
      allDepartments: null,
    };
    this.getData = this.getData.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    this.getData();
    const path = this.props.location.pathname;
    const isDoctor = path.indexOf('/doctor') >= 0;
    const isNurse = path.indexOf('/nurse') >= 0;
    if (isDoctor || isNurse) {
      this.setState({ isSeeOnly: true });
    }
  }

  getData() {
    const { personnalID } = this.props.params;
    const allDepartments = dumpDepartments();
    console.log(allDepartments);
    // const allRoles = ['doctor', 'patient', 'nurse', 'staff', 'pharmacist', 'admin'];
    if (personnalID !== '-1') {
      const personnal = dumpUsers().find(u => u.hospitalID === personnalID);
      const { name, surename, username, password, birthdate,
      address, email, telNo, department, role, gender, PID, image } = personnal;
      this.setState({
        name,
        surename,
        department,
        role,
        email,
        password,
        telNo,
        gender,
        PID,
        address,
        username,
        image,
        birthdate,
        allDepartments,
      });
    } else {
      this.setState({
        allDepartments,
      });
    }
  }

  save() {
    // const { name, surename, username, password, birthdate,
    //   address, email, telNo, department, role, gender, PID, image } = this.state;
    // this.setState({
    //   hospitalID: 'new user',
    //   name,
    //   surename,
    //   department,
    //   role,
    //   email,
    //   password,
    //   telNo,
    //   gender,
    //   PID,
    //   address,
    //   username,
    //   image,
    //   birthdate,
    // });
  }

  renderDepartmentItems() {
    return this.state.allDepartments.map((d, i) => (
      <MenuItem value={d.name} primaryText={d.name} key={i} />
    ));
  }

  render() {
    const { name, surename, username, password, birthdate, address, email, telNo, image, role, department, isSeeOnly } = this.state;
    return (
      <div className="template" id="edit-personnal">
        <div className="header-wrapper">
          <div className="left">
            แก้ไขข้อมูลบุคลากร
          </div>
          <div className="right">
          </div>
        </div>
        <div className="content-wrapper">
          <div className="users-wrapper" style={{ textAlign: 'center' }}>
            <UserCard
              src={image}
              name={`${name} ${surename}`}
              surename={surename}
              detail={role}
            />
            <sub style={{ display: 'block' }}>{department}</sub>
          </div>
          <div className="datepicker-wrapper">
            { isSeeOnly ? <div className="prohibit-overlay" /> : '' }
            <TextField
              defaultValue={name}
              floatingLabelText="ชื่อ"
              ref={(input) => { this.name = input; }}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <TextField
              defaultValue={surename}
              floatingLabelText="นามสกุล"
              ref={(input) => { this.surename = input; }}
              onChange={e => this.setState({ surename: e.target.value })}
            />
            { role !== 'patient' && role !== 'admin' ?
              <SelectField
                floatingLabelText="ตำแหน่ง"
                value={role}
                onChange={(e, i, value) => this.setState({ role: value })}
              >
                <MenuItem value="doctor" primaryText="แพทย์" />
                <MenuItem value="patient" primaryText="ผู้ป่วย" />
                <MenuItem value="nurse" primaryText="พยาบาล" />
                <MenuItem value="staff" primaryText="เจ้าหน้าที่" />
                <MenuItem value="pharmacist" primaryText="เภสัชกร" />
                <MenuItem value="admin" primaryText="ผู้ดูแลระบบ" />
              </SelectField> : ''
            }
            { role !== 'patient' && role !== 'admin' ?
              <SelectField
                floatingLabelText="แผนก"
                value={department}
                onChange={(e, i, value) => this.setState({ department: value })}
              >
                { this.renderDepartmentItems() }
              </SelectField> : ''
            }
            <br />
            <TextField
              defaultValue={username}
              floatingLabelText="ชื่อผู้ใช้งาน"
              ref={(input) => { this.username = input; }}
              onChange={e => this.setState({ username: e.target.value })}
            />
            <TextField
              defaultValue={password}
              floatingLabelText="รหัสผ่าน"
              type="password"
              ref={(input) => { this.password = input; }}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <br />
            <DatePicker
              floatingLabelText="วันเกิด"
              firstDayOfWeek={1}
              mode="landscape"
              defaultDate={new Date(birthdate)}
              DateTimeFormat={DateTimeFormat}
              locale="th"
              formatDate={new DateTimeFormat('th', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format}
              ref={(input) => { this.birthdate = input; }}
              onChange={(e, i, value) => this.setState({ birthdate: value })}
            />
            <br />
            <SelectField
              floatingLabelText="เพศ"
              value={this.state.gender}
              onChange={(e, i, value) => this.setState({ gender: value })}
            >
              <MenuItem value="male" primaryText="ชาย" />
              <MenuItem value="female" primaryText="หญิง" />
            </SelectField>
            <br />
            <TextField
              defaultValue={address}
              floatingLabelText="ที่อยู่"
              ref={(input) => { this.address = input; }}
              onChange={e => this.setState({ address: e.target.value })}
            />
            <br />
            <TextField
              defaultValue={email}
              floatingLabelText="อีเมล"
              ref={(input) => { this.email = input; }}
              onChange={e => this.setState({ email: e.target.value })}
            />
            <br />
            <TextField
              defaultValue={telNo}
              floatingLabelText="เบอร์โทรศัพท์"
              ref={(input) => { this.telNo = input; }}
              onChange={e => this.setState({ telNo: e.target.value })}
            />
            <br />
          </div>
          <div style={{ paddingTop: '30px' }}>
            <RaisedButton
              label="ย้อนกลับ"
              backgroundColor="#95a5a6"
              labelColor="#fff"
              onClick={() => this.props.router.goBack()}
            />
            { isSeeOnly ?
              '' :
              <RaisedButton
                label="บันทึก"
                backgroundColor="#2ecc71"
                labelColor="#fff"
                style={{ float: 'right' }}
                onClick={this.save}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditPersonnal2);
