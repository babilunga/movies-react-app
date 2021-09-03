import React from 'react';
import AppContextHOC from '../HOC/AppContextHOC';
import CallApi from '../../utils/api';

import BookmarkOutlined from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkFilled from '@material-ui/icons/BookmarkOutlined';

class ButtonWatchlist extends React.Component {
  addWatchlist = () => {
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
        watchlist: !this.isWatchlist(),
      },
    };
    CallApi.post(`/account/${user.id}/watchlist`, options).then(() => {
      getMarkedMoviesList(user, session_id, 'watchlist');
    });
  };

  isWatchlist = () => {
    const { watchlist, id } = this.props;
    return watchlist.some((m) => m.id === id);
  };

  render() {
    return (
      <button
        className="btn btn-light bg-white m-0 p-0 pe-3 ps-3"
        style={{ border: 'none' }}
        onClick={this.addWatchlist}
      >
        {this.isWatchlist() ? (
          <BookmarkFilled fontSize="large" />
        ) : (
          <BookmarkOutlined fontSize="large" />
        )}
      </button>
    );
  }
}

export default AppContextHOC(ButtonWatchlist);
