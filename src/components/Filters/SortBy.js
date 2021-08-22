import React from 'react';
import PropTypes from 'prop-types';
import UISelect from '../UIComponents/UISelect';

export default class SortBy extends React.PureComponent {
  static propTypes = {
    sort_by: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired,
  };

  static defaultProps = {
    options: [
      {
        label: 'Popularity ▼',
        value: 'popularity.desc',
      },
      {
        label: 'Popularity ▲',
        value: 'popularity.asc',
      },
      {
        label: 'Vote average ▼',
        value: 'vote_average.desc',
      },
      {
        label: 'Vote average ▲',
        value: 'vote_average.asc',
      },
    ],
  };

  render() {
    // console.log('SortBy');
    const { sort_by, onChangeFilters, options } = this.props;

    return (
      <UISelect
        title="Sort by:"
        name="sort_by"
        value={sort_by}
        onChangeFilters={onChangeFilters}
        options={options}
      />
    );
  }
}
