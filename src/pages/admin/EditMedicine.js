import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import Loading from '../../components/Loading';
import MedicineListEdit from '../../components/MedicineListEdit';

class EditMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMedicines: null,
      loading: true,
    };
  }

  componentDidMount() {
    axios.get('https://nutkun.himikorin.com:4443/api/medicine')
    .then(res => {
      const allMedicines = res.data.data;
      this.setState({ allMedicines, loading: false });
    });
  }

  renderMedicines() {
    return this.state.allMedicines.map((m, i) => (
      <MedicineListEdit
        no={i}
        name={m.name}
        id={m.medicineID}
        info={m.info}
        key={i}
      />
    ));
  }

  render() {
    if (this.state.loading) return <Loading />;
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
          <div style={{ marginBottom: '50px' }}>
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
