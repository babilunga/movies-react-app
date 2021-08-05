import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from './LoginForm.js';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={this.toggleModal}
        >
          Login
        </button>
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
