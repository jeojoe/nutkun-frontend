import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PersonnalList from '../../components/PersonnalList';
import { dumpUsers } from '../../dummyData';

class EditPersonnal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPersonnals: null,
    };
    this.getPersonnals = this.getPersonnals.bind(this);
  }

  componentWillMount() {
    this.getPersonnals();
  }

  getPersonnals() {
    const allPersonnals = dumpUsers();
    this.setState({ allPersonnals });
  }

  renderPersonnals() {
    return this.state.allPersonnals.map((p, i) => (
      <PersonnalList
        no={i}
        name={`${p.name} ${p.surename}`}
        id={p.hospitalID}
        role={p.role}
        department={p.department}
        image={p.image}
      />
    ));
  }
  render() {
    return (
      <div className="template" id="patient-print">
        <div className="header-wrapper">
          <div className="left">
            แก้ไขข้อมูลบุคลากร
          </div>
          <div className="right">
          </div>
        </div>
        <div className="content-wrapper">
          <p className="head-text">รายการโรคทั้งหมด</p>
          <div>
            { this.renderPersonnals() }
          </div>
          <RaisedButton
            label="ย้อนกลับ"
            backgroundColor="#95a5a6"
            labelColor="#fff"
            onClick={() => this.props.router.goBack()}
          />
          <RaisedButton
            label="เพิ่มบุคลากร"
            backgroundColor="#e67e22"
            labelColor="#fff"
            style={{ float: 'right' }}
            onClick={() => this.props.router.push('/admin/personnal/-1')}
          />
        </div>
      </div>
    );
  }
}

export default EditPersonnal;
