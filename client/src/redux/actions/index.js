import axios from 'axios';
import { newGame, updateBoard, isMyTurn, isNotMyTurn, startPick, endPick } from './boardAction';
import { getGameId, pickWhite, pickBlack } from './roomAction';
import { getProfile } from './profileAction';
import { getInput, appendMsg } from './chatterboxAction';
import SocketIo from '../../socket_io_client/index';

// async action by Thunk

// board controllers
export const startNewGameAsync = () => (dispatch) => {
  dispatch(newGame());
};

export const updateBoardAsync = (boardState, username) => (dispatch) => {
  if (username) {
    SocketIo.emit('board-update', boardState);
  }
  dispatch(updateBoard(boardState));
};

export const isMyTurnAsync = () => (dispatch) => {
  dispatch(isMyTurn());
};

export const isNotMyTurnAsync = () => (dispatch) => {
  dispatch(isNotMyTurn());
};

export const startPickAsync = () => (dispatch) => {
  dispatch(startPick());
};

export const endPickAsync = () => (dispatch) => {
  dispatch(endPick());
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
  });
};

export const needProfileAsync = () => (dispatch) => {
  dispatch(needProfile());
};

export const getInputAsync = input => (dispatch) => {
  dispatch(getInput(input));
};

export const appendMsgAsync = newMsg => (dispatch) => {
  dispatch(appendMsg(newMsg));
};
