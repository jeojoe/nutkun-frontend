import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import './MedicineList.css';

class MedicineListEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      info: '',
    };
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    const { name, info } = this.props;
    this.setState({ name, info });
  }
  save() {
    const { name, info } = this.state;
    axios.put(`https://nutkun.himikorin.com:4443/api/medicine/${this.props.id}`, { name, info })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      alert('เกิดข้อผิดพลาด !');
    });
    this.setState({ open: false });
  }

  render() {
    const { no, id } = this.props;
    const { name, info } = this.state;
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
        <h6 className="name">รหัสยา : {id} | ชื่อยา : {name}</h6>
        <div>
          <sub>รายละเอียด : {info}</sub>
        </div>
        <RaisedButton
          label="แก้ไข"
          backgroundColor="#3498db"
          labelColor="#fff"
          onClick={() => this.setState({ open: true })}
          style={{ position: 'absolute', top: '16px', right: '30px' }}
        />
        <Dialog
          title="แก้ไขข้อมูลยา"
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
          {/*
          <TextField
            defaultValue={id}
            floatingLabelText="รหัสยา"
            ref={(input) => { this.id = input; }}
          />
          */}
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

export default MedicineListEdit;
