import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import { dumpMedicines } from '../dummyData';

class MedicineSelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicine: '1',
      allMedicines: null,
      amount: 1,
    };
  }

  componentWillMount() {
    const allMedicines = dumpMedicines();
    this.setState({ allMedicines });
  }

  renderMedicineItems() {
    return this.state.allMedicines.map(med => (
      <MenuItem value={med.id} primaryText={med.name} key={med.id} />
    ));
  }
  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="ยา"
          value={this.state.medicine}
          onChange={(e, i, value) => this.setState({ medicine: value })}
        >
          {this.renderMedicineItems()}
        </SelectField>
        <TextField
          floatingLabelText="จำนวน"
          defaultValue="1"
          style={{ display: 'inline-block', width: '120px', margin: '0 20px', padding: '5px 0' }}
        />
      </div>
    );
  }
}

export default MedicineSelectField;
