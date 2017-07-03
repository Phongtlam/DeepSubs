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
  }

  onMovePiece(piece, from, to) {
    console.log(piece, 'was move from', from, 'to', to)
    const username = this.props.profileData.username;
    console.log('USERNAME', username);
    SocketIo.emit('announcer', from, to, username);
    this.engine.move({ piece, from, to });
    const newBoard = this.engine.fen();
    SocketIo.emit('board-update', newBoard);
    this.setState({ go: false });
    this.props.updateBoardAsync(newBoard);
  }

  updateBoardListener(newBoard) {
    // listen to changes from the other side
    this.engine.load(newBoard);
    this.setState({ go: true });
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
  profileData: propTypes.object,
};
Chessboard.defaultProps = {
  boardState: '',
  side: false,
  updateBoardAsync: propTypes.func,
  startNewGameAsync: propTypes.func,
  profileData: {},
};
