import React from 'react';
import PropTypes from 'prop-types';

import SortBy from './SortBy';
import Pagination from './Pagination';
import PrimaryReleaseYear from './PrimaryReleaseYear';
import Genres from './Genres';

export default class Filters extends React.PureComponent {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    updateValue: PropTypes.func.isRequired,
  };

  render() {
    const {
      page,
      total_pages,
      filters: { sort_by, primary_release_year, with_genres },
      onChangeFilters,
      updateValue,
      updateFilters,
    } = this.props;

    return (
      <form className="">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />

        <PrimaryReleaseYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />
        <Genres with_genres={with_genres} updateFilters={updateFilters} />

        <Pagination
          page={page}
          updateValue={updateValue}
          total_pages={total_pages}
        />
      </form>
    );
  }
}
