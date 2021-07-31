import React, { Component } from 'react';
import MovieCard from './MovieCard';
import { API_URL, API_KEY_3 } from '../utils/api';
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

    if (with_genres.length !== 0) {
      queryStringParams.with_genres = with_genres.join(',');
    }

    const link = `${API_URL}/discover/movie?${queryString.stringify(
      queryStringParams
    )}`;

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

    if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
      this.props.updateValue('page', 1);
      this.getMovies(filters, page);
    }
    if (
      this.props.filters.primary_release_year !==
      prevProps.filters.primary_release_year
    ) {
      this.props.updateValue('page', 1);
      this.getMovies(filters, 1);
    }
    if (this.props.filters.with_genres !== prevProps.filters.with_genres) {
      // this.props.updateValue('page', 1);
      this.getMovies(filters, page);
    }
    if (this.props.page !== prevProps.page) {
      this.getMovies(filters, page);
    }
  }

  render() {
    // console.log('MovieList');
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieCard item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
