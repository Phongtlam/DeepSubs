import { combineReducers } from 'redux';
import board from './boardReducer';
import room from './roomReducer';
import chat from './chatReducer';

// store
const rootReducer = combineReducers({
  // reducers go here
  board,
  room,
  chat,
});

export default rootReducer;
