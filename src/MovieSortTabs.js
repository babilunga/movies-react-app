// import React from 'react';
import './styles.css';
import classNames from 'classnames/bind';

const MovieSortTabs = (props) => {
  const { sort_by, updateSortBy } = props;
  const handleClick = (value) => {
    return () => updateSortBy(value);
  };
  return (
    <div>
      <ul className="sort_tabs">
        <li
          className={classNames('sort_li', {
            active: sort_by === 'popularity.desc',
          })}
          onClick={handleClick('popularity.desc')}
        >
          <div>Popularity 🡣</div>
        </li>
        <li
          className={classNames('sort_li', {
            active: sort_by === 'revenue.desc',
          })}
          onClick={handleClick('revenue.desc')}
        >
          <div>Revenue 🡣</div>
        </li>
        <li
          className={classNames('sort_li', {
            active: sort_by === 'vote_average.desc',
          })}
          onClick={handleClick('vote_average.desc')}
        >
          <div>Vote average 🡣</div>
        </li>
      </ul>
    </div>
  );
};

export default MovieSortTabs;
