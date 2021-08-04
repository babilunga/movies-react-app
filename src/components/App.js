import React from 'react';

import Filters from './Filters/Filters.js';
import MoiveList from './Movies/MoiveList.js';
import Header from './Header/Header.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';

export default class App extends React.Component {
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
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.updateFilters(name, value);
  };

  updateFilters = (name, value) => {
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [name]: value,
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

    return (
      <div className="container">
        <div className="wrapper main-template">
          <Header />
          <Filters
            page={page}
            total_pages={total_pages}
            filters={filters}
            updateFilters={this.updateFilters}
            onChangeFilters={this.onChangeFilters}
            updateValue={this.updateValue}
            with_genres={this.state.with_genres}
          />
          <MoiveList
            page={page}
            filters={filters}
            updateValue={this.updateValue}
          />
        </div>
      </div>
    );
  }
}
