import React from 'react';
import PropTypes from 'prop-types';
import UISelect from '../UIComponents/UISelect';

export default class PrimaryReleaseYear extends React.PureComponent {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
  };

  static defaultProps = {
    options: Array(new Date().getFullYear() - 1950 + 1)
      .fill(1)
      .map((_a, index) => ({
        label: `${1950 + index}`,
        value: 1950 + index,
      })),
  };

  render() {
    const { primary_release_year, onChangeFilters, options } = this.props;

    return (
      <UISelect
        title="Release year:"
        name="primary_release_year"
        value={primary_release_year}
        onChangeFilters={onChangeFilters}
        options={options}
      />
    );
  }
}
