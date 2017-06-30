import { combineReducers } from 'redux';
import board from './boardReducer';
import room from './roomReducer';

// store
const rootReducer = combineReducers({
  // reducers go here
  board,
  room,
});

export default rootReducer;
