import { START_GAME, UPDATE_BOARD, MY_TURN, NOT_MY_TURN, START_PICK, END_PICK } from '../actions/type';

const INITIAL_STATE = {
  boardState: '',
  isTurn: true,
  isPicking: false,
};

const board = (state = INITIAL_STATE, { type, boardState }) => {
  switch (type) {
    case START_GAME:
      return {
        ...state,
        boardState: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        isPicking: true,
      };
    case UPDATE_BOARD:
      return {
        ...state,
        boardState,
      };
    case MY_TURN:
      return {
        ...state,
        isTurn: true,
      };
    case NOT_MY_TURN:
      return {
        ...state,
        isTurn: false,
      };
    case START_PICK:
      return {
        ...state,
        isPicking: true,
      };
    case END_PICK:
      return {
        ...state,
        isPicking: false,
      };
    default:
      return state;
  }
};

export default board;
