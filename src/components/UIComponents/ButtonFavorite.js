import React from 'react';
import AppContextHOC from '../HOC/AppContextHOC';

import StarOutlined from '@material-ui/icons/StarBorderOutlined';
import StarFilled from '@material-ui/icons/StarOutlined';

class ButtonFavorite extends React.Component {
  render() {
    return (
      <button
        className="btn btn-light bg-white m-0 p-0 pe-3 ps-3"
        style={{ border: 'none' }}
        onClick={this.props.handleClick}
      >
        {this.props.isActive() ? (
          <StarFilled fontSize="large" />
        ) : (
          <StarOutlined fontSize="large" />
        )}
      </button>
    );
  }
}

export default AppContextHOC(ButtonFavorite);
