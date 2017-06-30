import React from 'react';
import propTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';

const ChessHeader = props => (
  <div>
    <Navbar>
      <Navbar.Brand>
        <a href="#">Brand</a>
      </Navbar.Brand>
    </Navbar>
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
