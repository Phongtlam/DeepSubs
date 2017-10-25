import { GET_GAME_ID, PICK_WHITE, PICK_BLACK } from '../actions/type';

const INITIAL_STATE = {
  gameId: '',
  side: false,
};

const room = (state = INITIAL_STATE, { type, gameId }) => {
  switch (type) {
    case GET_GAME_ID:
      return {
        ...state,
        gameId,
      };
    case PICK_WHITE:
      return {
        ...state,
        side: false,
      }
    case PICK_BLACK:
      return {
        ...state,
        side: true,
      };
    default:
      return state;
  }
};

export default room;
