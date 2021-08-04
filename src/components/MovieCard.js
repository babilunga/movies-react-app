import React from 'react';

export default class MovieCard extends React.Component {
  render() {
    const { item } = this.props;
    const imgPath = item.backdrop_path || item.poster_path;

    return (
      <div className="card" style={{ width: '100%' }}>
        <img
          className="card-img-top card-img--height img-cover"
          src={`https://image.tmdb.org/t/p/w500${imgPath}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
      </div>
    );
  }
}
