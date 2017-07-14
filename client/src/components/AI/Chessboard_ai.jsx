import React from 'react';
import Board from 'react-chessdiagram';
import propTypes from 'prop-types';
import SocketIo from '../../socket_io_client/index';
import ChessFooterAi from './ChessFooter_ai';
import Chess from '../AI/chess';

const styles = {
  board: {
    size: 60,
    light: '#ffffff',
    dark: '#808080',
  },
};

let Engine;

class ChessboardAi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
      isCheckMate: false,
    };
    this._onMovePiece = this._onMovePiece.bind(this);
    this._initBoard = this._initBoard.bind(this);
    this._updateBoardListener = this._updateBoardListener.bind(this);
    SocketIo.on('board-update', this._updateBoardListener);
  }

  componentDidMount() {
    Engine = new Chess();
    this.props.isMyTurnAsync();
  }

  _onMovePiece(piece, from, to) {
    if (this.props.boardState === 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
      this.props.endPickAsync();
    }
    Engine.move({ from, to });
    const newBoard = Engine.fen();
    if (this.props.boardState !== newBoard) {
      SocketIo.emit('AI', newBoard);
      this.props.updateBoardAsync(newBoard);
      this.props.isNotMyTurnAsync();
    }
  }

  _initBoard() {
    Engine.reset();
    this.setState({
      isCheck: false,
      isCheckMate: false,
    });
    SocketIo.emit('AI', null, true);
    this.props.startNewGameAsync();
  }

  _updateBoardListener(newBoard, status) {
    // listen to changes
    if (status === 'check') {
      this.setState({ isCheck: true });
      this.props.isMyTurnAsync();
    } else if (status === 'check_mate') {
      this.setState({
        isCheck: false,
        isCheckMate: true,
      });
    } else if (status === 'normal') {
      this.setState({
        isCheck: false,
      });
      this.props.isMyTurnAsync();
    } else if (!status && this.props.boardState !== newBoard) {
      this.props.isNotMyTurnAsync();
    }
    Engine.load(newBoard);
    this.props.updateBoardAsync(newBoard);
  }

  render() {
    return (
      <div>
        <div>
          <Board
            flip={this.props.side}
            fen={this.props.boardState}
            onMovePiece={this._onMovePiece}
            squareSize={styles.board.size}
            lightSquareColor={styles.board.light}
            darkSquareColor={styles.board.dark}
          />
        </div>
        <ChessFooterAi
          {...this.props}
          initBoard={this._initBoard}
          isCheck={this.state.isCheck}
          isCheckMate={this.state.isCheckMate}
        />
      </div>
    );
  }
}

export default ChessboardAi;

ChessboardAi.propTypes = {
  boardState: propTypes.string,
  side: propTypes.bool,
  isMyTurnAsync: propTypes.func,
  isNotMyTurnAsync: propTypes.func,
  updateBoardAsync: propTypes.func,
  startNewGameAsync: propTypes.func,
  endPickAsync: propTypes.func,
};
ChessboardAi.defaultProps = {
  boardState: '',
  side: false,
  isMyTurnAsync: propTypes.func,
  isNotMyTurnAsync: propTypes.func,
  endPickAsync: propTypes.func,
  updateBoardAsync: propTypes.func,
  startNewGameAsync: propTypes.func,
};
