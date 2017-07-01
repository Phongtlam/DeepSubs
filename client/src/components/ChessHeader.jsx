import React from 'react';
import propTypes from 'prop-types';
import { Panel, Label } from 'react-bootstrap';

const ChessHeader = props => (
  <div>
    Room Id: {props.gameId}
  </div>
);

export default ChessHeader;

ChessHeader.propTypes = {
  gameId: propTypes.string,
};

ChessHeader.defaultProps = {
  gameId: '',
};
