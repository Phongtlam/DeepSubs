import React from 'react';
import Board from 'react-chessdiagram';
import propTypes from 'prop-types';
import Chess from './chess';
import SocketIo from '../../socket_io_client/index';
import { YellowSubsAction } from './yellowsub_ai_v2';
import ChessFooterAi from './ChessFooter_ai';

const styles = {
  board: {
    size: 60,
    light: '#ffffff',
    dark: '#808080',
  },
};

// let Engine;

class ChessboardAi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
      isCheckMate: false,
      numRounds: 0,
    };
    this._onMovePiece = this._onMovePiece.bind(this);
    this._initBoard = this._initBoard.bind(this);
    // this._connectAi = this._connectAi.bind(this);
    // this._deepSubsMove = this._deepSubsMove.bind(this);
    this._updateBoardListener = this._updateBoardListener.bind(this);
    SocketIo.on('board-update', this._updateBoardListener);
  }

  _onMovePiece(piece, from, to) {
    if (this.props.boardState === 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
      this.props.endPickAsync();
    }
    this.setState({
      isCheck: false,
    });
    SocketIo.emit('AI', { from, to });
    this.props.isNotMyTurnAsync();
  }

  _initBoard() {
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
    } else if (status === 'check_mate') {
      this.setState({
        isCheck: false,
        isCheckMate: true,
      });
    }
    if (status) {
      this.props.isMyTurnAsync();
    }
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
  isTurn: propTypes.bool,
  side: propTypes.bool,
  isMyTurnAsync: propTypes.func,
  isNotMyTurnAsync: propTypes.func,
  pickWhiteAsync: propTypes.func,
  pickBlackAsync: propTypes.func,
  updateBoardAsync: propTypes.func,
  startNewGameAsync: propTypes.func,
  endPickAsync: propTypes.func,
  isPicking: propTypes.bool,
  profileData: propTypes.object,
};
ChessboardAi.defaultProps = {
  boardState: '',
  isTurn: true,
  side: false,
  isPicking: false,
  isMyTurnAsync: propTypes.func,
  isNotMyTurnAsync: propTypes.func,
  endPickAsync: propTypes.func,
  pickWhiteAsync: propTypes.func,
  pickBlackAsync: propTypes.func,
  updateBoardAsync: propTypes.func,
  startNewGameAsync: propTypes.func,
  profileData: {},
};
