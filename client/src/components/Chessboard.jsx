import React from 'react';
import Board from 'react-chessdiagram';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Chess from 'chess.js';
import SocketIo from '../socket_io_client/index';

import ChessFooter from './ChessFooter';

import styles from '../styles/styles';

class Chessboard extends React.Component {
  constructor(props) {
    super(props);
    this.engine = null;
    this.onMovePiece = this.onMovePiece.bind(this);
    this.initBoard = this.initBoard.bind(this);
    this.updateBoardListener = this.updateBoardListener.bind(this);
    SocketIo.on('board-update', this.updateBoardListener);
    this.joinRoom = this.joinRoom.bind(this);
  }

  componentDidMount() {
    this.joinRoom();
  }

  onMovePiece(piece, from, to) {
    this.engine.move({ piece, from, to });
    const newBoard = this.engine.fen();
    SocketIo.emit('board-update', newBoard);
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
    SocketIo.emit('join-room', roomId);
  }

  render() {
    return (
      <div>
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

export default Chessboard;

Chessboard.propTypes = {
  boardState: propTypes.string,
  side: propTypes.bool,
  updateBoardAsync: propTypes.func,
  startNewGameAsync: propTypes.func,
  getGameIdAsync: propTypes.func,
};
Chessboard.defaultProps = {
  boardState: '',
  side: false,
  updateBoardAsync: propTypes.func,
  startNewGameAsync: propTypes.func,
  getGameIdAsync: propTypes.func,
};
