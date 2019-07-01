import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({
  name,
  type,
  placeholder,
  fillInput,
  balanceSubmit,
  required,
  value
}) => {
  return (
    <form onSubmit={balanceSubmit}>
      <div className="input-group">
        <input
          type={type}
          className="form-control"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={fillInput}
          required={required}
        />
        <div className="input-group-append">
          <input
            className="btn btn-outline-dark"
            type="submit"
            value="Update"
          />
        </div>
      </div>
    </form>
  )
}

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  fillInput: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  balanceSubmit: PropTypes.func.isRequired
}

InputGroup.defaultProps = {

  type: 'text'

}

export default InputGroup;