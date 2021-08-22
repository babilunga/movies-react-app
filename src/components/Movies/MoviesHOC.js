import React from "react";
import CallApi from "../../utils/api";

export default (Component) =>
  class MoviesHOC extends React.Component {
    constructor() {
      super();
      this.state = {
        movies: []
      };
    }

    getMovies = (filters, page) => {
      const { sort_by, primary_release_year, with_genres } = filters;

      const queryStringParams = {
        language: "ru-RU",
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year
      };

      // Forming genres list
      if (with_genres.length !== 0) {
        queryStringParams.with_genres = with_genres.join(",");
      }

      // Fetch request
      CallApi.get("/discover/movie", { params: queryStringParams }).then(
        (data) => {
          this.props.updateValue("page", data.page);
          this.props.updateValue("total_pages", data.total_pages);
          this.setState({
            movies: data.results
          });
        }
      );
    };

    componentDidMount() {
      const { filters, page } = this.props;

      this.getMovies(filters, page);
    }

    componentDidUpdate(prevProps) {
      const { filters, page } = this.props;

      if (this.props.filters !== prevProps.filters) {
        this.props.updateValue("page", 1);
        this.getMovies(filters, page);
      }

      if (this.props.page !== prevProps.page) {
        this.getMovies(filters, page);
      }
    }

    render() {
      return <Component movies={this.state.movies} />;
    }
  };
