import React from 'react';
import Board from 'react-chessdiagram';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Chess from 'chess.js';
import SocketIoClient from 'socket.io-client';

import ChessFooter from './ChessFooter';

import {
  startNewGameAsync,
  updateBoardAsync,
  getGameIdAsync,
  pickWhiteAsync,
  pickBlackAsync,
} from '../redux/actions/index';

import styles from '../styles/styles';

class Chessboard extends React.Component {
  constructor(props) {
    super(props);
    this.engine = null;
    this.socket = SocketIoClient();
    this.onMovePiece = this.onMovePiece.bind(this);
    this.initBoard = this.initBoard.bind(this);
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
    this.props.startNewGameAsync();
  }

  joinRoom() {
    const qs = location.search;
    const roomId = qs.slice(8, qs.length);
    this.props.getGameIdAsync(roomId);
    this.socket.emit('join-room', roomId);
  }

  render() {
    return (
      <div>
        This is the room ID: {this.props.gameId}
        <Board
          flip={this.props.side}
          fen={this.props.boardState}
          onMovePiece={this.onMovePiece}
          squareSize={styles.board.size}
          lightSquareColor={styles.board.light}
          darkSquareColor={styles.board.dark}
        />
        <ChessFooter
          {...this.props}
          initBoard={this.initBoard}
        />
      </div>
    );
  }
}

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
  })(Chessboard);

Chessboard.propTypes = {
  gameId: propTypes.string,
  boardState: propTypes.string,
  side: propTypes.bool,
  updateBoardAsync: propTypes.func,
  startNewGameAsync: propTypes.func,
  getGameIdAsync: propTypes.func,
};
Chessboard.defaultProps = {
  gameId: '',
  boardState: '',
  side: false,
  updateBoardAsync: propTypes.func,
  startNewGameAsync: propTypes.func,
  getGameIdAsync: propTypes.func,
};
