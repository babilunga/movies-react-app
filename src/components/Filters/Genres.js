import React from "react";
import PropTypes from "prop-types";
import GenresHOC from "./GenresHOC";

const Genres = ({ genresList, with_genres, resetGenres, onChange }) => (
  <div className="mt-4">
    <div>
      <button
        type="button"
        className="btn btn-outline-dark mb-1"
        onClick={resetGenres}
      >
        Показать все жанры
      </button>
    </div>
    <div>Genres:</div>
    {genresList.map((genre) => {
      return (
        <div className="form-check form-switch" key={genre.id}>
          <input
            className="form-check-input"
            id={`genre${genre.id}`}
            type="checkbox"
            value={genre.id}
            onChange={onChange}
            checked={with_genres.includes(`${genre.id}`)}
          />
          <label className="form-check-label" htmlFor={`genre${genre.id}`}>
            {genre.name}
          </label>
        </div>
      );
    })}
  </div>
);

Genres.defaultProps = {
  genresList: [],
  with_genres: []
};

Genres.propTypes = {
  genresList: PropTypes.any.isRequired,
  with_genres: PropTypes.any.isRequired
};

export default GenresHOC(Genres);
