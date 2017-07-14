const socketIo = require('socket.io');
const YellowSubsAction = require('../AI/yellowsub_ai_v2');
const Chess = require('../../client/src/components/AI/chess').Chess;

const getUniqeId = () => new Date().getTime();

const user = {
  roomId: '',
};
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
    // socket.on('join-room', (roomId) => {
    //   user.roomId = roomId;
    //   socket.join(user.roomId);
    // });

    socket.on('new-user', (username, roomId) => {
      user.roomId = roomId;
      socket.join(user.roomId);
      deepSubs.msgId = getUniqeId();
      deepSubs.message = `${username} has joined the room!`;
      socket.broadcast.to(user.roomId).emit('receive-msg', deepSubs);
      deepSubs.message = `Hello ${username}! This is your room ID: ${user.roomId}`;
      io.to(socket.id).emit('receive-msg', deepSubs);
    });

    socket.on('AI', (boardState, isStart) => {
      if (isStart) {
        game.reset();
        numRounds = 0;
      }
      if (boardState) {
        game.move({
          from: boardState.from,
          to: boardState.to,
        });
        const newBoard = game.fen();
        io.in(user.roomId).emit('board-update', newBoard, false);
      }

      // deepSubs move
      if (game.turn() === 'b') {
        const bestMove = YellowSubsAction(3, game, true, numRounds);
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
        io.in(user.roomId).emit('board-update', aiBoard, status);
      }
    });

    socket.on('board-update', (newBoard, side) => {
      socket.broadcast.to(user.roomId).emit('board-update', newBoard, side);
    });

    socket.on('send-msg', (newMsg) => {
      io.to(user.roomId).emit('receive-msg', newMsg);
    });

    socket.on('announcer', (from, to, username, isCheck) => {
      deepSubs.msgId = getUniqeId();
      switch (isCheck) {
        case 'check':
          deepSubs.message = `${username} has moved into check position!`;
          socket.broadcast.to(user.roomId).emit('receive-msg', deepSubs);
          break;
        case 'normal':
          deepSubs.message = `${username} has moved from ${from} to ${to}`;
          socket.broadcast.to(user.roomId).emit('receive-msg', deepSubs);
          break;
        case 'check_mate':
          deepSubs.message = `${username} wins!! Checkmated board position!!!`;
          io.in(user.roomId).emit('receive-msg', deepSubs);
          break;
        default:
          break;
      }
    });
  });
};
