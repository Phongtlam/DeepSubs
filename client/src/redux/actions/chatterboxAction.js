import { WRITE_MSG, APPEND_MSG } from './type';

export const getInput = input => ({
  type: WRITE_MSG,
  input,
});

export const appendMsg = newMsg => ({
  type: APPEND_MSG,
  newMsg,
});
