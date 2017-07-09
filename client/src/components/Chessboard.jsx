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

let Engine;

class Chessboard extends React.Component {
  constructor(props) {
    super(props);
    Engine = null;
    this._onMovePiece = this._onMovePiece.bind(this);
    this._initBoard = this._initBoard.bind(this);
    this._updateBoardListener = this._updateBoardListener.bind(this);
    this._onReconnect = this._onReconnect.bind(this);
    this._checkStatus = this._checkStatus.bind(this);
    SocketIo.on('board-update', this._updateBoardListener);
    SocketIo.on('disconnect', this._onReconnect, () => {
      SocketIo.open();
    });
  }

  componentWillMount() {
    this._checkStatus();
  }

  componentWillUnmount() {
    Engine.clear();
  }

  _checkStatus() {
    if (Engine && this.props.boardState.length > 0) {
      this.props.isMyTurnAsync();
    }
    Engine = new Chess(this.props.boardState);
  }

  _onMovePiece(piece, from, to) {
    const username = this.props.profileData.username;
    // Engine.move({ piece, from, to });
    Engine.move({ from, to });
    const newBoard = Engine.fen();
    console.log('new board is', newBoard)
    let isCheck = 'normal';
    if (Engine.in_check() === true) {
      isCheck = 'check';
    }
    if (Engine.in_checkmate() === true) {
      isCheck = 'check_mate';
    }
    if (this.props.boardState !== newBoard) {
      console.log('is true');
      this.props.isNotMyTurnAsync();
      this.props.updateBoardAsync(newBoard, username);
      SocketIo.emit('announcer', from, to, username, isCheck);
    }
  }

  _onReconnect() {
    const newBoard = Engine.fen();
    Engine.load(newBoard);
    this.props.updateBoardAsync(newBoard);
  }

  _updateBoardListener(newBoard) {
    // listen to changes
    this.props.isMyTurnAsync();
    Engine.load(newBoard);
    this.props.updateBoardAsync(newBoard);
  }

  _initBoard() {
    if (!Engine) {
      Engine = new Chess();
    } else {
      Engine.reset();
    }
    this.props.isMyTurnAsync();
    this.props.startNewGameAsync();
  }

  render() {
    return (
      <div>
        <Board
          allowMoves={this.props.isTurn}
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
  isTurn: propTypes.bool,
  side: propTypes.bool,
  isMyTurnAsync: propTypes.func,
  isNotMyTurnAsync: propTypes.func,
  updateBoardAsync: propTypes.func,
  startNewGameAsync: propTypes.func,
  profileData: propTypes.object,
};
Chessboard.defaultProps = {
  boardState: '',
  isTurn: true,
  side: false,
  isMyTurnAsync: propTypes.func,
  isNotMyTurnAsync: propTypes.func,
  updateBoardAsync: propTypes.func,
  startNewGameAsync: propTypes.func,
  profileData: {},
};
