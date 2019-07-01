import React from 'react';
import PropTypes from 'prop-types';

const TextInputGroup = ({
  label,
  name,
  type,
  placeholder,
  fillInput,
  minLength,
  required,
  value,
  disabled
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        className="form-control form-control-lg"
        placeholder={placeholder}
        minLength={minLength}
        onChange={fillInput}
        value={value}
        required={required}
        disabled={disabled}
      />
      {/* <div className="invalid-feedback">{error}</div> */}
    </div>
  )
}

TextInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  fillInput: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  minLength: PropTypes.string,
  disabled: PropTypes.bool
}

TextInputGroup.defaultProps = {

  type: 'text'

}


export default TextInputGroup;