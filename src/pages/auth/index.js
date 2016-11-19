import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import logo from '../logo-small.png';
import './index.css';
import { login } from '../../dummyAPI';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    const hn = this.hn.value;
    const password = this.password.value;
    if (!hn || !password) {
      alert('กรุณากรอก รหัสโรงพยาบาล หรือ รหัสผ่าน');
      return;
    }

    const res = login(hn, password);
    if (!res.success) {
      alert(res.message);
      return;
    }

    const user = res.data;
    window.localStorage.setItem('currentUser', JSON.stringify(user));

    switch (user.role) {
      case 'patient':
        this.props.authUser(user, () => {
          this.props.router.push('/patient');
        });
        break;
      case 'doctor':
        this.props.authUser(user, () => {
          this.props.router.push('/doctor');
        });
        break;
      case 'nurse':
        this.props.authUser(user, () => {
          this.props.router.push('/nurse');
        });
        break;
      case 'staff':
        this.props.authUser(user, () => {
          this.props.router.push('/staff');
        });
        break;
      case 'pharmacist':
        this.props.authUser(user, () => {
          this.props.router.push('/pharmacist');
        });
        break;
      case 'admin':
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
