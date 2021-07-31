import React from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends React.PureComponent {
  static propTypes = {
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired,
    updateValue: PropTypes.func.isRequired,
  };

  render() {
    const { page, total_pages, updateValue } = this.props;

    // console.log(`Pagination\n\tpage: ${page}\n\ttotal_pages: ${total_pages}`);

    return (
      <div className="d-flex justify-content-between mt-3 m-auto">
        <button
          className="btn btn-outline-dark"
          disabled={page === 1}
          type="button"
          onClick={updateValue.bind(null, 'page', page - 1)}
        >
          {'Previous'}
        </button>
        <div className="align-self-center">
          <span className="fs-6">{`${page} of ${total_pages}`}</span>
        </div>
        <button
          className="btn btn-outline-dark"
          type="button"
          onClick={updateValue.bind(null, 'page', page + 1)}
        >
          {'Next'}
        </button>
      </div>
    );
  }
}
