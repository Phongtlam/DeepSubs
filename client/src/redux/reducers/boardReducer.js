import {
  START_GAME,
  UPDATE_BOARD,
  MY_TURN,
  NOT_MY_TURN,
  START_PICK,
  END_PICK,
  PLAY_HUMAN,
  PLAY_AI,
  IS_AI_BLACK,
  IS_AI_WHITE,
} from '../actions/type';

const INITIAL_STATE = {
  boardState: '',
  isTurn: true,
  isPicking: false,
  isAi: false,
  isHuman: true,
  isAiBlack: false,
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
    case PLAY_HUMAN:
      return {
        ...state,
        isAi: false,
        isHuman: true,
      };
    case PLAY_AI:
      return {
        ...state,
        isAi: true,
        isHuman: false,
      };
    case IS_AI_BLACK:
      return {
        ...state,
        isAiBlack: true,
      };
    case IS_AI_WHITE:
      return {
        ...state,
        isAiBlack: false,
      };
    default:
      return state;
  }
};

export default board;
