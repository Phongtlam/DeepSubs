import React from 'react';
import Board from 'react-chessdiagram';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Chess from 'chess.js';
import SocketIoClient from 'socket.io-client';

import { startNewGame, updateBoardAsync } from '../redux/actions/index';
import styles from '../styles/styles';

class Chessboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: false,
      roomId: '',
    };
    this.engine = null;
    this.socket = SocketIoClient();
    this.onMovePiece = this.onMovePiece.bind(this);
    this.initBoard = this.initBoard.bind(this);
    this.pickWhite = this.pickWhite.bind(this);
    this.pickBlack = this.pickBlack.bind(this);
    this.updateBoardListener = this.updateBoardListener.bind(this);
    this.socket.on('board-update', this.updateBoardListener);
    this.joinRoom = this.joinRoom.bind(this);
  }

  componentDidMount() {
    this.joinRoom();
  }

  onMovePiece(piece, from, to) {
    this.engine.move({ piece, from, to });
    const newBoard = this.engine.fen();
    this.socket.emit('board-update', newBoard);
    this.props.updateBoardAsync(newBoard);
  }

  updateBoardListener(newBoard) {
    // listen to changes from the other side
    this.engine.load(newBoard);
    this.props.updateBoardAsync(newBoard);
  }

  initBoard() {
    if (!this.engine) {
      this.engine = new Chess();
    } else {
      this.engine.reset();
    }
    this.props.startNewGame();
  }

  pickWhite() {
    this.setState({ player: false });
  }

  pickBlack() {
    this.setState({ player: true });
  }

  joinRoom() {
    const qs = location.search;
    const roomId = qs.slice(8, qs.length);
    this.setState({
      roomId,
    });
    this.socket.emit('join-room', roomId);
  }

  render() {
    return (
      <div>
        This is the room ID: {this.state.roomId}
        <Board
          flip={this.state.player}
          fen={this.props.boardState}
          onMovePiece={this.onMovePiece}
          squareSize={styles.board.size}
          lightSquareColor={styles.board.light}
          darkSquareColor={styles.board.dark}
        />
        <button onClick={this.initBoard}>Start New Game</button>
        <button onClick={this.pickWhite}>Player W</button>
        <button onClick={this.pickBlack}>Player B</button>
        <li><button onClick={this.joinRoom}>join room</button></li>
      </div>
    );
  }
}

const mapStateToProps = ({ board }) => {
  const { boardState } = board;
  return {
    boardState,
  };
};


export default connect(mapStateToProps, { startNewGame, updateBoardAsync })(Chessboard);

Chessboard.propTypes = {
  boardState: propTypes.string,
  updateBoardAsync: propTypes.func,
  startNewGame: propTypes.func,
};
Chessboard.defaultProps = {
  boardState: '',
  updateBoardAsync: propTypes.func,
  startNewGame: propTypes.func,
};
