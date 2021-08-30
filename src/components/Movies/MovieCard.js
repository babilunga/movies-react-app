import React from 'react';
import AppContextHOC from '../HOC/AppContextHOC';
import CallApi from '../../utils/api';
import { Link } from 'react-router-dom';
import ButtonFavorite from '../UIComponents/ButtonFavorite';
import ButtonWatchlist from '../UIComponents/ButtonWatchlist';

class MovieCard extends React.Component {
  addFavorite = () => {
    const { session_id, toggleLoginModal, user, item } = this.props;

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
        media_id: item.id,
        favorite: !this.isFavorite(),
      },
    };
    CallApi.post(`/account/${user.id}/favorite`, options).then(() => {
      this.props.getMarkedMoviesList(user, session_id, 'favorite');
    });
  };

  addWatchlist = () => {
    const { session_id, toggleLoginModal, user, item } = this.props;

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
        media_id: item.id,
        watchlist: !this.isWatchlist(),
      },
    };
    CallApi.post(`/account/${user.id}/watchlist`, options).then(() => {
      this.props.getMarkedMoviesList(user, session_id, 'watchlist');
    });
  };

  isFavorite = () => {
    return this.props.favorite.some((m) => m.id === this.props.item.id);
  };

  isWatchlist = () => {
    return this.props.watchlist.some((m) => m.id === this.props.item.id);
  };

  render() {
    const { item } = this.props;
    const imgPath = item.backdrop_path || item.poster_path;
    return (
      <div className="card movie_card" style={{ width: '100%' }}>
        <img
          className="card-img-top card-img--height img-cover"
          src={`https://image.tmdb.org/t/p/w500${imgPath}`}
          alt=""
        />
        <div className="card-body">
          <Link
            className="card-title text-decoration-none fw-bold"
            to={`/movie/${item.id}`}
          >
            {item.title}
          </Link>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <div className="m-0 p-0 float-end">
            <ButtonWatchlist
              isActive={this.isWatchlist}
              handleClick={this.addWatchlist}
            />
            <ButtonFavorite
              isActive={this.isFavorite}
              handleClick={this.addFavorite}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MovieCard);
