import React from 'react';
import { connect } from 'react-redux';
import Chessboard from './Chessboard';
import ChessHeader from './ChessHeader';
import Chatterbox from './Chatterbox';
import '../styles/app.scss';

import {
  startNewGameAsync,
  updateBoardAsync,
  getGameIdAsync,
  pickWhiteAsync,
  pickBlackAsync,
  getInputAsync,
} from '../redux/actions/index';


const App = props => (
  <div className="container">
    <div className="header">
      <ChessHeader {...props} />
    </div>
    <div className="content">
      <div className="chessboard">
        <Chessboard {...props} />
      </div>
      <div className="chatterbox">
        <Chatterbox {...props} />
      </div>
    </div>
    <div className="footer">
      Copyright &copy; PhongLam 2017
    </div>
  </div>
);

const mapStateToProps = ({ board, room, chat }) => {
  const { boardState } = board;
  const { gameId, side } = room;
  const { input } = chat;
  return {
    boardState,
    gameId,
    side,
    input,
  };
};


export default connect(mapStateToProps,
  { startNewGameAsync,
    updateBoardAsync,
    getGameIdAsync,
    pickWhiteAsync,
    pickBlackAsync,
    getInputAsync,
  })(App);
