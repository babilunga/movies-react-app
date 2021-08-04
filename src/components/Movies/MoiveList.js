import React, { Component } from 'react';
import MovieCard from './MovieCard';
import { API_URL, API_KEY_3 } from '../../utils/api';
import queryString from 'query-string';

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    };
  }

  getMovies = (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;

    const queryStringParams = {
      api_key: API_KEY_3,
      language: 'ru-RU',
      sort_by: sort_by,
      page: page,
      primary_release_year: primary_release_year,
    };

    // Forming genres list
    if (with_genres.length !== 0) {
      queryStringParams.with_genres = with_genres.join(',');
    }

    const link = `${API_URL}/discover/movie?${queryString.stringify(
      queryStringParams
    )}`;

    // Fetch request
    fetch(link)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.props.updateValue('page', data.page);
        this.props.updateValue('total_pages', data.total_pages);
        this.setState({
          movies: data.results,
        });
      });
  };

  componentDidMount() {
    const { filters, page } = this.props;

    this.getMovies(filters, page);
  }

  componentDidUpdate(prevProps) {
    const { filters, page } = this.props;

    if (this.props.filters !== prevProps.filters) {
      this.props.updateValue('page', 1);
      this.getMovies(filters, page);
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(filters, page);
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="wrapper movie-template" id="movie_list">
        {movies.length > 0
          ? movies.map((movie) => {
              return (
                <div key={movie.id} className="">
                  <MovieCard item={movie} />
                </div>
              );
            })
          : null}
        {movies.length === 0 ? (
          <div className="d-flex justify-content-center not-found ">
            <span className="fs-1 text-black-50 align-self-center">
              Nothing have found :(
            </span>
          </div>
        ) : null}
      </div>
    );
  }
}
