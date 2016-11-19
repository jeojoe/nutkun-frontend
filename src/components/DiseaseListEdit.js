import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import './MedicineList.css';

class DiseaseListEdit extends Component {
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
    // eslint-disable-next-line
    const { no, name, id, info, ICD10 } = this.props;
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
        <h6 className="name">ชื่อโรค : {name}</h6>
        <p>รหัส ICD10 : {ICD10}</p>
        <div>
          <sub>อาการ : {info}</sub>
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
          title="แก้ไขข้อมูลโรค"
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
          <TextField
            defaultValue={ICD10}
            floatingLabelText="รหัส ICD10"
            ref={(input) => { this.ICD10 = input; }}
          />
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

export default DiseaseListEdit;
