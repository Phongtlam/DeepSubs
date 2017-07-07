import React from 'react';
import propTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';

const styles = {
  marginLeft: '100px',
}

const ChessFooter = props => (
  <div>
    <ButtonToolbar style={styles}>
      <Button bsStyle="success" onClick={props.initBoard}>Start New Game</Button>
      <Button onClick={props.pickWhiteAsync}>Play as White</Button>
      <Button onClick={props.pickBlackAsync}>Play as Black</Button>
    </ButtonToolbar>
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
};
