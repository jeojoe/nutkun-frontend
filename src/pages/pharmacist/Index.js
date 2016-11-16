import React, { Component } from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import PrescriptionList from '../../components/PrescriptionList';
import { dumpPrescriptions } from '../../dummyData';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPrescriptions: null,
    };
    this.getAllPrescriptions = this.getAllPrescriptions.bind(this);
  }

  componentWillMount() {
    this.getAllPrescriptions();
  }

  getAllPrescriptions() {
    const allPrescriptions = dumpPrescriptions();
    this.setState({ allPrescriptions });
  }

  renderPrescriptions() {
    return this.state.allPrescriptions.map((p, i) => (
      <PrescriptionList
        key={i}
        no={i}
        patient={p.patient}
        prescription={p}
      />
    ));
  }

  render() {
    return (
      <div className="template" id="pharmacist-index">
        <div className="header-wrapper">
          <div className="left">
            รายการจ่ายยาผู้ป่วย
          </div>
          <div className="right">
          </div>
        </div>
        <div className="content-wrapper">
          <p className="head-text">รายการจ่ายยาทั้งหมด</p>
          <div>
            {this.renderPrescriptions()}
          </div>
          <RaisedButton
            label="ย้อนกลับ"
            backgroundColor="#95a5a6"
            labelColor="#fff"
            onClick={() => this.props.router.goBack()}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Index);
