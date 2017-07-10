import React from 'react';
import propTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';
import '../styles/app.scss';

const styles = {
  marginLeft: '100px',
};

const ChessFooter = (props) => {
  let condRender = <Button bsStyle="primary" onClick={props.initBoard}>Start New Game</Button>;
  if (props.isPicking) {
    condRender = (
      <div>
        <Button onClick={props.pickWhite}>Play as White</Button>
        <Button onClick={props.pickBlack}>Play as Black</Button>
      </div>
    );
  } else if (props.boardState !== '' && props.boardState !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
    condRender = (!props.isTurn) ?
      (
        <div>
          <Button bsStyle="primary" onClick={props.initBoard}>Start New Game</Button>
          <div className="turn-no">Not your turn</div>
        </div>
      ) : (
        <div>
          <Button bsStyle="primary" onClick={props.initBoard}>Start New Game</Button>
          <div className="turn-yes">Your turn</div>
        </div>
      );
  }
  return (
    <div>
      <ButtonToolbar style={styles}>
        {condRender}
      </ButtonToolbar>
    </div>
  );
};


export default ChessFooter;

ChessFooter.propTypes = {
  boardState: propTypes.string,
  isPicking: propTypes.bool,
  isTurn: propTypes.bool,
  initBoard: propTypes.func,
  pickWhite: propTypes.func,
  pickBlack: propTypes.func,
};

ChessFooter.defaultProps = {
  boardState: '',
  isTurn: true,
  isPicking: false,
  initBoard: propTypes.func,
  pickWhite: propTypes.func,
  pickBlack: propTypes.func,
};
