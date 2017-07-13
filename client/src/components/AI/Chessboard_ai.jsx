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

let Engine;
let positionCount = 0;

class ChessboardAi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
      isCheckMate: false,
    };
    this._onMovePiece = this._onMovePiece.bind(this);
    this._initBoard = this._initBoard.bind(this);
    this._checkStatus = this._checkStatus.bind(this);
    this._pickWhite = this._pickWhite.bind(this);
    this._pickBlack = this._pickBlack.bind(this);
    this._deepSubsMove = this._deepSubsMove.bind(this);
    this._updateBoardListener = this._updateBoardListener.bind(this);
    SocketIo.on('board-update', this._updateBoardListener);
  }

  componentDidMount() {
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

  _pickWhite() {
    this.props.pickWhiteAsync();
  }

  _pickBlack() {
    this.props.pickBlackAsync();
  }

  _onMovePiece(piece, from, to) {
    this.setState({
      isCheck: false,
    });
    this.props.endPickAsync();
    Engine.move({ from, to });
    const newBoard = Engine.fen();
    this.props.updateBoardAsync(newBoard, this.props.profileData.username);
    setTimeout(() => {
      this._deepSubsMove();
    }, 1000);
    this._deepSubsMove();
  }

  _deepSubsMove() {
    if (Engine.turn() === 'b') {
    // if (Engine.in_checkmate()) {
    //   updateStatus();
    //   return;
    // }
      const bestMove = YellowSubsAction(3, Engine, true, positionCount);
      Engine.move(bestMove);
      const newBoard = Engine.fen();
      if (Engine.in_check()) {
        this.setState({ isCheck: true });
      } else if (Engine.in_checkmate()) {
        this.setState({
          isCheck: false,
          isCheckMate: true,
        });
      } else if (!Engine.in_check()) {
        this.setState({ isCheck: false });
      }
      this.props.updateBoardAsync(newBoard, 'yellow-subs');
    }
  }

  _initBoard() {
    if (!Engine) {
      Engine = new Chess();
    } else {
      Engine.reset();
    }
    this.setState({
      isCheck: false,
      isCheckMate: false,
    });
    this.props.startNewGameAsync();
  }

  _updateBoardListener(newBoard) {
    // listen to changes
    if (newBoard) {
      this.props.updateBoardAsync(newBoard);
    }
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
          pickWhite={this._pickWhite}
          pickBlack={this._pickBlack}
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
