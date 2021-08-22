import React from 'react';
import classnames from 'classnames';

export default class Input extends React.Component {
  render() {
    const {
      label,
      type,
      id,
      name,
      value,
      onChange,
      placeholder,
      handleBlur,
      errors,
    } = this.props;

    return (
      <div>
        <label htmlFor="username" className="form-label">
          {label}
        </label>
        <input
          type={type}
          className={classnames('form-control', {
            'error-border': errors[name],
          })}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onBlur={handleBlur}
        />
        {errors && <div className="invalid-feedback">{errors[name]}</div>}
      </div>
    );
  }
}
