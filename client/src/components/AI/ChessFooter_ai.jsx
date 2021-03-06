import React from 'react';
import propTypes from 'prop-types';
import '../../styles/chessfooter.scss';

const ChessFooterAi = (props) => {
  let status = <div />;
  if (props.isCheck) {
    status = <div className="turn-no">Checked</div>;
  } else if (props.isCheckMate) {
    status = <div className="turn-no">You lose</div>;
  }
  let condRender = (<div className="picking-container">
    <button className="btn start" onClick={props.initBoard}>Start New Game</button></div>);
  if (props.isPicking) {
    condRender = (
      <div className="picking-container">
        <button className="pick-white" onClick={props.pickWhiteAIAsync}>Play as White</button>
        <button className="pick-black" onClick={props.pickBlackAIAsync}>Play as Black</button>
      </div>
    );
  } else if (props.boardState !== '' && props.boardState !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
    condRender = (!props.isTurn) ?
      (
        <div className="picking-container">
          <button className="btn btn-primary" onClick={props.initBoard}>Start New Game</button>
          <div className="turn-no">Not your turn</div>
          {status}
        </div>
      ) : (
        <div className="picking-container">
          <button className="btn btn-primary" onClick={props.initBoard}>Start New Game</button>
          <div className="turn-yes">Your turn</div>
          {status}
        </div>
      );
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
  pickWhiteAIAsync: propTypes.func,
  pickBlackAIAsync: propTypes.func,
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
  pickWhiteAIAsync: propTypes.func,
  pickBlackAIAsync: propTypes.func,
};
