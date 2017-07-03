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
      go: true,
    };
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
    console.log(piece, 'was move from', from, 'to', to)
    this.engine.move({ piece, from, to });
    const newBoard = this.engine.fen();
    SocketIo.emit('board-update', newBoard);
    // this.setState({ go: false });
    this.props.updateBoardAsync(newBoard);
  }

  updateBoardListener(newBoard) {
    // listen to changes from the other side
    this.engine.load(newBoard);
    // this.setState({ go: true });
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
    const gameId = qs.slice(8, qs.length);
    this.props.getGameIdAsync(gameId);
    SocketIo.emit('join-room', gameId);
  }

  render() {
    return (
      <div>
        <Board
          highlights={{ one: 'one' }}
          // allowMoves={this.state.go}
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
