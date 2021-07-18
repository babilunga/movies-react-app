import React from 'react';
import './styles.css';
import { API_URL, API_KEY_3 } from './utils/api.js';
import MovieCard from './MovieCard.js';
import MovieSortTabs from './MovieSortTabs.js';
import Navigation from './Navigation.js';

const getFetchRequest = ({ page, sort_by }) =>
  fetch(
    `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${sort_by}&page=${page}`
  ).then((response) => response.json());

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      moviesData: [],
      willWatchList: [],
      sort_by: 'popularity.desc',
      page: 1,
      total_pages: null,
    };
  }

  componentDidMount = () => {
    this.getMovies();
  };

  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.sort_by !== this.state.sort_by ||
      prevState.page !== this.state.page
    ) {
      this.getMovies();
    }
  }

  removeMovieHandler = (id) => {
    this.removeFromWillWatchList(id);
    const newMovieList = this.state.moviesData.filter(
      (movie) => movie.id !== id
    );
    this.setState({
      moviesData: newMovieList,
    });
  };

  addToWillWatchList = (movie) => {
    const newWillWatchList = [...this.state.willWatchList, movie];
    this.setState({
      willWatchList: newWillWatchList,
    });
  };

  removeFromWillWatchList = (id) => {
    const newWillWatchList = this.state.willWatchList.filter(
      (movie) => movie.id !== id
    );
    this.setState({
      willWatchList: newWillWatchList,
    });
  };

  increasePageNumber = () => {
    const curentPage = this.state.page;
    this.setState({
      page: curentPage + 1,
    });
  };

  decreasePageNumber = () => {
    const curentPage = this.state.page;
    this.setState({
      page: curentPage - 1,
    });
  };

  getMovies = () => {
    const { page, sort_by } = this.state;
    getFetchRequest({ page, sort_by }).then((data) =>
      this.setState({
        moviesData: data.results,
        page: data.page,
        total_pages: data.total_pages,
      })
    );
  };

  // TODO:
  resetWillWatchList = () => {
    this.setState({
      willWatchList: [],
    });
  };

  updateSortBy = (value) => {
    this.setState({
      sort_by: value,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="reset">
          <button
            className="btn-default btn-reset"
            onClick={this.resetWillWatchList.bind(this)}
          >
            Reset will watch List 📃
          </button>
        </div>
        <Navigation
          page={this.state.page}
          increasePageNumber={this.increasePageNumber}
          decreasePageNumber={this.decreasePageNumber}
          total_pages={this.state.total_pages}
        />
        <MovieSortTabs
          sort_by={this.state.sort_by}
          updateSortBy={this.updateSortBy}
        />
        <div className="main">
          <div className="willwatch-col">
            <div className="willwatch-col-title">Watch list 📋</div>
            {this.state.willWatchList.length === 0 ? (
              <div className="willwatch-col-item">{`Empty will watch list 🙈`}</div>
            ) : (
              ''
            )}
            {this.state.willWatchList.map((movie) => {
              return (
                <div key={movie.id} className="willwatch-col-item">
                  {`${movie.title} ⭐ ${movie.vote_average}`}
                </div>
              );
            })}
          </div>
          <div className="movies-col">
            {this.state.moviesData
              .filter(
                (item) =>
                  item.backdrop_path !== null && item.poster_path !== null
              )
              .map((movie) => {
                return (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    removeMovieHandler={this.removeMovieHandler}
                    addToWillWatchList={this.addToWillWatchList}
                    removeFromWillWatchList={this.removeFromWillWatchList}
                    willWatch={this.state.willWatchList.some(
                      (m) => movie.id === m.id
                    )}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
