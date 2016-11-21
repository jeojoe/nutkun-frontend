import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import PersonnalList from '../../components/PersonnalList';
import Loading from '../../components/Loading';

class EditPersonnal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPersonnals: null,
      loading: true,
    };
  }

  componentDidMount() {
    axios.get('https://nutkun.himikorin.com:4443/api/user').then((res) => {
      const allPersonnals = res.data.data;
      this.setState({ allPersonnals, loading: false });
    });
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
    if (this.state.loading) return <Loading />;
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
          <p className="head-text">รายการบุคลากร</p>
          <div style={{ marginBottom: '50px' }}>
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
