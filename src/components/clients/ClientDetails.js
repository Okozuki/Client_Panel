import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import InputGroup from '../layout/inputGroup';


class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ''
  }

  showBalanceUpdate = () => {
    this.setState({ showBalanceUpdate: !this.state.showBalanceUpdate });
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  // Update Balance
  balanceSubmit = e => {
    e.preventDefault();

    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    }

    // Update in firestore
    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate);
  }

  // Delete Client
  deleteClient = e => {
    e.preventDefault();

    const { client, firestore, history } = this.props;
    // console.log(history);
    firestore.delete({ collection: 'clients', doc: client.id })
      .then(history.push('/'));
  }

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    // let balanceForm = '';
    // // If balance form should display
    // if (showBalanceUpdate) {
    //   balanceForm = (
    //     <InputGroup
    //       balanceSubmit={this.balanceSubmit}
    //       fillInput={this.onChange}
    //       name="balanceUpdateAmount"
    //       placeholder="Add New Balance"
    //       value={balanceUpdateAmount}
    //       required={true}
    //     />
    //   )



    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left"></i> Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  <i className="fas fa-pencil"></i> Edit
              </Link>
                <button onClick={this.deleteClient} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>Client ID:{' '}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance: <span className={(parseFloat(client.balance) === 0) ? 'text-success' : 'text-danger'}>${parseFloat(client.balance).toFixed(2)}</span>{'  '}
                    <small>
                      <a href="#!" onClick={this.showBalanceUpdate}>
                        <i className="fas fa-pencil-alt"></i>
                      </a>
                    </small>
                  </h3>

                  {(showBalanceUpdate) ?
                    <InputGroup
                      balanceSubmit={this.balanceSubmit}
                      fillInput={this.onChange}
                      name="balanceUpdateAmount"
                      placeholder="Add New Balance"
                      value={balanceUpdateAmount}
                      required={true}
                    /> : ''
                  }

                </div>
              </div>

              <hr />
              <ul className="list-group">
                <li className="list-group-item">Contact Email: {client.email}</li>
                <li className="list-group-item">Contact Phone: {client.phone}</li>
              </ul>
            </div>


          </div>
        </div>
      )
    } else {
      return <Spinner />;
    }

  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props =>
    [{ collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);