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
    this.state = {
      canMove: false,
    };
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

  componentDidMount() {
    console.log('in did mount')
    this._checkStatus();
  }

  componentWillUnmount() {
    Engine.clear();
  }

  _checkStatus() {
    if (Engine) {
      this.setState({ canMove: true });
    }
    Engine = new Chess(this.props.boardState);
  }

  _onMovePiece(piece, from, to) {
    const username = this.props.profileData.username;
    Engine.move({ piece, from, to });
    const newBoard = Engine.fen();
    let isCheck = 'normal';
    if (Engine.in_check() === true) {
      isCheck = 'check';
    }
    if (Engine.in_checkmate() === true) {
      isCheck = 'check_mate';
    }
    SocketIo.emit('announcer', from, to, username, isCheck);
    const fromMe = true;
    this.props.updateBoardAsync(newBoard, fromMe);
  }

  _onReconnect() {
    const newBoard = Engine.fen();
    Engine.load(newBoard);
    this.props.updateBoardAsync(newBoard);
  }

  _updateBoardListener(newBoard) {
    // listen to changes
    Engine.load(newBoard);
    this.props.updateBoardAsync(newBoard);
  }

  _initBoard() {
    if (!Engine) {
      Engine = new Chess();
    } else {
      Engine.reset();
    }
    this.setState({ canMove: true });
    this.props.startNewGameAsync();
  }

  render() {
    return (
      <div>
        <Board
          // allowMoves={this.state.canMove}
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
