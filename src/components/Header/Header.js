import React from 'react';
import Login from './Login/Login.js';
import UserMenu from './UserMenu.js';
import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className="navbar navbar-dark bg-primary rounded-bottom" id="header">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item align-items">
              <h1 className="text fw-bold text-light ms-5">
                <MovieCreationOutlinedIcon
                  style={{ fontSize: 45 }}
                  className="me-3 "
                />
                Movies App
              </h1>
            </li>
          </ul>
          {user ? <UserMenu /> : <Login />}
        </div>
      </div>
    );
  }
}
