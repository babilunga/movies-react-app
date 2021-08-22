import React from "react";
import CallApi from "../../utils/api";

export default (Container) =>
  class GenresHOC extends React.Component {
    constructor() {
      super();

      this.state = {
        genresList: []
      };
    }

    componentDidMount() {
      CallApi.get("/genre/movie/list").then((data) => {
        this.setState({
          genresList: data.genres
        });
      });
    }

    onChange = (e) => {
      const value = e.target.checked
        ? [...this.props.with_genres, e.target.value]
        : this.props.with_genres.filter((g) => g !== e.target.value);

      this.props.updateFilters("with_genres", value);
    };

    resetGenres = () => {
      this.props.updateFilters("with_genres", []);
    };

    render() {
      const { genresList } = this.state;
      const { with_genres } = this.props;

      return (
        <Container
          genresList={genresList}
          with_genres={with_genres}
          resetGenres={this.resetGenres}
          onChange={this.onChange}
        />
      );
    }
  };
