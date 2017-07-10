import { START_GAME, UPDATE_BOARD, MY_TURN, NOT_MY_TURN, START_PICK, END_PICK } from './type';

export const newGame = () => ({
  type: START_GAME,
});

export const updateBoard = boardState => ({
  type: UPDATE_BOARD,
  boardState,
});

export const isMyTurn = () => ({
  type: MY_TURN,
});

export const isNotMyTurn = () => ({
  type: NOT_MY_TURN,
});

export const startPick = () => ({
  type: START_PICK,
});

export const endPick = () => ({
  type: END_PICK,
});
