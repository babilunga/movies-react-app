import React from 'react';
import Login from './Login/Login.js';

export default class Header extends React.Component {
  render() {
    return (
      <div className="navbar navbar-dark bg-primary rounded-bottom" id="header">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active"></li>
          </ul>
          <Login />
        </div>
      </div>
    );
  }
}
