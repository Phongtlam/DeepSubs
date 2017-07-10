import React from 'react';
import propTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';
import '../styles/app.scss';

const styles = {
  marginLeft: '100px',
};

const ChessFooter = (props) => {
  let condRender = (
    <div>
      <Button onClick={props.pickWhite}>Play as White</Button>
      <Button onClick={props.pickBlack}>Play as Black</Button>
    </div>
  );
  if (props.boardState !== '' && props.boardState !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
    condRender = (!props.isTurn) ?
      <div className="turn-no">Not your turn</div> :
      <div className="turn-yes">Your turn</div>;
  }
  return (
    <div>
      <ButtonToolbar style={styles}>
        <Button bsStyle="primary" onClick={props.initBoard}>Start New Game</Button>
        {condRender}
      </ButtonToolbar>
    </div>
  );
};


export default ChessFooter;

ChessFooter.propTypes = {
  boardState: propTypes.string,
  isTurn: propTypes.bool,
  initBoard: propTypes.func,
  pickWhite: propTypes.func,
  pickBlack: propTypes.func,
};

ChessFooter.defaultProps = {
  boardState: '',
  isTurn: true,
  initBoard: propTypes.func,
  pickWhite: propTypes.func,
  pickBlack: propTypes.func,
};
