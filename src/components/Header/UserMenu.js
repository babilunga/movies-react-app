import React from "react";
import UIDropdown from "../UIComponents/UIDropdown";
import { AppContext } from "../App";
import CallApi from "../../utils/api";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UserCicle = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #34bf75;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
`;

const Menu = styled.div`
  position: relative;
  width: 200px;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(64, 80, 108, 0.2),
    0 0 24px -1px rgba(64, 80, 108, 0.2);
  border-radius: 8px;

  &:after {
    content: "";
    position: absolute;
    right: 10px;
    top: -14px;
    border: 7px solid transparent;
    border-bottom: 7px solid #fff;
  }
`;

const MenuItem = styled.div`
  padding: 16px;
  font-size: 14px;
  color: #657389;
  line-height: 1;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(64, 80, 108, 0.1);
  }

  &:hover {
    background-color: rgba(245, 246, 248, 0.5);
    color: #40506c;
  }
`;

class UserMenu extends React.Component {
  state = {
    s: 2
  };

  handleClick = (callback) => {
    console.log("MenuItem click");
    callback();
  };

  handleLogOut = (callback) => {
    console.log("Logout");
    const options = {
      body: {
        session_id: this.props.session_id
      }
    };
    CallApi.delete("/authentication/session", options).then((data) => {
      this.props.onLogOut();
    });
    callback();
  };

  render() {
    const { user } = this.props;
    return (
      <Container>
        <UIDropdown
          render={(toggleShow) => (
            <UserCicle onClick={toggleShow}>
              <div>
                <img
                  width="40"
                  className="rounded-circle border border-white border-2"
                  src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
                  alt="avatar"
                />
              </div>
            </UserCicle>
          )}
          position={{
            top: "48px",
            right: "10px"
          }}
        >
          {(toggleShow) => (
            <Menu>
              <MenuItem onClick={() => this.handleLogOut(toggleShow)}>
                Log out
              </MenuItem>
            </Menu>
          )}
        </UIDropdown>
      </Container>
    );
  }
}

const UserMenuContainer = (props) => {
  return (
    <AppContext.Consumer>
      {(context) => <UserMenu {...context} {...props} />}
    </AppContext.Consumer>
  );
};

UserMenuContainer.displayName = "UserContainer";

export default UserMenuContainer;
