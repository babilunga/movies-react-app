import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm.js";
import AppContextHOC from "../../HOC/AppContextHOC";

class LoginModal extends React.Component {
  render() {
    const { showLoginModal, toggleLoginModal } = this.props;
    return (
      <Modal isOpen={showLoginModal} toggle={toggleLoginModal}>
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </Modal>
    );
  }
}

export default AppContextHOC(LoginModal);
