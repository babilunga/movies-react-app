// import React from 'react';
import './styles.css';

const Navigation = (props) => {
  const { page, increasePageNumber, decreasePageNumber } = props;

  return (
    <div>
      <ul className="nav_tabs">
        <li className="nav_button" onClick={decreasePageNumber}>
          <div>{'<'}</div>
        </li>
        <li>{page}</li>
        <li className="nav_button" onClick={increasePageNumber}>
          <div>{'>'}</div>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
