import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import Spinner from './Spinner';
import ProfilePage from './ProfilePage';
import '../styles/home.scss';

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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentWillMount() {
    this.props.getProfileAsync();
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    let condRender = (
      <div>
        <NavBar />
        <ProfilePage />
      </div>
    );
    if (this.state.isLoading) {
      condRender = <Spinner />;
    }
    return (
      <div className="home">
        {condRender}
      </div>
    );
  }
}

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
  })(Home);

Home.propTypes = {
  getProfileAsync: propTypes.func,
};

Home.defaultProps = {
  getProfileAsync: propTypes.func,
};
