import React from 'react';
import propTypes from 'prop-types';
import '../styles/chessfooter.scss';

const ChessFooter = (props) => {
  let condRender = <button className="btn btn-primary" onClick={props.initBoard}>Start New Game</button>;
  if (props.isPicking) {
    condRender = (
      <div>
        <button className="btn pick-white" onClick={props.pickWhite}>Play as White</button>
        <button className="btn pick-black" onClick={props.pickBlack}>Play as Black</button>
      </div>
    );
  } else if (props.boardState !== '' && props.boardState !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
    condRender = (!props.isTurn) ?
      (
        <div>
          <button className="btn btn-primary" onClick={props.initBoard}>Start New Game</button>
          <div className="turn-no">Not your turn</div>
        </div>
      ) : (
        <div >
          <button className="btn btn-primary" onClick={props.initBoard}>Start New Game</button>
          <div className="turn-yes">Your turn</div>
        </div>
      );
  }
  return (
    <div className="text-center">
      {condRender}
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
