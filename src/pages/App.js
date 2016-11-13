import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import './App.css';
import logo from './logo-small.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
    this.authUser = this.authUser.bind(this);
    this.signout = this.signout.bind(this);
  }
  
  authUser(user, callback) {
    this.setState({
      currentUser: user,
    }, callback());
  }

  signout() {
    this.props.router.push('/');
  }

  render() {
    const { children, router } = this.props;
    let { currentUser } = this.state;
    // no user login
    if (router.isActive('/', true)) {
      return (
        <div className="app">
          { children && React.cloneElement(children, {
            authUser: this.authUser,
          })}
        </div>
      );
    }

    if (!router.isActive('/', true) && !currentUser) {
      // router.push('/');
      // return <div>no currentUser</div>;
      this.setState({
        currentUser: {
          firstname: 'จิรัฐ',
          lastname: 'อ้นอารี',
          id: '12',
          role: 'doctor',
        },
      });
      return <div></div>;
    }

    const { firstname, lastname, role, hnNumber } = currentUser;

    switch (role) {
      case 'patient':
        currentUser.roleText = 'ผู้ป่วย';
        break;
      case 'doctor':
        currentUser.roleText = 'แพทย์';
        break;
      case 'nurse':
        currentUser.roleText = 'พยาบาล';
        break;
      case 'staff':
        currentUser.roleText = 'เจ้าหน้าที่';
        break;
      case 'pharmacist':
        currentUser.roleText = 'เภสัชกร';
        break;
      case 'admin':
        currentUser.roleText = 'ผู้ดูแลระบบ';
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
                    <Link to={`/${role}`}>
                      <img id="logo" src={logo} role="presentation" />
                    </Link>
                    <div className="right">
                      <div className="user">
                        <p>{`${currentUser.roleText}${firstname} ${lastname}, HN${hnNumber}`}</p>
                      </div>
                      <div className="signout" onClick={this.signout}>
                        <i className="fa fa-power-off"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
        { children && React.cloneElement(children, {
          currentUser,
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
