import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DiseaseListEdit from '../../components/DiseaseListEdit';
import { dumpDiseases } from '../../dummyData';

class EditDisease extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDiseases: null,
    };
    this.getDiseases = this.getDiseases.bind(this);
  }

  componentWillMount() {
    this.getDiseases();
  }

  getDiseases() {
    const allDiseases = dumpDiseases();
    this.setState({ allDiseases });
  }

  renderDiseases() {
    return this.state.allDiseases.map((m, i) => (
      <DiseaseListEdit
        no={i}
        name={m.name}
        id={m.id}
        info={m.info}
        ICD10={m.ICD10}
      />
    ));
  }
  render() {
    return (
      <div className="template" id="patient-print">
        <div className="header-wrapper">
          <div className="left">
            แก้ไขข้อมูลโรค
          </div>
          <div className="right">
          </div>
        </div>
        <div className="content-wrapper">
          <p className="head-text">รายการโรคทั้งหมด</p>
          <div>
            { this.renderDiseases() }
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

export default EditDisease;
