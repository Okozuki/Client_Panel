import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

class AppNavbar extends Component {
  state = {
    isAuthenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true }
    } else {
      return { isAuthenticated: false }
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;
    // console.log(history);
    this.setState({ isAuthenticated: false });

    firebase.logout().then(() => console.log('You Are Logged Out'));
  }

  render() {
    const { branding, auth, settings } = this.props;
    const { isAuthenticated } = this.state;

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3 py-1 mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {branding}
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav mr-auto">

              {isAuthenticated ? (<li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="fas fa-home" /> Dashboard
                </Link>
              </li>) : null}


            </ul>

            {isAuthenticated ? (<ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="#!" className="nav-link"><i className="fas fa-user"></i> {auth.email}</a>
              </li>
              <li className="nav-item">
                <Link to="/settings" className="nav-link">
                  <i className="fas fa-cog"></i> Settings
                </Link>
              </li>
              <li className="nav-item">
                <a href="#!" className="nav-link" onClick={this.onLogoutClick}><i className="fas fa-sign-out-alt"></i> Logout</a>
              </li>
            </ul>) : null}

            {(settings.allowRegistration && !isAuthenticated) ?
              (<ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <i className="fas fa-sign-in-alt"></i> Login
                    </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    <i className="fas fa-user-plus"></i> Register
                    </Link>
                </li>
              </ul>)
              : null}

          </div>
        </div>
      </nav>
    );
  }

};

AppNavbar.defaultProps = {
  branding: 'My App'
};

AppNavbar.propTypes = {
  branding: PropTypes.string.isRequired,
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  })))(AppNavbar);
