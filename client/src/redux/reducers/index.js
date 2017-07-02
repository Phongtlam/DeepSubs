import { combineReducers } from 'redux';
import board from './boardReducer';
import room from './roomReducer';
import chat from './chatReducer';
import profile from './profileReducer';

// store
const rootReducer = combineReducers({
  // reducers go here
  board,
  room,
  chat,
  profile,
});

export default rootReducer;
