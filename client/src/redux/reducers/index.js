import { combineReducers } from 'redux';
import board from './boardReducer';
import room from './roomReducer';
import profile from './profileReducer';
import chatterbox from './chatterboxReducer';

// store
const rootReducer = combineReducers({
  // reducers go here
  board,
  room,
  profile,
  chatterbox,
});

export default rootReducer;
