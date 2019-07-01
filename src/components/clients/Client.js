import React from 'react';
import { Link } from 'react-router-dom';

export default function Client(props) {
  const { clients } = props;
  return (
    <React.Fragment>
      <tr>
        <td>{clients.firstName} {clients.lastName}</td>
        <td>{clients.email}</td>
        <td>${parseFloat(clients.balance).toFixed(2)}</td>
        <td>
          <Link to={`/client/${clients.id}`} className="btn btn-secondary btn-sm"><i className="fas fa-arrow-circle-right"></i> Details</Link>
        </td>
      </tr>
    </React.Fragment>
  )
}
