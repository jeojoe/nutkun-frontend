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
    const username = this.hn.value;
    const password = this.password.value;
    if (!username || !password) {
      alert('กรุณากรอก username หรือ password');
      return;
    }
    // Temp login logic determining role
    let user = {
      name: 'จิรัฐ',
      surename: 'อ้นอารี',
      id: '9999',
      role: username,
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
        this.props.authUser(user, () => {
          this.props.router.push('/nurse');
        });
        break;
      case 'staff':
        user.role = 'staff';
        this.props.authUser(user, () => {
          this.props.router.push('/staff');
        });
        break;
      case 'pharmacist':
        user.role = 'pharmacist';
        this.props.authUser(user, () => {
          this.props.router.push('/pharmacist');
        });
        break;
      case 'admin':
        user.role = 'admin';
        this.props.authUser(user, () => {
          this.props.router.push('/admin');
        });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div id="auth">
        <h4>โรงพยาบาลอาจารย์ธาราทิพย์</h4>
        <img src={logo} role="presentation" className="logo" />
        <div className="fields">
          <input
            type="text"
            placeholder="เลขประจำตัวโรงพยาบาล"
            ref={(c) => { this.hn = c; }}
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
          style={{ marginTop: '10px' }}
          onClick={() => this.props.router.push('/forgot')}
        />
      </div>
    );
  }
}

Auth.propTypes = {
  authUser: PropTypes.func,
};

export default withRouter(Auth);
