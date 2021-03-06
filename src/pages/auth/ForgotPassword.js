import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: null,
      hn: null,
      telNo: null,
      openFail: false,
    };
    this.sendOTP = this.sendOTP.bind(this);
    this.checkOTP = this.checkOTP.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  sendOTP() {
    const otp = Math.floor(Math.random() * 10000).toString();
    const hn = this.hn.value;
    // send sms;
    const telNo = '0906866563';
    console.log(otp);
    this.setState({ otp, telNo, hn });
  }

  checkOTP() {
    const { otp, hn } = this.state;
    const inputOTP = this.otp.value;
    if (inputOTP === otp) {
      this.props.router.push(`/change/${hn}`);
    } else {
      this.setState({ openFail: true });
    }
  }

  handleClose() {
    this.setState({ openFail: false });
  }

  render() {
    const { otp, telNo } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
    ];

    if (!otp) {
      return (
        <div id="auth">
          <h4>กรุณากรอกเลขประจำตัว<br/>โรงพยาบาล (HN)</h4>
          <div className="fields">
            <input
              type="text"
              placeholder="เลขประจำตัวโรงพยาบาล"
              ref={(c) => { this.hn = c; }}
            />
          </div>
          <RaisedButton
            label="ส่งรหัสยืนยันไปที่โทรศัพท์"
            backgroundColor="#1ABC9C"
            // buttonStyle={{ borderRadius: '8px' }}
            labelColor="#fff"
            className="login-btn"
            onClick={this.sendOTP}
          />
          <FlatButton
            label="ย้อนกลับ"
            className="forgot-btn"
            style={{ marginTop: '10px' }}
            onClick={() => this.props.router.goBack()}
          />
        </div>
      );
    } else {
      const index = 2;
      const blindTelNo = telNo.substr(0, index) + 'xxxx' + telNo.substr(index + 4);
      return (
        <div id="auth">
          <h4>กรุณากรอกหมายเลข OTP ที่คุณได้รับ จาก SMS ที่เราส่งไปที่เบอร์ {blindTelNo}</h4>
          <div className="fields">
            <div>
              <input
                type="text"
                placeholder="หมายเลข OTP"
                ref={(c) => { this.otp = c; }}
              />
            </div>
          </div>
          <RaisedButton
            label="ยืนยัน"
            backgroundColor="#1ABC9C"
            // buttonStyle={{ borderRadius: '8px' }}
            labelColor="#fff"
            className="login-btn"
            onClick={this.checkOTP}
          />
          <Dialog
            title="ล้มเหลว"
            actions={actions}
            modal={false}
            open={this.state.openFail}
            onRequestClose={this.handleClose}
          >
            The actions in this window were passed in as an array of React objects.
          </Dialog>
        </div>
      );
    }
  }
}

export default withRouter(ForgotPassword);
