import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class DispensaryHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  renderDispenseHistory() {
    return <div>yo</div>;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        keyboardFocused
        onTouchTap={this.close}
      />,
    ];
    return (
      <div>
        <RaisedButton
          label="ประวัติจ่ายยา"
          backgroundColor="#3498db"
          labelColor="#fff"
          style={{ margin: '10px' }}
          onClick={this.open}
        />
        <Dialog
          title="ประวัติการจ่ายยา"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.close}
        >
          { this.renderDispenseHistory() }
        </Dialog>
      </div>
    );
  }
}

export default DispensaryHistory;
