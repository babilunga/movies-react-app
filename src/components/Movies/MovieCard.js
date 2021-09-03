import React from 'react';
import AppContextHOC from '../HOC/AppContextHOC';
import { Link } from 'react-router-dom';
import ButtonFavorite from '../UIComponents/ButtonFavorite';
import ButtonWatchlist from '../UIComponents/ButtonWatchlist';

class MovieCard extends React.Component {
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
            <ButtonWatchlist id={this.props.item.id} />
            <ButtonFavorite id={this.props.item.id} />
          </div>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MovieCard);
