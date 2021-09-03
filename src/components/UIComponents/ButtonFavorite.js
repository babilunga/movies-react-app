import React from 'react';
import AppContextHOC from '../HOC/AppContextHOC';
import CallApi from '../../utils/api';

import StarOutlined from '@material-ui/icons/StarBorderOutlined';
import StarFilled from '@material-ui/icons/StarOutlined';

class ButtonFavorite extends React.Component {
  addFavorite = () => {
    const { session_id, toggleLoginModal, user, id, getMarkedMoviesList } =
      this.props;

    if (!session_id) {
      toggleLoginModal();
      return;
    }

    const options = {
      params: {
        'Content-Type': 'application/json;charset=utf-8',
        session_id: session_id,
      },
      body: {
        media_type: 'movie',
        media_id: id,
        favorite: !this.isFavorite(),
      },
    };
    CallApi.post(`/account/${user.id}/favorite`, options).then(() => {
      getMarkedMoviesList(user, session_id, 'favorite');
    });
  };

  isFavorite = () => {
    const { favorite, id } = this.props;
    return favorite.some((m) => m.id === id);
  };

  render() {
    return (
      <button
        className="btn btn-light bg-white m-0 p-0 pe-3 ps-3"
        style={{ border: 'none' }}
        onClick={this.addFavorite}
      >
        {this.isFavorite() ? (
          <StarFilled fontSize="large" />
        ) : (
          <StarOutlined fontSize="large" />
        )}
      </button>
    );
  }
}

export default AppContextHOC(ButtonFavorite);
