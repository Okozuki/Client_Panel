import React, { Component } from 'react';
import { setDisableBalanceOnAdd, setDisableBalanceOnEdit, setAllowRegistration } from '../../actions/settingsActions';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Settings extends Component {
  // state = {
  //   disableBalanceOnAdd: true,
  //   disableBalanceOnEdit: false,
  //   allowRegistration: false
  // }

  // onChange = e => {

  //   const { setDisableBalanceOnAdd, setDisableBalanceOnEdit, setAllowRegistration } = this.props;

  //   setDisableBalanceOnAdd();
  // }

  render() {
    const { disableBalanceOnAdd, disableBalanceOnEdit, allowRegistration } = this.props.settings;
    const { setDisableBalanceOnAdd, setDisableBalanceOnEdit, setAllowRegistration } = this.props;
    // const { disableBalanceOnAdd, disableBalanceOnEdit, allowRegistration } = this.state;
    // const { dispatch } = this.props;
    return (
      <div className="col-md-8">
        <Link to="/" className="btn btn-link">
          <i className="fas fa-arrow-circle-left"></i> Back To Dashboard
              </Link>
        <hr />
        <div className="card">
          <div className="card-header">
            <h3>Edit Settings</h3>
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1" defaultChecked={disableBalanceOnAdd} onChange={setDisableBalanceOnAdd} />
                <label className="custom-control-label" htmlFor="customCheck1">Disable balance on add</label>
              </div>
            </li>
            <li className="list-group-item">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck2" defaultChecked={disableBalanceOnEdit} onChange={setDisableBalanceOnEdit} />
                <label className="custom-control-label" htmlFor="customCheck2">Disable balance on edit</label>
              </div>
            </li>
            <li className="list-group-item">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck3" defaultChecked={allowRegistration} onChange={setAllowRegistration} />
                <label className="custom-control-label" htmlFor="customCheck3">Allow registration</label>
              </div>
            </li>

          </ul>

        </div>
      </div>


    )
  }
}

Settings.propTypes = {
  // auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
}

export default connect((state, props) => ({
  settings: state.settings,
  auth: state.firebase.auth
}), { setDisableBalanceOnAdd, setDisableBalanceOnEdit, setAllowRegistration }
)(Settings);
