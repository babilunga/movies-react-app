import React from 'react';
import { API_URL, API_KEY_3, fetchApi } from '../../../utils/api';
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

  sendPromises = async () => {
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
            username: 'babilunga1',
            password: 'dafadurka',
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
