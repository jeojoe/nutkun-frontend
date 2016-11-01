import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    this.props.authUser({
      firstname: 'จิรัฐ',
      lastname: 'อ้นอารี',
      hnNumber: '9999',
      role: 'patient',
    }, () => {
      this.props.router.push('/patience');
    });
  }

  render() {
    return (
      <button onClick={this.login}>You fucking fat fuck</button>
    );
  }
}

Auth.propTypes = {
  authUser: PropTypes.func,
};

export default withRouter(Auth);
