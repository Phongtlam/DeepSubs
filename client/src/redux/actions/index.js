import axios from 'axios';
import { newGame, updateBoard } from './boardAction';
import { getGameId, pickWhite, pickBlack } from './roomAction';
import { getProfile } from './profileAction';
import SocketIo from '../../socket_io_client/index';

// async action by Thunk

// board controllers
export const startNewGameAsync = () => (dispatch) => {
  dispatch(newGame());
};

export const updateBoardAsync = (boardState, fromMe) => (dispatch) => {
  if (fromMe) {
    SocketIo.emit('board-update', boardState);
  }
  dispatch(updateBoard(boardState));
};

export const getGameIdAsync = roomId => (dispatch) => {
  SocketIo.emit('join-room', roomId);
  dispatch(getGameId(roomId));
};

export const pickWhiteAsync = () => (dispatch) => {
  dispatch(pickWhite());
};

export const pickBlackAsync = () => (dispatch) => {
  dispatch(pickBlack());
};

export const getProfileAsync = () => (dispatch) => {
  axios.get('/get-profile')
  .then((data) => {
    dispatch(getProfile(data.data));
    return data.data.username;
  })
  .then((username) => {
    SocketIo.emit('new-user', username);
  });
};
