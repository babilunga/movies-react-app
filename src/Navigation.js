// import React from 'react';
import './styles.css';
import classNames from 'classnames/bind';

const Navigation = (props) => {
  const { page, increasePageNumber, decreasePageNumber, total_pages } = props;

  return (
    <div>
      <ul className="nav_tabs">
        <li>
          <button
            type="button"
            className={classNames('nav_button', {
              'nav-button-disabled': page === 1,
            })}
            onClick={decreasePageNumber}
            disabled={page === 1}
          >
            {'<'}
          </button>
        </li>
        <li>{page}</li>
        <li>
          <button
            type="button"
            className="nav_button"
            onClick={increasePageNumber}
            disabled={page === total_pages}
          >
            {'>'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
