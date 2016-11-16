import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import './MedicineList.css';

class MedicineListEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  save() {
    this.setState({ open: false });
  }
  render() {
    const { no, name, id, info } = this.props;
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
        <h6 className="name">ชื่อยา : {name}</h6>
        <p>รหัสยา : {id}</p>
        <div>
          <sub>รายละเอียด : {info}</sub>
        </div>
        <div style={{ marginTop: '20px' }}>
          <RaisedButton
            label="แก้ไข"
            backgroundColor="#3498db"
            labelColor="#fff"
            onClick={() => this.setState({ open: true })}
          />
        </div>
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
          />
          <br />
        </Dialog>
      </div>
    );
  }
}

export default MedicineListEdit;
