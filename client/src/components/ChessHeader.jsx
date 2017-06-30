import React from 'react';
import propTypes from 'prop-types';

const ChessHeader = props => (
  <div>
    This is the room ID: {props.gameId}
  </div>
);

export default ChessHeader;

ChessHeader.propTypes = {
  gameId: propTypes.string,
};

ChessHeader.defaultProps = {
  gameId: '',
};
