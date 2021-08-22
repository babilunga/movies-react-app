import React from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import MoviesHOC from "./MoviesHOC";

const Movies = ({ movies }) => (
  <div className="wrapper movie-template" id="movie_list">
    {movies.length > 0
      ? movies.map((movie) => {
          return (
            <div key={movie.id}>
              <MovieCard item={movie} />
            </div>
          );
        })
      : null}
    {movies.length === 0 ? (
      <span className="fs-1 text-black-50">Nothing have found :(</span>
    ) : null}
  </div>
);

Movies.defaultProps = {
  movies: []
};

Movies.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MoviesHOC(Movies);
