import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import logo from '../logo-small.png';
import './index.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    // Login api
    const username = this.username.value;
    const password = this.password.value;
    console.log(username, password);
    if (!username || !password) {
      alert('กรุณากรอก username หรือ password');
      return;
    }
    // Temp login logic determining role
    let user = {
      firstname: 'จิรัฐ',
      lastname: 'อ้นอารี',
      hnNumber: '9999',
      role: 'patient',
    };

    switch (username) {
      case 'patient':
        user.role = 'patient';
        this.props.authUser(user, () => {
          this.props.router.push('/patient');
        });
        break;
      case 'doctor':
        user.role = 'doctor';
        this.props.authUser(user, () => {
          this.props.router.push('/doctor');
        });
        break;
      case 'nurse':
        user.role = 'nurse';
        break;
      case 'staff':
        user.role = 'staff';
        break;
      case 'pharmacist':
        user.role = 'pharmacist';
        break;
      case 'admin':
        user.role = 'admin';
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div id="auth">
        <img src={logo} role="presentation" className="logo" />
        <div className="fields">
          <input
            type="text"
            placeholder="ชื่อผู้ใช้งาน"
            ref={(c) => { this.username = c; }}
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            ref={(c) => { this.password = c; }}
          />
        </div>
        <RaisedButton
          label="เข้าสู่ระบบ"
          backgroundColor="#1ABC9C"
          // buttonStyle={{ borderRadius: '8px' }}
          labelColor="#fff"
          className="login-btn"
          onClick={this.login}
        />
        <FlatButton
          label="ลืมรหัสผ่าน"
          className="forgot-btn"
        />
      </div>
    );
  }
}

Auth.propTypes = {
  authUser: PropTypes.func,
};

export default withRouter(Auth);
