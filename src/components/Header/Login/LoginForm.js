import React from 'react';
import { API_URL, API_KEY_3, fetchApi } from '../../../utils/api';
import Input from './../../UIComponents/Input.js';

export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      errors: {},
    };
  }

  getErrors = (target = null) => {
    const { username, password, repeatPassword } = this.state;
    const errorsCollector = {};

    // Errors Info Container
    const errors = {
      username: {
        test: username.length === 0,
        label: '*Required field',
      },
      password: {
        test: password.length === 0,
        label: '*Required field',
      },
      repeatPassword: {
        test: repeatPassword.length === 0 || repeatPassword !== password,
        label: '*Should be equal to password',
      },
      // base: {},
    };

    // Errors Handling
    //    As single form error (when onBlur)
    if (target !== null) {
      errorsCollector[target] = errors[target].test
        ? errors[target].label
        : null;
    }
    //    As all fields (when onSubmit)
    else {
      Object.entries(errors).map(([key, value]) => {
        errorsCollector[key] = value.test ? value.label : null;
      });
    }
    console.log(errorsCollector);
    return errorsCollector;
  };

  onChange = (e) => {
    const params = {
      name: e.target.name,
      value: e.target.value,
      errors_value: { [e.target.name]: null },
    };
    this.updateValues(params);
  };

  updateValues = ({ name = null, value = null, errors_value = null }) => {
    // Check does we need to update other fields, or only Errors
    const nameValue = name !== null ? { [name]: value } : {};
    this.setState((prevState) => ({
      ...nameValue,
      errors: {
        ...prevState.errors,
        ...errors_value,
      },
    }));
  };

  handleBlur = (e) => {
    const errors = this.getErrors(e.target.name);
    if (Object.keys(errors).length > 0) {
      this.updateValues({ errors_value: errors });
    }
  };

  onLogin = (e) => {
    e.preventDefault();

    const errors = this.getErrors();

    // if error equals null - it means it was resolved and it is no longer an error
    const realErrors = Object.values(errors).filter((error) => error !== null);

    if (realErrors.length > 0) {
      console.log('Unsuccess!');
      this.updateValues({ errors_value: errors });
    } else {
      console.log('Success!');
    }
  };

  onSubmit = async () => {
    try {
      const data = await fetchApi(
        `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
      );

      const result = await fetchApi(
        `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token,
          }),
        }
      );

      const { session_id } = await fetchApi(
        `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            request_token: result.request_token,
          }),
        }
      );
      console.log('session_id:', session_id);
    } catch (error) {
      console.log('error:', error);
    }
  };

  render() {
    const { username, password, repeatPassword, errors } = this.state;
    return (
      <div>
        <h1 className="text-center h2">Authorization</h1>
        <div className="mb-3">
          <Input
            label="Username"
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={this.onChange}
            handleBlur={this.handleBlur}
            errors={errors}
          />
        </div>
        <div className="mb-3 border-red">
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={this.onChange}
            handleBlur={this.handleBlur}
            errors={errors}
          />
        </div>
        <div className="mb-3">
          <Input
            label="Repeat password"
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={repeatPassword}
            placeholder="Repeat password"
            onChange={this.onChange}
            handleBlur={this.handleBlur}
            errors={errors}
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
