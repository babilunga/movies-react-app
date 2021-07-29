import React from 'react';

// import MovieCard from './MovieCard.js';
// import MovieSortTabs from './MovieSortTabs.js';
// import Navigation from './Navigation.js';

import Filters from './Filters.js';
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
      },
    };
  }

  onChangeFilters = (e) => {
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [e.target.name]: e.target.value,
      },
    }));
    // console.log(e.target.name, e.target.value);
  };

  render() {
    const { filters } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card w-100">
              <div className="card-body">
                <h2>Filters:</h2>
                <Filters
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <MoiveList filters={filters} />
          </div>
        </div>
      </div>
      // <div className="container">
      //   <div className="reset">
      //     <button
      //       className="btn-default btn-reset"
      //       onClick={this.resetWillWatchList.bind(this)}
      //     >
      //       Reset will watch List 📃
      //     </button>
      //   </div>
      //   <Navigation
      //     page={this.state.page}
      //     increasePageNumber={this.increasePageNumber}
      //     decreasePageNumber={this.decreasePageNumber}
      //     total_pages={this.state.total_pages}
      //   />
      //   <MovieSortTabs
      //     sort_by={this.state.sort_by}
      //     updateSortBy={this.updateSortBy}
      //   />
      //   <div className="main">
      //     <div className="willwatch-col">
      //       <div className="willwatch-col-title">Watch list 📋</div>
      //       {this.state.willWatchList.length === 0 ? (
      //         <div className="willwatch-col-item">{`Empty will watch list 🙈`}</div>
      //       ) : (
      //         ''
      //       )}
      //       {this.state.willWatchList.map((movie) => {
      //         return (
      //           <div key={movie.id} className="willwatch-col-item">
      //             {`${movie.title} ⭐ ${movie.vote_average}`}
      //           </div>
      //         );
      //       })}
      //     </div>
      //     <div className="movies-col">
      //       {this.state.moviesData
      //         .filter(
      //           (item) =>
      //             item.backdrop_path !== null && item.poster_path !== null
      //         )
      //         .map((movie) => {
      //           return (
      //             <MovieCard
      //               key={movie.id}
      //               movie={movie}
      //               removeMovieHandler={this.removeMovieHandler}
      //               addToWillWatchList={this.addToWillWatchList}
      //               removeFromWillWatchList={this.removeFromWillWatchList}
      //               willWatch={this.state.willWatchList.some(
      //                 (m) => movie.id === m.id
      //               )}
      //             />
      //           );
      //         })}
      //     </div>
      //   </div>
      // </div>
    );
  }
}
