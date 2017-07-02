import { GET_INPUT } from './type';

export const getInput = newInput => ({
  type: GET_INPUT,
  input: `${newInput}`,
});
