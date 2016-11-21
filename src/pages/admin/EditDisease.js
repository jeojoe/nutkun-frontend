import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Loading from '../../components/Loading';
import DiseaseListEdit from '../../components/DiseaseListEdit';

class EditDisease extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDiseases: null,
      openNew: false,
      name: '',
      ICD10: '',
      info: '',
      loading: true,
    };
    this.new = this.new.bind(this);
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

  new() {
    const { name, info, ICD10 } = this.state;
    axios.post('https://nutkun.himikorin.com:4443/api/disease', { name, info, ICD10 })
    .then(function (response) {
      this.setState({ openNew: false });
      console.log(response);
      alert('เพิ่มโรคเรียบร้อย !');
    })
    .catch(function (error) {
      console.log(error);
      alert('เกิดข้อผิดพลาด !');
    });
  }

  render() {
    if (this.state.loading) return <Loading />;
    const { name, info, ICD10 } = this.state;
    const actions = [
      <RaisedButton
        label="ยกเลิก"
        backgroundColor="#95a5a6"
        labelColor="#fff"
        style={{ float: 'left', margin: '10px' }}
        onTouchTap={() => this.setState({ openNew: false })}
      />,
      <RaisedButton
        label="สร้างยา"
        backgroundColor="#2ecc71"
        labelColor="#fff"
        style={{ margin: '10px' }}
        onTouchTap={this.new}
      />,
    ];
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
          <RaisedButton
            label="+ เพิ่มโรค"
            backgroundColor="#e67e22"
            labelColor="#fff"
            style={{ float: 'right' }}
            onClick={() => this.setState({ openNew: true })}
          />
        </div>
        <Dialog
          title="เพิ่มโรค"
          actions={actions}
          modal={false}
          open={this.state.openNew}
        >
          <TextField
            defaultValue={name}
            floatingLabelText="ชื่อสามัญ"
            ref={(input) => { this.name = input; }}
            onChange={(e, v) => {
              this.setState({ name: v });
            }}
          />
          <br />
          <TextField
            defaultValue={ICD10}
            floatingLabelText="รหัส ICD10"
            ref={(input) => { this.ICD10 = input; }}
            onChange={(e, v) => {
              this.setState({ ICD10: v });
            }}
          />
          <br />
          <TextField
            defaultValue={info}
            floatingLabelText="สรรพคุณ"
            ref={(input) => { this.info = input; }}
            onChange={(e, v) => {
              this.setState({ info: v });
            }}
          />
          <br />
        </Dialog>
      </div>
    );
  }
}

export default EditDisease;
