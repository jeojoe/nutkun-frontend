import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MedicineListEdit from '../../components/MedicineListEdit';
import { dumpMedicines } from '../../dummyData';

class EditMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMedicines: null,
    };
    this.getMedicines = this.getMedicines.bind(this);
  }

  componentWillMount() {
    this.getMedicines();
  }

  getMedicines() {
    const allMedicines = dumpMedicines();
    this.setState({ allMedicines });
  }

  renderMedicines() {
    return this.state.allMedicines.map((m, i) => (
      <MedicineListEdit
        no={i}
        name={m.name}
        id={m.id}
        info={m.info}
      />
    ));
  }
  render() {
    return (
      <div className="template" id="patient-print">
        <div className="header-wrapper">
          <div className="left">
            แก้ไขข้อมูลยา
          </div>
          <div className="right">
          </div>
        </div>
        <div className="content-wrapper">
          <p className="head-text">รายการยาทั้งหมด</p>
          <div>
            { this.renderMedicines() }
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

export default EditMedicine;
