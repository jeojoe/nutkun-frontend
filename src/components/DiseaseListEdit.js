import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import './MedicineList.css';

class DiseaseListEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      ICD10: '',
      info: '',
    };
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    const { name, info, ICD10 } = this.props;
    this.setState({ name, info, ICD10 });
  }

  save() {
    const { name, info, ICD10 } = this.state;
    axios.put(`https://nutkun.himikorin.com:4443/api/disease/${this.props.id}`, { name, info, ICD10 })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      alert('เกิดข้อผิดพลาด !');
    });
    this.setState({ open: false });
  }
  render() {
    // eslint-disable-next-line
    const { no, id } = this.props;
    const { name, info, ICD10 } = this.state;
    const actions = [
      <RaisedButton
        label="ยกเลิก"
        backgroundColor="#95a5a6"
        labelColor="#fff"
        style={{ float: 'left', margin: '10px' }}
        onTouchTap={() => this.setState({ open: false })}
      />,
      <RaisedButton
        label="บันทึกการแก้ไข"
        backgroundColor="#2ecc71"
        labelColor="#fff"
        style={{ margin: '10px' }}
        onTouchTap={this.save}
      />,
    ];
    return (
      <div className="medicine-list">
        <div className="no">{parseInt(no, 10) + 1}</div>
        <h6 className="name">รหัส ICD10 : {ICD10} | ชื่อโรค : {name}</h6>
        <div>
          <sub>อาการ : {info}</sub>
        </div>
        <div>
          <RaisedButton
            label="แก้ไข"
            backgroundColor="#3498db"
            labelColor="#fff"
            onClick={() => this.setState({ open: true })}
            style={{ position: 'absolute', top: '16px', right: '30px' }}
          />
        </div>
        <Dialog
          title="แก้ไขข้อมูลโรค"
          actions={actions}
          modal={false}
          open={this.state.open}
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

export default DiseaseListEdit;
