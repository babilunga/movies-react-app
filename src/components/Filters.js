import React from 'react';

class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by },
      onChangeFilters,
    } = this.props;
    return (
      <form className="mb-3">
        <div className="form-group">
          <label htmlFor="sort_by">Sort by:</label>
          <select
            className="form-control"
            id="sort_by"
            name="sort_by"
            value={sort_by}
            onChange={onChangeFilters}
          >
            <option value="popularity.desc">Popularity ▼</option>
            <option value="popularity.asc">Popularity ▲</option>
            <option value="vote_average.desc">Vote average ▼</option>
            <option value="vote_average.asc">Vote average ▲</option>
          </select>
        </div>
      </form>
    );
  }
}

export default Filters;
