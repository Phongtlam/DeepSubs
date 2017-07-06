import { combineReducers } from 'redux';
import board from './boardReducer';
import room from './roomReducer';
import profile from './profileReducer';

// store
const rootReducer = combineReducers({
  // reducers go here
  board,
  room,
  profile,
});

export default rootReducer;
