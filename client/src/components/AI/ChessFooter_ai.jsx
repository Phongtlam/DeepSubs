import React from 'react';
import propTypes from 'prop-types';
import '../../styles/chessfooter.scss';

const ChessFooterAi = (props) => {
  let condRender = (<div className="picking-container">
    <button className="btn start" onClick={props.initBoard}>Start New Game</button></div>);
  if (props.isPicking) {
    condRender = (
      <div className="picking-container">
        <button className="pick-white" onClick={props.pickWhiteAsync}>Play as White</button>
        <button className="pick-black" onClick={props.pickBlackAsync}>Play as Black</button>
      </div>
    );
  } else if (props.boardState !== '' && props.boardState !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
    if (props.isCheck) {
      condRender =
      (<div className="picking-container">
        <button className="btn btn-primary" onClick={props.initBoard}>Restart Game</button>
        <div className="turn-no">Checked!</div>
      </div>);
    } else if (props.isCheckMate) {
      condRender =
      (<div className="picking-container">
        <button className="btn btn-primary" onClick={props.initBoard}>Restart Game</button>
        <div className="turn-no">You lose!</div>
      </div>);
    } else {
      condRender = (props.isTurn) ?
      (
        <div className="picking-container">
          <button className="btn btn-primary" onClick={props.initBoard}>Restart Game</button>
          <div className="turn-yes">Your turn</div>
        </div>
      ) : (
        <div className="picking-container">
          <button className="btn btn-primary" onClick={props.initBoard}>Restart Game</button>
          <div className="turn-no">Not your turn</div>
        </div>
      );
    }
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
  pickWhiteAsync: propTypes.func,
  pickBlackAsync: propTypes.func,
  isCheck: propTypes.bool,
  isCheckMate: propTypes.bool,
};

ChessFooterAi.defaultProps = {
  boardState: '',
  isCheck: false,
  isCheckMate: false,
  isTurn: true,
  isPicking: false,
  initBoard: propTypes.func,
  pickWhiteAsync: propTypes.func,
  pickBlackAsync: propTypes.func,
};
