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
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=en-EN`;
    fetch(link)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          genresList: data.genres,
        });
      });
  }

  onChange = (event) => {
    this.props.onChangeFilters({
      target: {
        name: 'with_genres',
        value: event.target.checked
          ? [...this.props.with_genres, event.target.value]
          : this.props.with_genres.filter((g) => g !== event.target.value),
      },
    });
  };

  resetGenres = () => {
    this.props.onChangeFilters({
      target: {
        name: 'with_genres',
        value: [],
      },
    });
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
            <div className="form-check" key={`genre${genre.id}`}>
              <input
                className="form-check-input"
                type="checkbox"
                value={genre.id}
                id={`genre${genre.id}`}
                onChange={this.onChange}
                checked={with_genres.includes(String(genre.id))}
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
