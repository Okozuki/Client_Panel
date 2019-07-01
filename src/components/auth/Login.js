import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { firebaseConnect } from 'react-redux-firebase';
import { withFirebase } from 'react-redux-firebase';
import TextInputGroup from '../layout/textInputGroup';
import { UserIsNotAuthenticated } from '../../helpers/auth';
import notifyUser from '../../actions/notifyActions';
import Alert from '../../components/layout/Alert';





class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const { firebase, notifyUser } = this.props;

    const { email, password } = this.state;

    // console.log(notify);

    firebase.login({
      email,
      password
    }).catch(err => notifyUser('Invalid Login Credentials!', 'error'));

    // console.log(this.state);
  }

  render() {
    const { email, password } = this.state;
    const { notify } = this.props;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock"></i>
                  {'  '}Login
                </span>
              </h1>
            </div>
            <div className="card-body">

              {(notify.message !== null) ? <Alert message={notify.message} messageType={notify.messageType} /> : null}

              <form onSubmit={this.onSubmit}>
                <TextInputGroup
                  name='email'
                  label='Email'
                  type="email"
                  fillInput={this.onChange}
                  placeholder="Enter Email.."
                  value={email}
                  minLength='6'
                  required={true}
                />
                <TextInputGroup
                  name='password'
                  label='Password'
                  type='password'
                  fillInput={this.onChange}
                  placeholder="Enter Password.."
                  value={password}
                  minLength='6'
                  required={true}
                />
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
}

export default compose(
  UserIsNotAuthenticated,
  withFirebase,
  connect((state, props) => ({
    notify: state.notify
  }), { notifyUser })
)(Login);
