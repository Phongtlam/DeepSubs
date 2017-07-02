import { GET_INPUT } from '../actions/type';

const INITIAL_STATE = {
  input: '',
};

const chat = (state = INITIAL_STATE, { type, input }) => {
  switch (type) {
    case GET_INPUT:
      return {
        ...state,
        input,
      };
    default:
      return state;
  }
};

export default chat;
