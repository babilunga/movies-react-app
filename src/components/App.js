import React from "react";

import Filters from "./Filters/Filters.js";
import Movies from "./Movies/Movies.js";
import Header from "./Header/Header.js";
import LoginModal from "./Header/Login/LoginModal";
import CallApi from "./../utils/api.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      session_id: null,
      showLoginModal: false,

      favorite: [],
      watchlist: [],

      filters: {
        sort_by: "popularity.desc",
        primary_release_year: new Date().getFullYear(),
        with_genres: []
      },
      page: 1,
      total_pages: 1
    };
  }

  toggleLoginModal = () => {
    this.setState((prevState) => ({
      showLoginModal: !prevState.showLoginModal
    }));
  };

  onChangeFilters = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.updateFilters(name, value);
  };

  updateFilters = (name, value) => {
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  updateValue = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  updateSessionId = (session_id) => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.updateValue("session_id", session_id);
  };

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      user: null,
      session_id: null
    });
  };

  getFavoriteMovies = (user, session_id) => {
    const options = {
      params: {
        session_id,
        language: "en-US",
        sort_by: "created_at.asc",
        page: 1
      }
    };

    return CallApi.get(`/account/${user.id}/favorite/movies`, options).then(
      ({ results }) => {
        this.setState({
          favorite: results
        });
      }
    );
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");

    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id
        }
      }).then((user) => {
        this.updateValue("user", user);
        this.updateValue("session_id", session_id);
        this.getFavoriteMovies(user, session_id);
      });
    }
  }

  render() {
    const {
      filters,
      page,
      total_pages,
      user,
      session_id,
      showLoginModal
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          user,
          updateValue: this.updateValue,
          updateSessionId: this.updateSessionId,
          session_id,
          showLoginModal,
          toggleLoginModal: this.toggleLoginModal,
          onLogOut: this.onLogOut,
          getFavoriteMovies: this.getFavoriteMovies,
          favorite: this.state.favorite
        }}
      >
        <div className="container">
          <div className="wrapper main-template">
            <Header user={user} />
            <Filters
              page={page}
              total_pages={total_pages}
              filters={filters}
              updateFilters={this.updateFilters}
              onChangeFilters={this.onChangeFilters}
              updateValue={this.updateValue}
              with_genres={this.state.with_genres}
            />
            <Movies
              page={page}
              filters={filters}
              updateValue={this.updateValue}
            />
          </div>
        </div>
        <LoginModal />
      </AppContext.Provider>
    );
  }
}
