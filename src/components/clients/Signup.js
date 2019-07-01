import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextInputGroup from '../layout/textInputGroup';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { firestoreConnect } from 'react-redux-firebase';
import { withFirebase } from 'react-redux-firebase';
import { UserIsNotAuthenticated } from '../../helpers/auth';
import notifyUser from '../../actions/notifyActions';
import Alert from '../../components/layout/Alert';

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password1: ''
  }

  // Route protection base on Allowregistration State
  componentWillMount() {
    const { allowRegistration } = this.props.settings;
    const { history } = this.props;
    if (!allowRegistration) {
      history.push('/'); // redirect to /login if not allowed
    }
  }

  // Route protection base on Allowregistration State
  // static getDerivedStateFromProps(props, state) {
  //   const { allowRegistration } = props.settings;
  //   const { history } = props;
  //   if (!allowRegistration) {
  //     history.push('/login'); // redirect to /login if not allowed
  //   }
  //   return null;
  // }

  // Route protection base on Allowregistration State
  // componentWillReceiveProps(props) {
  //   const { history } = props;
  //   const { allowRegistration } = props.settings;
  //   if (!allowRegistration) {
  //     history.push('/login') // redirect to /login if not allowed
  //   }
  // }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = this.state;

    const { firebase, notifyUser, history } = this.props;

    // Password Validation
    if (newUser.password === newUser.password1) {

      const createNewUser = ({ email, password, username }) => {
        firebase.createUser(
          { email, password },
          { username, email }
        )
          .then((userData) => {
            notifyUser('You are successfully registered! You can Login Now', 'success');
            console.log(userData);
            history.push('/');
          })
          .catch(err => notifyUser('This Account already exists!', 'error'));
      }

      // Call with info
      createNewUser({
        email: newUser.email,
        password: newUser.password,
        username: newUser.username
      });


      // notifyUser('You are successfully registered! You can Login', 'success');
      // console.log(newUser);
    } else {
      notifyUser('Invalid Password, please try again!', 'error');
    }

    // Add User to firebase
    // firebase.add({ collection: 'clients' }, newClient).then(() => history.push('/'));
  }
  render() {
    const { username, email, password, password1 } = this.state;
    const { notify } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left"></i> Back To Login
              </Link>
          </div>
        </div>
        <hr />
        <div className="card">
          <div className="card-header">
            <h1 className="text-center pb-4 pt-3">
              <span className="text-primary">
                <i className="fas fa-user-plus"></i>
                {'  '}Register
                </span>
            </h1>
          </div>
          <div className="card-body">

            {(notify.message !== null) ? <Alert message={notify.message} messageType={notify.messageType} /> : null}

            <form onSubmit={this.onSubmit}>
              {/* <TextInputGroup
                name='firstName'
                label='First Name'
                fillInput={this.onChange}
                placeholder="Enter Fist Name.."
                value={firstName}
                minLength='4'
                required={true}
              />
              <TextInputGroup
                name='lastName'
                label='Last Name'
                fillInput={this.onChange}
                placeholder="Enter Last Name.."
                value={lastName}
                minLength='4'
                required={true}
              /> */}
              <TextInputGroup
                name='username'
                label='Username'
                fillInput={this.onChange}
                placeholder="Enter Username.."
                value={username}
                required={true}
              />
              <TextInputGroup
                name='email'
                label='Email'
                type='email'
                fillInput={this.onChange}
                placeholder="Enter Email.."
                value={email}
                required={true}
              />
              <TextInputGroup
                type='password'
                name='password'
                label='Password'
                fillInput={this.onChange}
                placeholder="Enter Password.."
                value={password}
                minLength='6'
                required={true}
              />
              <TextInputGroup
                type='password'
                name='password1'
                label='Confirm Password'
                fillInput={this.onChange}
                placeholder="Confirm Password.."
                value={password1}
                minLength='6'
                required={true}
              />
              <button type="submit" className="btn btn-primary btn-block">Register</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
}

export default compose(
  UserIsNotAuthenticated,
  withFirebase,
  // firebaseConnect(),
  connect(({ notify, settings }, props) => ({
    notify,
    settings
  }), { notifyUser })
)(Signup);