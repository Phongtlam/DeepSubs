import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Chessboard from './Chessboard';
import Chatterbox from './Chatterbox';
import '../styles/app.scss';

import {
  startNewGameAsync,
  updateBoardAsync,
  getGameIdAsync,
  pickWhiteAsync,
  pickBlackAsync,
  getProfileAsync,
  getInputAsync,
  appendMsgAsync,
} from '../redux/actions/index';

const App = props => (
  <div>
    <div className="container">
      <a href="/logout" className="logout btn btn-warning btn">
        <span className="fa fa-sign-out" /> Logout</a>
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
  const { boardState } = board;
  const { gameId, side } = room;
  const { profileData } = profile;
  const { input, messages } = chatterbox;
  return {
    boardState,
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
    getGameIdAsync,
    pickWhiteAsync,
    pickBlackAsync,
    getProfileAsync,
    getInputAsync,
    appendMsgAsync,
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
