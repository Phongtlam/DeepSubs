import React from 'react';
import { connect } from 'react-redux';
import Chessboard from './Chessboard';
import ChessHeader from './ChessHeader';

import {
  startNewGameAsync,
  updateBoardAsync,
  getGameIdAsync,
  pickWhiteAsync,
  pickBlackAsync,
} from '../redux/actions/index';


const App = props => (
  <div>
    <ChessHeader {...props} />
    <Chessboard {...props} />
  </div>
);

const mapStateToProps = ({ board, room }) => {
  const { boardState } = board;
  const { gameId, side } = room;
  return {
    boardState,
    gameId,
    side,
  };
};


export default connect(mapStateToProps,
  { startNewGameAsync,
    updateBoardAsync,
    getGameIdAsync,
    pickWhiteAsync,
    pickBlackAsync,
  })(App);
