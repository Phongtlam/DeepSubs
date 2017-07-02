import { newGame, updateBoard } from './boardAction';
import { getGameId, pickWhite, pickBlack } from './roomAction';
import { getInput } from './chatAction';
import { getProfile } from './profileAction';

// async action by Thunk

// board controllers
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

export const getInputAsync = newInput => (dispatch) => {
  dispatch(getInput(newInput));
};

export const getProfileAsync = data => (dispatch) => {
  dispatch(getProfile(data));
};
