const socketIo = require('socket.io');
const YellowSubsAction = require('../AI/yellowsub_ai_v2');
const Chess = require('../../client/src/components/AI/chess').Chess;

const getUniqeId = () => new Date().getTime();

const deepSubs = {
  img_url: 'http://yellowsubmarineswimschool.co.uk/wp-content/uploads/2016/12/Yellow-Submarine-Swim-School-Logo-transparent-windows-2.png',
  username: 'Yellow Submarine',
  message: '',
  id: -1,
  msgId: null,
  time: '',
};

const game = new Chess();

let numRounds = 0;

module.exports = (server) => {
  const io = socketIo(server);
  io.on('connect', (socket) => {
    socket.on('new-user', (username, roomId) => {
      const socketRooms = Object.keys(io.sockets.adapter.sids[socket.id]);
      const currentRoom = socketRooms[socketRooms.length - 1];
      if (socketRooms.length > 1) {
        socket.leave(currentRoom);
      }
      socket.join(roomId);
      deepSubs.msgId = getUniqeId();
      deepSubs.message = `${username} has joined the room!`;
      socket.broadcast.to(roomId).emit('receive-msg', deepSubs);
      deepSubs.message = `Hello ${username}! This is your room ID: ${roomId}`;
      io.to(socket.id).emit('receive-msg', deepSubs);
    });

    socket.on('AI', (boardState, isStart) => {
      const socketRooms = Object.keys(io.sockets.adapter.sids[socket.id]);
      const currentRoom = socketRooms[socketRooms.length - 1];
      if (isStart) {
        game.reset();
        numRounds = 0;
      }
      if (boardState) {
        game.load(boardState);
        socket.broadcast.to(currentRoom).emit('board-update', boardState, false);
      }

      // deepSubs move
      if (game.turn() === 'w') {
        const bestMove = YellowSubsAction(2, game, true, numRounds, 'w');
        game.move(bestMove);
        const aiBoard = game.fen();
        if (aiBoard) {
          numRounds += 1;
        }
        let status = 'normal';
        if (game.in_check()) {
          status = 'check';
        } else if (game.in_checkmate() || game.move() === []) {
          status = 'check_mate';
        }
        io.in(currentRoom).emit('board-update', aiBoard, status);
      }
    });

    socket.on('board-update', (newBoard, side) => {
      const socketRooms = Object.keys(io.sockets.adapter.sids[socket.id]);
      const currentRoom = socketRooms[socketRooms.length - 1];
      socket.broadcast.to(currentRoom).emit('board-update', newBoard, side);
    });

    socket.on('send-msg', (newMsg) => {
      const socketRooms = Object.keys(io.sockets.adapter.sids[socket.id]);
      const currentRoom = socketRooms[socketRooms.length - 1];
      io.to(currentRoom).emit('receive-msg', newMsg);
    });

    socket.on('announcer', (from, to, username, isCheck) => {
      const socketRooms = Object.keys(io.sockets.adapter.sids[socket.id]);
      const currentRoom = socketRooms[socketRooms.length - 1];
      deepSubs.msgId = getUniqeId();
      switch (isCheck) {
        case 'check':
          deepSubs.message = `${username} has moved into check position!`;
          socket.broadcast.to(currentRoom).emit('receive-msg', deepSubs);
          break;
        case 'normal':
          deepSubs.message = `${username} has moved from ${from} to ${to}`;
          socket.broadcast.to(currentRoom).emit('receive-msg', deepSubs);
          break;
        case 'check_mate':
          deepSubs.message = `${username} wins!! Checkmated board position!!!`;
          io.in(currentRoom).emit('receive-msg', deepSubs);
          break;
        default:
          break;
      }
    });
  });
};
