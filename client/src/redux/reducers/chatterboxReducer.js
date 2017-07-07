import { WRITE_MSG, APPEND_MSG } from '../actions/type';

const INITIAL_STATE = {
  input: '',
  messages: [],
};

const chatterbox = (state = INITIAL_STATE, { type, input, newMsg }) => {
  switch (type) {
    case WRITE_MSG:
      return {
        ...state,
        input,
      };
    case APPEND_MSG:
      return {
        ...state,
        messages: state.messages.concat([newMsg]),
      };
    default:
      return state;
  }
};

export default chatterbox;
