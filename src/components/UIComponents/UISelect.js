import React from 'react';

export default class UISelect extends React.Component {
  render() {
    const { title, name, value, options, onChangeFilters } = this.props;

    return (
      <div className="form-group mt-3  ">
        <label htmlFor={name}>{title}</label>
        <select
          className="form-select"
          id={name}
          name={name}
          value={value}
          onChange={onChangeFilters}
        >
          {options.map(({ label, value }, index) => (
            <option key={index} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
