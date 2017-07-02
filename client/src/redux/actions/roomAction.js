import { GET_GAME_ID, PICK_WHITE, PICK_BLACK } from './type';


export const getGameId = gameId => ({
  type: GET_GAME_ID,
  gameId,
});

export const pickWhite = () => ({
  type: PICK_WHITE,
});

export const pickBlack = () => ({
  type: PICK_BLACK,
});
