import React from "react";
import AppContextHOC from "../../HOC/AppContextHOC";

class Login extends React.Component {
  render() {
    const { toggleLoginModal } = this.props;
    return (
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={toggleLoginModal}
        >
          Sign in
        </button>
      </div>
    );
  }
}

export default AppContextHOC(Login);
