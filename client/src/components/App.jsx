import React from 'react';
import { connect } from 'react-redux';
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
  getProfileAsync,
} from '../redux/actions/index';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.joinRoom = this.joinRoom.bind(this);
    this.joinRoom();
  }

  componentWillMount() {
    this.props.getProfileAsync();
  }

  joinRoom() {
    const qs = location.search;
    const gameId = qs.slice(8, qs.length);
    this.props.getGameIdAsync(gameId);
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

const mapStateToProps = ({ board, room, profile }) => {
  const { boardState } = board;
  const { gameId, side } = room;
  const { profileData } = profile;
  return {
    boardState,
    gameId,
    side,
    profileData,
  };
};


export default connect(mapStateToProps,
  { startNewGameAsync,
    updateBoardAsync,
    getGameIdAsync,
    pickWhiteAsync,
    pickBlackAsync,
    getProfileAsync,
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
