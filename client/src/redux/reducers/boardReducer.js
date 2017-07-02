import { START_GAME, UPDATE_BOARD } from '../actions/type';

const INITIAL_STATE = '';

const board = (state = INITIAL_STATE, { type, boardState }) => {
  switch (type) {
    case START_GAME:
      return {
        ...state,
        boardState: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      };
    case UPDATE_BOARD:
      return {
        ...state,
        boardState,
      };
    default:
      return state;
  }
};

export default board;
