import { START_GAME, UPDATE_BOARD } from './type';

export const newGame = () => ({
  type: START_GAME,
});

export const updateBoard = boardState => ({
  type: UPDATE_BOARD,
  boardState,
});
