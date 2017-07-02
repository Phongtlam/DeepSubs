import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import propTypes from 'prop-types';
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
  getProfileAsync,
} from '../redux/actions/index';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.getProfile = this.getProfile.bind(this);
  }

  componentWillMount() {
    this.getProfile();
  }

  getProfile() {
    axios.get('/get-profile')
    .then((response) => {
      this.props.getProfileAsync(response.data);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <ChessHeader {...this.props} />
        </div>
        <div className="content">
          <div className="chessboard">
            <Chessboard {...this.props} />
          </div>
          <div className="chatterbox">
            <Chatterbox {...this.props} />
          </div>
        </div>
        <div className="footer">
          Copyright &copy; PhongLam 2017
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ board, room, chat, profile }) => {
  const { boardState } = board;
  const { gameId, side } = room;
  const { input } = chat;
  const { profileData } = profile;
  return {
    boardState,
    gameId,
    side,
    input,
    profileData,
  };
};


export default connect(mapStateToProps,
  { startNewGameAsync,
    updateBoardAsync,
    getGameIdAsync,
    pickWhiteAsync,
    pickBlackAsync,
    getInputAsync,
    getProfileAsync,
  })(App);

App.propTypes = {
  getProfileAsync: propTypes.func,
};

App.defaultProps = {
  getProfileAsync: propTypes.func,
};
