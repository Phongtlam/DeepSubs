import { newGame, updateBoard } from './boardAction';
import { getGameId, pickWhite, pickBlack } from './roomAction';

// async action by Thunk
export const startNewGameAsync = () => (dispatch) => {
  dispatch(newGame());
};

export const updateBoardAsync = boardState => (dispatch) => {
  dispatch(updateBoard(boardState));
};

export const getGameIdAsync = roomId => (dispatch) => {
  dispatch(getGameId(roomId));
};

export const pickWhiteAsync = () => (dispatch) => {
  dispatch(pickWhite());
};

export const pickBlackAsync = () => (dispatch) => {
  dispatch(pickBlack());
};
