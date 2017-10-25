import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Chessboard from './Chessboard';
import ChessboardAi from './AI/Chessboard_ai';
import Chatterbox from './Chatterbox';
import NavBar from './NavBar';
import '../styles/app.scss';

import {
  startNewGameAsync,
  updateBoardAsync,
  isMyTurnAsync,
  isNotMyTurnAsync,
  getGameIdAsync,
  pickWhiteAsync,
  pickBlackAsync,
  getProfileAsync,
  getInputAsync,
  appendMsgAsync,
  startPickAsync,
  endPickAsync,
  pickWhiteAIAsync,
  pickBlackAIAsync,
} from '../redux/actions/index';

const App = (props) => {
  const condRender = (props.isHuman) ?
    <Chessboard {...props} /> :
    <ChessboardAi {...props} />;

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="content">
          <div className="chessboard">
            {condRender}
          </div>
          <div className="chatterbox">
            <Chatterbox {...props} />
          </div>
        </div>
        <div className="footer">
          Copyright &copy; PhongLam 2017
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ board, room, profile, chatterbox }) => {
  const { boardState, isTurn, isPicking, isHuman, isAi, isAiBlack, isAiWhite } = board;
  const { gameId, side } = room;
  const { profileData } = profile;
  const { input, messages } = chatterbox;
  return {
    boardState,
    isTurn,
    isPicking,
    gameId,
    side,
    profileData,
    input,
    messages,
    isHuman,
    isAi,
    isAiBlack,
    isAiWhite,
  };
};


export default connect(mapStateToProps,
  { startNewGameAsync,
    updateBoardAsync,
    isMyTurnAsync,
    isNotMyTurnAsync,
    getGameIdAsync,
    pickWhiteAsync,
    pickBlackAsync,
    getProfileAsync,
    getInputAsync,
    appendMsgAsync,
    startPickAsync,
    endPickAsync,
    pickWhiteAIAsync,
    pickBlackAIAsync,
  })(App);

App.propTypes = {
  profileData: propTypes.object,
  isHuman: propTypes.bool,
  isAi: propTypes.bool,
};

App.defaultProps = {
  profileData: {},
  isHuman: true,
  isAi: propTypes.bool,
};
