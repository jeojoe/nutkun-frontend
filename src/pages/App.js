import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';
import logo from './logo-small.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
    this.authUser = this.authUser.bind(this);
  }

  authUser(user, callback) {
    this.setState({
      currentUser: user,
    }, callback());
  }

  render() {
    const { children, router } = this.props;
    const { currentUser } = this.state;
    // no user login
    if (router.isActive('/', true)) {
      if (currentUser) router.goBack();
      else {
        return (
          <div className="app">
            { children && React.cloneElement(children, {
              authUser: this.authUser,
            })}
          </div>
        );
      }
    }

    const { firstname, lastname, role, hnNumber } = currentUser;

    let roleText = '';
    switch (role) {
      case 'patient':
        roleText = 'ผู้ป่วย';
        break;
      case 'doctor':
        roleText = 'แพทย์';
        break;
      case 'nurse':
        roleText = 'พยาบาล';
        break;
      case 'staff':
        roleText = 'เจ้าหน้าที่';
        break;
      case 'pharmacist':
        roleText = 'เภสัชกร';
        break;
      case 'admin':
        roleText = 'ผู้ดูแลระบบ';
        break;
      default:
        break;
    }

    return (
      <div className="app">
        { router.isActive('/', true) ?
          '' :
            <div id="nav">
              <div className="container">
                <div className="row">
                  <div className="twelve columns">
                    <img id="logo" src={logo} role="presentation" />
                    <div className="right">
                      <div className="user">
                        <p>{`${roleText}${firstname} ${lastname}, HN${hnNumber}`}</p>
                      </div>
                      <div className="signout">
                        <i className="fa fa-power-off" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
        <RaisedButton
          label="Primary" primary
          onClick={() => { router.push('/login'); }}
        />
        { children && React.cloneElement(children, {
          authUser: this.authUser,
        })}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  router: PropTypes.object,
};

export default withRouter(App);
