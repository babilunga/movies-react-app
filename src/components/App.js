//v001
import React from 'react';

import Header from './Header/Header.js';
import LoginModal from './Header/Login/LoginModal';
import MoviesListPage from './Pages/MoviesListPage/MoviesListPage';
import MoviePage from './Pages/MoviePage/MoviePage';

import CallApi from './../utils/api.js';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import SimpleReactLightbox from 'simple-react-lightbox';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';

import Cookies from 'universal-cookie';
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
    };
  }

  toggleLoginModal = () => {
    this.setState((prevState) => ({
      showLoginModal: !prevState.showLoginModal,
    }));
  };

  updateValue = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  updateSessionId = (session_id) => {
    cookies.set('session_id', session_id, {
      path: '/',
      maxAge: 2592000,
    });
    this.updateValue('session_id', session_id);
  };

  onLogOut = () => {
    cookies.remove('session_id');
    this.setState({
      user: null,
      session_id: null,
    });
  };

  getMarkedMoviesList = (user, session_id, listType) => {
    const options = {
      params: {
        session_id,
        language: 'en-US',
        sort_by: 'created_at.asc',
        page: 1,
      },
    };

    return CallApi.get(`/account/${user.id}/${listType}/movies`, options).then(
      ({ results }) => {
        this.setState({
          [listType]: results,
        });
      }
    );
  };

  componentDidMount() {
    const session_id = cookies.get('session_id');
    if (session_id) {
      CallApi.get('/account', {
        params: {
          session_id,
        },
      }).then((user) => {
        this.updateValue('user', user);
        this.updateValue('session_id', session_id);
        this.getMarkedMoviesList(user, session_id, 'favorite');
        this.getMarkedMoviesList(user, session_id, 'watchlist');
      });
    }
  }

  render() {
    const { user, session_id, showLoginModal, favorite, watchlist } =
      this.state;

    return (
      <Router>
        <AppContext.Provider
          value={{
            user,
            updateValue: this.updateValue,
            updateSessionId: this.updateSessionId,
            session_id,

            showLoginModal,
            toggleLoginModal: this.toggleLoginModal,
            onLogOut: this.onLogOut,

            getMarkedMoviesList: this.getMarkedMoviesList,
            favorite: favorite,
            watchlist: watchlist,
          }}
        >
          <Header user={user} />

          <Route exact path="/" component={MoviesListPage} />

          <Route path="/movie/:id" component={MoviePage} />

          <LoginModal />
        </AppContext.Provider>
      </Router>
    );
  }
}
