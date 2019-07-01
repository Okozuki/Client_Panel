import React, { Component } from 'react';
import Client from '../clients/Client';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';



class Clients extends Component {
  state = {
    totalOwed: null
  }

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
      // Add balances
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      return { totalOwed: total }
    }

    return null;
  }

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;
    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2><i className="fas fa-users"></i> Clients</h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Owed{' '}
                <span className="text-primary">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                clients.map((client => (
                  <Client key={client.id} clients={client} />
                )))
              }
            </tbody>
          </table>
        </div>
      )
    } else {
      return <Spinner />;
    }

  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
}

// export default Clients;

export default compose(
  firestoreConnect([{ collection: 'clients' }]), connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);