import React, { Component, PropTypes } from 'react';
import { RouteTransition } from 'react-router-transition';
import { Link, withRouter } from 'react-router';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
    this.authUser = this.authUser.bind(this);
    this.signout = this.signout.bind(this);
  }

  componentWillMount() {
    const currentUserStr = window.localStorage.getItem('currentUser');
    if (!currentUserStr) {
      this.signout();
      return;
    } else {
      this.setState({
        currentUser: JSON.parse(currentUserStr),
      });
    }
  }

  authUser(user, callback) {
    this.setState({
      currentUser: user,
    }, callback());
  }

  signout() {
    const yes = confirm('คุณต้องการออกจากระบบใช่หรือไม่ ?');
    if (yes) {
      window.localStorage.setItem('currentUser', '');
      this.props.router.push('/');
    }
  }

  render() {
    const { children, router } = this.props;
    const { currentUser } = this.state;
    // no user login
    if (router.isActive('/', true) || router.isActive('/forgot', true) || this.props.location.pathname.indexOf('/change/') >= 0) {
      return (
        <div className="app">
          { children && React.cloneElement(children, {
            authUser: this.authUser,
          })}
        </div>
      );
    }

    const { name, surename, role, id, hospitalID } = currentUser;
    return (
      <div className="app">
        { router.isActive('/', true) || router.isActive('/forgot', true) || this.props.location.pathname.indexOf('/change/') >= 0 ?
          '' :
            <div id="nav">
              <div className="container">
                <div className="row">
                  <div className="twelve columns">
                    <Link to={`/${role}`}>
                      <img id="logo" src="/logo-small.png" role="presentation" />
                    </Link>
                    <div className="right">
                      <div className="user">
                        <p>{`${currentUser.roleText}${name} ${surename}, ${hospitalID}`}</p>
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
        <RouteTransition
          pathname={this.props.location.pathname}
  atEnter={{ opacity: 0 }}
    atLeave={{ opacity: 0 }}
    atActive={{ opacity: 1 }}
  className="yo"
        >
          { children && React.cloneElement(children, {
            currentUser,
          })}
        </RouteTransition>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  router: PropTypes.object,
};

export default withRouter(App);
