import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextInputGroup from '../layout/textInputGroup';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    const newClient = this.state;

    const { firestore, history } = this.props;

    // If no balance, make 0 else convert string to number
    newClient.balance = newClient.balance === '' ? 0 : parseFloat(newClient.balance);

    // Add client to direstore
    firestore.add({ collection: 'clients' }, newClient).then(() => history.push('/'));
  }


  render() {
    const { firstName, lastName, email, phone, balance } = this.state;
    const { settings } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left"></i> Back To Dashboard
              </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <TextInputGroup
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
              />
              <TextInputGroup
                name='email'
                label='Email'
                type='email'
                fillInput={this.onChange}
                placeholder="Enter Email.."
                value={email}
                required={false}
              />
              <TextInputGroup
                name='phone'
                label='Phone'
                fillInput={this.onChange}
                placeholder="Enter Phone.."
                value={phone}
                minLength='10'
                required={true}
              />
              <TextInputGroup
                name='balance'
                label='Balance'
                fillInput={this.onChange}
                placeholder="Enter Balance.."
                value={balance}
                required={false}
                disabled={settings.disableBalanceOnAdd}
              />
              <button type="submit" className="btn btn-primary btn-block">Add Client</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
}

export default compose(
  connect((state, props) => ({
    settings: state.settings
  })),
  firestoreConnect()
)(AddClient);