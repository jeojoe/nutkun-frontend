import React, { Component } from 'react';
import classNames from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notMatch: false,
    };
    this.confirm = this.confirm.bind(this);
  }

  confirm() {
    const password1 = this.password1.value;
    const password2 = this.password2.value;
    if (!password1 || !password2) {
      alert('กรุณากรอกรหัสให้ครบถ้วน');
      return;
    }
    console.log('confirm');
  }

  render() {
    const { notMatch } = this.state;
    return (
      <div id="auth">
        <h4>ตั้งรหัสผ่านใหม่</h4>
        <div className="fields">
          <input
            type="password"
            placeholder="รหัสผ่าน"
            ref={(c) => { this.password1 = c; }}
            onChange={(e) => {
              if (this.password2.value !== '' && e.target.value !== this.password2.value) {
                this.setState({ notMatch: true });
              } else {
                this.setState({ notMatch: false });
              }
            }}
          />
          <input
            className={classNames({ matcherror: notMatch })}
            type="password"
            placeholder="รหัสผ่านเดิมอีกครั้ง"
            ref={(c) => { this.password2 = c; }}
            onChange={(e) => {
              if (e.target.value !== this.password1.value) {
                this.setState({ notMatch: true });
              } else {
                this.setState({ notMatch: false });
              }
            }}
          />
        </div>
        <RaisedButton
          disabled={notMatch}
          label={notMatch ? 'รหัสไม่ตรงกัน' : 'ยืนยัน'}
          backgroundColor="#1ABC9C"
          // buttonStyle={{ borderRadius: '8px' }}
          labelColor="#fff"
          className="login-btn"
          onClick={this.confirm}
        />
      </div>
    );
  }
}

export default ChangePassword;
