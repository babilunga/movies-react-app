import React from 'react';

// import MovieCard from './MovieCard.js';
// import MovieSortTabs from './MovieSortTabs.js';
// import Navigation from './Navigation.js';

import Filters from './Filters/Filters.js';
import MoiveList from './MoiveList.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';

// const getFetchRequest = ({ page, sort_by }) =>
//   fetch(
//     `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${sort_by}&page=${page}`
//   ).then((response) => response.json());

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     moviesData: [],
  //     willWatchList: [],
  //     sort_by: 'popularity.desc',
  //     page: 1,
  //     total_pages: null,
  //   };
  // }

  // getMovies = () => {
  //   const { page, sort_by } = this.state;
  //   getFetchRequest({ page, sort_by }).then((data) =>
  //     this.setState({
  //       moviesData: data.results,
  //       page: data.page,
  //       total_pages: data.total_pages,
  //     })
  //   );
  // };

  // componentDidMount = () => {
  //   this.getMovies();
  // };

  // componentDidUpdate(_prevProps, prevState) {
  //   if (
  //     prevState.sort_by !== this.state.sort_by ||
  //     prevState.page !== this.state.page
  //   ) {
  //     this.getMovies();
  //   }
  // }

  // removeMovieHandler = (id) => {
  //   this.removeFromWillWatchList(id);
  //   const newMovieList = this.state.moviesData.filter(
  //     (movie) => movie.id !== id
  //   );
  //   this.setState({
  //     moviesData: newMovieList,
  //   });
  // };

  // addToWillWatchList = (movie) => {
  //   const newWillWatchList = [...this.state.willWatchList, movie];
  //   this.setState({
  //     willWatchList: newWillWatchList,
  //   });
  // };

  // removeFromWillWatchList = (id) => {
  //   const newWillWatchList = this.state.willWatchList.filter(
  //     (movie) => movie.id !== id
  //   );
  //   this.setState({
  //     willWatchList: newWillWatchList,
  //   });
  // };

  // increasePageNumber = () => {
  //   const curentPage = this.state.page;
  //   this.setState({
  //     page: curentPage + 1,
  //   });
  // };

  // decreasePageNumber = () => {
  //   const curentPage = this.state.page;
  //   this.setState({
  //     page: curentPage - 1,
  //   });
  // };

  // resetWillWatchList = () => {
  //   this.setState({
  //     willWatchList: [],
  //   });
  // };

  // updateSortBy = (value) => {
  //   this.setState({
  //     sort_by: value,
  //   });
  // };

  constructor() {
    super();
    this.state = {
      filters: {
        sort_by: 'popularity.desc',
        primary_release_year: new Date().getFullYear(),
        with_genres: [],
      },
      page: 1,
      total_pages: 1,
    };
  }

  onChangeFilters = (e) => {
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [e.target.name]: e.target.value,
      },
    }));
  };

  updateValue = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { filters, page, total_pages } = this.state;

    console.log(
      'App\n\tfilters:',
      this.state.filters,
      '\n\tpage:',
      page,
      '\n\ttotal_pages',
      total_pages
    );

    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-4">
            <div className="card w-100">
              <div className="card-body p-4">
                <h2>Filters:</h2>
                <Filters
                  page={page}
                  total_pages={total_pages}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  updateValue={this.updateValue}
                  with_genres={this.state.with_genres}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <MoiveList
              page={page}
              filters={filters}
              updateValue={this.updateValue}
            />
          </div>
        </div>
      </div>
    );
  }
}
