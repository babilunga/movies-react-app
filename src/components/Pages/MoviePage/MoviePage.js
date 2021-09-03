import React, { useState } from 'react';
import CallApi from '../../../utils/api';
import AppContextHOC from '../../HOC/AppContextHOC';
import Details from './MoviePageTabs/Details';
import Videos from './MoviePageTabs/Videos';
import Credits from './MoviePageTabs/Credits';
import ButtonFavorite from '../../UIComponents/ButtonFavorite';
import ButtonWatchlist from '../../UIComponents/ButtonWatchlist';

import { Route, Switch, Link } from 'react-router-dom';

import { TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class MoviePage extends React.Component {
  state = {
    movie: '',
    activeTab: 1,
  };

  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`).then((results) => {
      this.setState({
        movie: results,
      });
    });
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) this.setActiveTab(tab);
  };

  setActiveTab = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };

  render() {
    const {
      movie: { poster_path },
      movie: { overview },
      movie: { id },
      movie: { title },
      movie,
      activeTab,
    } = this.state;

    return (
      <div className="container-m mt-5">
        <div className="row">
          <div className="col-4 text-center">
            <img
              style={{ width: '75%' }}
              className="rounded float-end"
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
            />
          </div>
          <div className="col-6">
            <div className="card p-3">
              <h1 className="text fw-bold ">{title}</h1>
              <p className="text fs-5 mb-3">{overview}</p>
              <div className="row justify-content-end">
                <div className="col-1">
                  <ButtonWatchlist id={id} />
                </div>
                <div className="col-1">
                  <ButtonFavorite id={id} />
                </div>
              </div>

              <div>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames(
                        {
                          active: activeTab === '1',
                        },
                        'tab-link'
                      )}
                      onClick={() => {
                        this.toggle('1');
                      }}
                    >
                      <Link
                        className="text-decoration-none fw-bold text-dark text-uppercase"
                        to={`/movie/${id}/details`}
                      >
                        Details
                      </Link>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames(
                        {
                          active: activeTab === '2',
                        },
                        'tab-link'
                      )}
                      onClick={() => {
                        this.toggle('2');
                      }}
                    >
                      <Link
                        className="text-decoration-none fw-bold text-dark text-uppercase"
                        to={`/movie/${id}/videos`}
                      >
                        Videos
                      </Link>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames(
                        {
                          active: activeTab === '3',
                        },
                        'tab-link'
                      )}
                      onClick={() => {
                        this.toggle('3');
                      }}
                    >
                      <Link
                        className="text-decoration-none fw-bold text-dark text-uppercase"
                        to={`/movie/${id}/credits`}
                      >
                        Credits
                      </Link>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <Switch>
                    <Route exact path={`/movie/${id}/details`}>
                      <Details movie={movie} />
                    </Route>
                    <Route exact path={`/movie/${id}/videos`}>
                      <Videos id={id} />
                    </Route>
                    <Route exact path={`/movie/${id}/credits`}>
                      <Credits id={id} />
                    </Route>
                    <Route>
                      <div className="text fs-4 mt-3 ms-3 text-secondary">
                        Chech film details...
                      </div>
                    </Route>
                  </Switch>
                </TabContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MoviePage);
