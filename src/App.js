import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isforget: false,
    };
  }

  login() {

  }

  register() {

  }
  render() {
    return (
      <div className="App">
        <AppBar
          title="NUTKUN"
        />
        <h1>hi you mother fucker</h1>
      </div>
    );
  }
}

export default App;
