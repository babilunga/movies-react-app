import React from 'react';
import './styles.css';
import { API_URL, API_KEY_3 } from './utils/api.js';
import MovieCard from './MovieCard.js';
import MovieSortTabs from './MovieSortTabs.js';
import Navigation from './Navigation.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      moviesData: [],
      willWatchList: [],
      sort_by: 'popularity.desc',
      page: 1,
    };
  }

  componentDidMount = () => this.getMovies();

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies();
    }
    if (prevState.page !== this.state.page) {
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
    if (curentPage < 1000) {
      this.setState({
        page: curentPage + 1,
      });
    } else {
      alert('This is the last page!');
    }
  };

  decreasePageNumber = () => {
    const curentPage = this.state.page;
    if (curentPage > 1) {
      this.setState({
        page: curentPage - 1,
      });
    } else {
      alert('This is the first page!');
    }
  };

  getMovies = () =>
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          moviesData: data.results,
        })
      );

  // TODO:
  // resetWillWatchList = () => {
  //   this.state.willWatchList.map((willWatchItem) => {
  //     this.state.moviesData.filter((movie) => movie.id !== willWatchItem.id);
  //   });
  //   this.setState({
  //     willWatchList: [],
  //   });
  // };

  updateSortBy = (value) => {
    this.setState({
      sort_by: value,
    });
  };

  render() {
    return (
      <div className="container">
        {/* <div className="reset">
          <button
            className="btn-default btn-reset"
            // onClick={this.resetWillWatchList.bind(this)}
          >
            Reset will watch List 📃 (not working)
          </button>
        </div> */}
        <Navigation
          page={this.state.page}
          increasePageNumber={this.increasePageNumber}
          decreasePageNumber={this.decreasePageNumber}
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
                  />
                );
              })}
          </div>
        </div>
        {/* <Navigation
          page={this.state.page}
          increasePageNumber={this.increasePageNumber}
          decreasePageNumber={this.decreasePageNumber}
        /> */}
      </div>
    );
  }
}
