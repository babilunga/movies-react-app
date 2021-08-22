import React from "react";
import CallApi from "../../../utils/api";
import Input from "./../../UIComponents/Input.js";

import AppContextHOC from "../../HOC/AppContextHOC.js";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      repeatPassword: "",
      submitting: false,
      errors: {}
    };
  }

  getErrors = (target = null) => {
    const { username, password, repeatPassword } = this.state;

    // Container where we collect errors to show
    const errorsCollector = {};

    // Errors Info ( conditions and lables )
    const errors = {
      username: {
        test: username.length === 0,
        label: "*Required field"
      },
      password: {
        test: password.length < 5,
        label: "*Should be more than 5 characters"
      },
      repeatPassword: {
        test: repeatPassword.length === 0 || repeatPassword !== password,
        label: "*Should be equal to password"
      }
    };

    // Errors Handling
    //    As single form error (onBlur)
    if (target !== null) {
      // Curent target in errors object
      const curent = errors[target];
      errorsCollector[target] = curent.test ? curent.label : null;
    }
    //    As all fields (onSubmit)
    else {
      Object.entries(errors).map(
        ([key, value]) =>
          (errorsCollector[key] = value.test ? value.label : null)
      );
    }

    return errorsCollector;
  };

  onChange = (e) => {
    const params = {
      name: e.target.name,
      value: e.target.value,
      errors_value: { [e.target.name]: null }
    };
    this.updateValues(params);
  };

  updateValues = ({
    name = null,
    value = null,
    errors_value = null,
    callback = () => {}
  }) => {
    // Check does we need to update other fields, or only Errors
    const nameAndValue = name !== null ? { [name]: value } : {};
    this.setState(
      (prevState) => ({
        ...nameAndValue,
        errors: {
          ...prevState.errors,
          ...errors_value
        }
      }),
      callback
    );
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
      console.log("Unsuccessful validation!");
      this.updateValues({ errors_value: errors });
    } else {
      console.log("Successful validation!");
      this.onSubmit();
    }
  };

  onSubmit = async () => {
    const { updateValue, updateSessionId } = this.props;

    this.updateValues({ name: "submitting", value: true });
    try {
      const data = await CallApi.get("/authentication/token/new");

      const result = await CallApi.post(
        "/authentication/token/validate_with_login",
        {
          body: {
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token
          }
        }
      );

      // Requestind session id
      const { session_id } = await CallApi.post("/authentication/session/new", {
        body: {
          request_token: result.request_token
        }
      });
      updateSessionId(session_id);

      // Requesting account info
      const account_info = await CallApi.get("/account", {
        params: {
          session_id: session_id
        }
      });

      // Console logs
      console.log(`Successful Login!\n\tsession_id: ${session_id}`);
      console.log("Account:", account_info);

      // Updating 'base' error
      // Activating back 'Sign in' button
      // Then updating 'user' state in App component
      this.updateValues({
        name: "submitting",
        value: false,
        errors_value: { base: null },
        callback: () => updateValue("user", account_info)
      });
      this.props.toggleLoginModal();
    } catch (error) {
      console.log("Error Login:", error.status_message);
      this.updateValues({ name: "submitting", value: false });
      this.setState({
        errors: {
          base: error.status_message
        }
      });
    }
  };

  render() {
    const {
      username,
      password,
      repeatPassword,
      submitting,
      errors
    } = this.state;
    return (
      <div>
        <h1 className="text-center h2">Sign in to Movie App</h1>
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
          className="btn btn-primary w-100 mt-2"
          onClick={this.onLogin}
          disabled={submitting}
        >
          Sign in
        </button>
        {errors.base && (
          <div className="invalid-feedback text-center">{errors.base}</div>
        )}
      </div>
    );
  }
}

export default AppContextHOC(LoginForm);
