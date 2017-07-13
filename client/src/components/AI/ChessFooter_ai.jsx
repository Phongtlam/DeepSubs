import React from 'react';
import propTypes from 'prop-types';
import '../../styles/chessfooter.scss';

const ChessFooterAi = (props) => {
  let condRender = (<div className="picking-container">
    <button className="btn start" onClick={props.initBoard}>Start New Game</button></div>);
  if (props.isPicking) {
    condRender = (
      <div className="picking-container">
        <button className="pick-white" onClick={props.pickWhite}>Play as White</button>
        <button className="pick-black" onClick={props.pickBlack}>Play as Black</button>
      </div>
    );
  } else if (props.boardState !== '' && props.boardState !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
    condRender =
      (<div className="picking-container">
        <button className="btn btn-primary" onClick={props.initBoard}>Restart Game</button>
      </div>);
  }
  return (
    <div>
      {condRender}
    </div>
  );
};


export default ChessFooterAi;

ChessFooterAi.propTypes = {
  boardState: propTypes.string,
  isPicking: propTypes.bool,
  isTurn: propTypes.bool,
  initBoard: propTypes.func,
  pickWhite: propTypes.func,
  pickBlack: propTypes.func,
};

ChessFooterAi.defaultProps = {
  boardState: '',
  isTurn: true,
  isPicking: false,
  initBoard: propTypes.func,
  pickWhite: propTypes.func,
  pickBlack: propTypes.func,
};
