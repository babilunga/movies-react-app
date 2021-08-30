import React from 'react';
import AppContextHOC from '../HOC/AppContextHOC';

import BookmarkOutlined from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkFilled from '@material-ui/icons/BookmarkOutlined';

class ButtonWatchlist extends React.Component {
  render() {
    return (
      <button
        className="btn btn-light bg-white m-0 p-0 pe-3 ps-3"
        style={{ border: 'none' }}
        onClick={this.props.handleClick}
      >
        {this.props.isActive() ? (
          <BookmarkFilled fontSize="large" />
        ) : (
          <BookmarkOutlined fontSize="large" />
        )}
      </button>
    );
  }
}

export default AppContextHOC(ButtonWatchlist);
