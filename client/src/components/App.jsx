import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Chessboard from './Chessboard';
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
} from '../redux/actions/index';

const App = props => (
  <div>
    <NavBar />
    <div className="container">
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
  </div>

);

const mapStateToProps = ({ board, room, profile, chatterbox }) => {
  const { boardState, isTurn, isPicking } = board;
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
  })(App);

App.propTypes = {
  getProfileAsync: propTypes.func,
  getGameIdAsync: propTypes.func,
  profileData: propTypes.object,
};

App.defaultProps = {
  getProfileAsync: propTypes.func,
  getGameIdAsync: propTypes.func,
  profileData: {},
};
