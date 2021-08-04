import React from 'react';

export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {},
    };
  }

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, '>', value);
    this.updateValues(name, value);
  };

  updateValues = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleBlur = (e) => {
    console.log('on blur:', e.target.name);
  };

  getErrors = () => {
    const errors = {};

    if (this.state.username.length === 0) {
      errors.username = '*Required field';
    }
    if (this.state.password.length === 0) {
      errors.password = '*Required field';
    }

    return errors;
  };

  onLogin = (e) => {
    e.preventDefault();

    const errors = this.getErrors;
  };

  render() {
    const { username, password, errors } = this.state;
    return (
      <div>
        <h1 className="text-center h2">Authorization</h1>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            onChange={this.onChange}
            placeholder="Enter your username"
            onBlur={this.handleBlur}
          />
          {errors && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={this.onChange}
            placeholder="Enter your password"
            onBlur={this.handleBlur}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100 mt-3"
          onClick={this.onLogin}
        >
          Login
        </button>
      </div>
    );
  }
}
