import { START_GAME, UPDATE_BOARD } from './type';

export const newGame = () => ({
  type: START_GAME,
  boardState: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
});

export const updateBoard = boardState => ({
  type: UPDATE_BOARD,
  boardState,
});
