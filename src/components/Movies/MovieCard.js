import React from "react";
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "../../utils/api";

import StarOutlined from "@material-ui/icons/StarBorderOutlined";
import StarFilled from "@material-ui/icons/StarOutlined";
import BookmarkOutlined from "@material-ui/icons/BookmarkBorderOutlined";
import BookmarkFilled from "@material-ui/icons/BookmarkOutlined";

class MovieCard extends React.Component {
  updateValue = (name) => {
    this.setState((prevState) => ({
      [name]: !prevState[name]
    }));
  };

  componentDidMount() {
    // if (this.props.user) {
    //   this.getFavoriteList("favorite").then((list) =>
    //     this.updateValue("favorite", list)
    //   );
    //   this.getFavoriteList("watchlist").then((list) =>
    //     this.updateValue("watchlist", list)
    //   );
    // }
  }

  // addToFavoriteList = () => {
  //   const { session_id, item, user } = this.props;

  //   const options = {
  //     params: {
  //       "Content-Type": "application/json;charset=utf-8",
  //       session_id: session_id
  //     },
  //     body: {
  //       media_type: "movie",
  //       media_id: id,
  //       [listType]: !isAddFavorite
  //     }
  //   };

  //   this.updateValue(listType, isAddFavorite);
  //   CallApi.post(`/account/${user.id}/${listType}`, options).then(() => {
  //     this.getFavoriteList(listType, !isAddFavorite);
  //   });
  // };

  addFavorite = () => {
    const { session_id, toggleLoginModal, user, item } = this.props;

    if (!session_id) {
      toggleLoginModal();
      return;
    }

    const options = {
      params: {
        "Content-Type": "application/json;charset=utf-8",
        session_id: session_id
      },
      body: {
        media_type: "movie",
        media_id: item.id,
        favorite: !this.isFavorite()
      }
    };
    CallApi.post(`/account/${user.id}/favorite`, options).then(() => {
      this.props.getFavoriteMovies(user, session_id);
    });
  };

  // getFavoriteList = (listType) => {
  //   const { session_id, user } = this.props;
  //   const options = {
  //     params: {
  //       session_id,
  //       language: "en-US",
  //       sort_by: "created_at.asc",
  //       page: 1
  //     }
  //   };

  //   return CallApi.get(`/account/${user.id}/${listType}/movies`, options).then(
  //     ({ results }) => {
  //       return results;
  //     }
  //   );
  // };

  isFavorite = () => {
    return this.props.favorite.some((m) => m.id === this.props.item.id);
  }

  render() {
    const { item } = this.props;
    const imgPath = item.backdrop_path || item.poster_path;
    return (
      <div className="card movie_card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height img-cover"
          src={`https://image.tmdb.org/t/p/w500${imgPath}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>

          {/* <button
            className="btn btn-light bg-white float-end"
            style={{ border: "none" }}
            onClick={this.handleClick.bind(null, item.id, "watchlist")}
          >
            {watchlist ? (
              <BookmarkFilled fontSize="large" />
            ) : (
              <BookmarkOutlined fontSize="large" />
            )}
          </button> */}

          <button
            className="btn btn-light bg-white float-end me-2"
            style={{ border: "none" }}
            onClick={this.addFavorite.bind(null)}
          >
            {this.isFavorite() ? (
              <StarFilled fontSize="large" />
            ) : (
              <StarOutlined fontSize="large" />
            )}
          </button>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MovieCard);
