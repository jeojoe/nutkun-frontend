import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import Loading from '../../components/Loading';
import DiseaseListEdit from '../../components/DiseaseListEdit';

class EditDisease extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDiseases: null,
      loading: true,
    };
  }

  componentDidMount() {
    axios.get('https://nutkun.himikorin.com:4443/api/disease')
    .then(res => {
      const allDiseases = res.data.data;
      this.setState({ allDiseases, loading: false });
    });
  }

  renderDiseases() {
    return this.state.allDiseases.map((m, i) => (
      <DiseaseListEdit
        no={i}
        name={m.name}
        id={m.diseaseID}
        key={m._id}
        info={m.info}
        ICD10={m.ICD10}
      />
    ));
  }
  render() {
    if (this.state.loading) return <Loading />;
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
          <div style={{ marginBottom: '50px' }}>
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
