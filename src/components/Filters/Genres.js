import React from 'react';
import { API_URL, API_KEY_3 } from '../../utils/api';

export default class Genres extends React.Component {
  constructor() {
    super();

    this.state = {
      genresList: [],
    };
  }

  componentDidMount() {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}`;
    fetch(link)
      .then((responce) => responce.json())
      .then((data) => {
        this.setState({
          genresList: data.genres,
        });
      });
  }

  onChange = (e) => {
    const value = e.target.checked
      ? [...this.props.with_genres, e.target.value]
      : this.props.with_genres.filter((g) => g !== e.target.value);

    this.props.updateFilters('with_genres', value);
  };

  resetGenres = () => {
    this.props.updateFilters('with_genres', []);
  };

  render() {
    const { genresList } = this.state;
    const { with_genres } = this.props;

    return (
      <div className="mt-4">
        <div>
          <button
            type="button"
            className="btn btn-outline-dark mb-1"
            onClick={this.resetGenres}
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
                onChange={this.onChange}
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
  }
}
