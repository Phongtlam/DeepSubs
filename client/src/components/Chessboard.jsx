import React from 'react';
import Board from 'react-chessdiagram';
import propTypes from 'prop-types';
import Chess from 'chess.js';
import SocketIo from '../socket_io_client/index';

import ChessFooter from './ChessFooter';

const styles = {
  board: {
    size: 60,
    light: '#ffffff',
    dark: '#808080',
  },
};

class Chessboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canMove: false,
    };
    this.engine = null;
    this._onMovePiece = this._onMovePiece.bind(this);
    this._initBoard = this._initBoard.bind(this);
    this._updateBoardListener = this._updateBoardListener.bind(this);
    this._onReconnect = this._onReconnect.bind(this);
    SocketIo.on('board-update', this._updateBoardListener);
    // SocketIo.on('reconnect', () => {
    //   SocketIo.open();
    //   this._onReconnect();
    // });
  }

  _onMovePiece(piece, from, to) {
    const username = this.props.profileData.username;
    this.engine.move({ piece, from, to });
    const newBoard = this.engine.fen();
    let isCheck = 'normal';
    if (this.engine.in_check() === true) {
      isCheck = 'check';
    }
    if (this.engine.in_checkmate() === true) {
      isCheck = 'check_mate';
    }
    SocketIo.emit('announcer', from, to, username, isCheck);
    SocketIo.emit('board-update', newBoard);
  }

  _onReconnect() {
    const newBoard = this.engine.fen();
    this.engine.load(newBoard);
    SocketIo.emit('board-update', newBoard);
    this.props.updateBoardAsync(newBoard);
  }

  _updateBoardListener(newBoard) {
    // listen to changes
    this.engine.load(newBoard);
    this.props.updateBoardAsync(newBoard);
  }

  _initBoard() {
    if (!this.engine) {
      this.engine = new Chess();
    } else {
      this.engine.reset();
    }
    this.setState({ canMove: true });
    this.props.startNewGameAsync();
  }

  render() {
    return (
      <div>
        <Board
          allowMoves={this.state.canMove}
          flip={this.props.side}
          fen={this.props.boardState}
          onMovePiece={this._onMovePiece}
          squareSize={styles.board.size}
          lightSquareColor={styles.board.light}
          darkSquareColor={styles.board.dark}
        />
        <ChessFooter
          {...this.props}
          initBoard={this._initBoard}
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
  profileData: propTypes.object,
};
Chessboard.defaultProps = {
  boardState: '',
  side: false,
  updateBoardAsync: propTypes.func,
  startNewGameAsync: propTypes.func,
  profileData: {},
};
