import React, { Component } from 'react';
import Chart from 'chart.js';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { dumpDatasets } from '../../dummyData';

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasets: null,
      graphStyle: 'line',
    };
    this.handleGraphStyleChange = this.handleGraphStyleChange.bind(this);
  }

  componentWillMount() {
    const datasets = dumpDatasets();
    this.setState({ datasets });
  }

  componentDidMount() {
    let ctx = document.getElementById('myChart').getContext('2d');
    // eslint-disable-next-line
    var myChart = new Chart(ctx, {
      type: this.state.graphStyle,
      data: {
        labels: ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์'],
        datasets: this.state.datasets,
      },
    });
  }

  handleGraphStyleChange(a, b, value) {
    const oldChart = document.getElementById('myChart');
    const newChart = document.createElement('canvas');
    newChart.id = 'myChart';
    oldChart.parentNode.replaceChild(newChart, oldChart);
    const ctx = document.getElementById('myChart').getContext('2d');
    // eslint-disable-next-line
    var myChart = new Chart(ctx, {
      type: value,
      data: {
        labels: ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์'],
        datasets: this.state.datasets,
      },
    });
    this.setState({ graphStyle: value });
  }

  render() {
    return (
      <div className="template" id="patient-print">
        <div className="header-wrapper">
          <div className="left">
            ออกรายงานผู้ใช้ระบบ
          </div>
          <div className="right">
          </div>
        </div>
        <div className="content-wrapper">
          <p className="head-text">รายงานผู้ใช้ระบบแต่ละวัน</p>
          <div style={{ minHeight: '550px' }}>
            <canvas id="myChart" />
            <div style={{ textAlign: 'center' }}>
              <SelectField
                floatingLabelText="รูปแบบกราฟ"
                value={this.state.graphStyle}
                onChange={this.handleGraphStyleChange}
              >
                <MenuItem value="line" primaryText="กราฟ" />
                <MenuItem value="bar" primaryText="แผนภูมิแท่ง" />
              </SelectField>
            </div>
          </div>
          <RaisedButton
            label="ย้อนกลับ"
            backgroundColor="#95a5a6"
            labelColor="#fff"
            onClick={() => this.props.router.goBack()}
          />
          <RaisedButton
            label="พิมพ์รายงาน"
            backgroundColor="#e67e22"
            labelColor="#fff"
            style={{ float: 'right' }}
            onClick={() => window.print()}
          />
        </div>
      </div>
    );
  }
}

export default Report;
