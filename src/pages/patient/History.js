import React, { Component } from 'react';
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import './History.css';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      user: false,
    };
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    this.getUserData();
  }

  getUserData() {
    this.setState({
      user: {
        name: 'จิรัฐ',
        surename: 'อ้นอารี',
        username: 'jeojoe',
        password: 'aaasd',
        birthdate: new Date(),
        address: '77/6 ม. 3 ต.บางไผ่ อ.เมือง จ.นนทบุรี',
        email: 'jirat.onaree@gmail.com',
        telNo: '0906866563',
      },
    });
  }

  edit() {
    this.setState({ editable: true });
  }

  save() {
    const { name, surename, username, password, birthdate,
      address, email, telNo } = this;
    this.setState({
      user: {
        name: name.value,
        surename: surename.value,
        username: username.value,
        password: password.value,
        birthdate: birthdate.value,
        address: address.value,
        email: email.value,
        telNo: telNo.value,
      },
      editable: false,
    });
  }

  render() {
    if (!this.state.user) {
      return <div>Loading..</div>;
    }

    const { name, surename, username, password,
      birthdate, address, email, telNo } = this.state.user;
    return (
      <div className="template" id="patient-history">
        <div className="header-wrapper">
          <div className="left">
            ข้อมูลส่วนตัวผู้ป่วย
          </div>
          <div className="right">
          </div>
        </div>
        <div className="content-wrapper">
          <div style={{ position: 'relative' }}>
            { this.state.editable ?
              ''
              :
                <div className="edit-prohibit" />
            }
            <TextField
              defaultValue={name}
              floatingLabelText="ชื่อ"
              ref={(input) => { this.name = input; }}
            />
            <TextField
              defaultValue={surename}
              floatingLabelText="นามสกุล"
              ref={(input) => { this.surename = input; }}
            />
            <TextField
              defaultValue={username}
              floatingLabelText="ชื่อผู้ใช้งาน"
              ref={(input) => { this.username = input; }}
            />
            <TextField
              defaultValue={password}
              floatingLabelText="รหัสผ่าน"
              type="password"
              ref={(input) => { this.password = input; }}
            />
            <DatePicker
              floatingLabelText="วันเกิด"
              container="inline"
              mode="landscape"
              defaultDate={birthdate}
              ref={(input) => { this.birthdate = input; }}
            />
            <TextField
              defaultValue={address}
              floatingLabelText="ที่อยู่"
              ref={(input) => { this.address = input; }}
            />
            <TextField
              defaultValue={email}
              floatingLabelText="อีเมล"
              ref={(input) => { this.email = input; }}
            />
            <TextField
              defaultValue={telNo}
              floatingLabelText="เบอร์โทรศัพท์"
              ref={(input) => { this.telNo = input; }}
            />
          </div>
          <RaisedButton
            label="ย้อนกลับ"
            backgroundColor="#95a5a6"
            labelColor="#fff"
            onClick={() => this.props.router.push('/patient')}
          />
          { this.state.editable ?
            <RaisedButton
              label="บันทึก"
              backgroundColor="#2ecc71"
              labelColor="#fff"
              style={{ float: 'right' }}
              onClick={this.save}
            />
            :
              <RaisedButton
                label="แก้ไข"
                backgroundColor="#3498db"
                labelColor="#fff"
                style={{ float: 'right' }}
                onClick={this.edit}
              />
          }
        </div>
      </div>
    );
  }
}

export default withRouter(History);
