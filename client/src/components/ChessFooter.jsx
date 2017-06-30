import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ChessFooter = props => (
  <div className="text center">
    <Button bsStyle="primary" onClick={props.initBoard}>Start New Game</Button>
    <Button onClick={props.pickWhiteAsync}>Play as White</Button>
    <Button onClick={props.pickBlackAsync}>Play as Black</Button>
  </div>
);

export default ChessFooter;

ChessFooter.propTypes = {
  initBoard: propTypes.func,
  pickWhiteAsync: propTypes.func,
  pickBlackAsync: propTypes.func,
};

ChessFooter.defaultProps = {
  initBoard: propTypes.func,
  pickWhiteAsync: propTypes.func,
  pickBlackAsync: propTypes.func,
}
