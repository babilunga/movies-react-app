import React from 'react';

export default class MovieCard extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className="card" style={{ width: '100%' }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${
            item.backdrop_path || item.poster_path
          }`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
      </div>
    );
  }
}

// import React from 'react';
// import '../styles/style.css';
// import classNames from 'classnames/bind';

// export default class MovieCard extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       willWatch: false,
//     };
//   }

//   willWatchButtonHandler = (movie) => {
//     const curent = this.state.willWatch;
//     curent
//       ? this.props.removeFromWillWatchList(movie.id)
//       : this.props.addToWillWatchList(movie);
//     this.setState({
//       willWatch: !curent,
//     });
//   };

//   render() {
//     const { movie, removeMovieHandler, willWatch } = this.props;

//     return (
//       <div className="card">
//         <img
//           className="card-img"
//           src={`https://image.tmdb.org/t/p/w500${
//             movie.backdrop_path || movie.poster_path
//           }`}
//           alt=""
//         />
//         <div className="card-body">
//           <h4 className="card-title">{movie.title}</h4>
//           <div className="card-container">
//             <p className="card-rating">Rating: {movie.vote_average}</p>
//             <div className="card-buttons">
//               <button
//                 className={classNames('btn__green', 'btn-default', {
//                   'btn-apply': willWatch,
//                 })}
//                 onClick={() => this.willWatchButtonHandler(movie)}
//               >
//                 Will Watch 📥
//               </button>

//               <button
//                 className="btn__red btn-default"
//                 onClick={removeMovieHandler.bind(null, movie.id)}
//               >
//                 Remove ✂️
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
