import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import TextInputGroup from '../layout/textInputGroup';


class EditClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  }

  componentDidMount() {
    const { client } = this.props;
    if (client) {
      // console.log(client);
      this.setState(client);
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   const { client } = props;

  //   if (client) {
  //     // Fill Input fields
  //     state = {
  //       firstName: client.firstName,
  //       lastName: client.lastName,
  //       email: client.email,
  //       phone: client.phone,
  //       balance: client.balance
  //     }

  //     this.setState(client);
  //   }

  //   return null;
  // }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const updatedClient = this.state;

    const { firestore, client, history } = this.props;

    // If no balance, make 0 else convert string to number
    updatedClient.balance = updatedClient.balance === '' ? 0 : parseFloat(updatedClient.balance);

    // Uddate client on firestore
    firestore.update({ collection: 'clients', doc: client.id }, updatedClient).then(() => history.push('/'));

    // console.log(updatedClient);
  }

  render() {
    const { firstName, lastName, email, phone, balance } = this.state;
    const { client, settings } = this.props;

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to={`/client/${this.props.match.params.id}`} className="btn btn-link">
                <i className="fas fa-arrow-circle-left"></i> Back To Details
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
                  value={balance.toString()}
                  required={false}
                  disabled={settings.disableBalanceOnEdit}
                />
                <button type="submit" className="btn btn-primary btn-block">Update Client</button>
              </form>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Spinner />
      )
    }

  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props =>
    [{ collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings
  }))
  // ,
  // connect((state, props) => ({
  //   settings: state.settings
  // }))
)(EditClient);
