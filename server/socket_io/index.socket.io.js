const socketIo = require('socket.io');

const getTime = () => {
  const time = new Date();
  let hr = time.getHours();
  let min = time.getMinutes();
  let ampm = 'AM';
  if (hr >= 12) {
    hr -= 12;
    ampm = 'PM';
  }
  if (min < 10) {
    min = (`0${min}`).slice(-2);
  }
  const currentTime = `${hr}:${min}${ampm}`;
  return currentTime;
};

const getUniqeId = () => {
  return new Date().getTime();
};

const user = {
  roomId: '',
};
const deepSubs = {
  img_url: 'http://yellowsubmarineswimschool.co.uk/wp-content/uploads/2016/12/Yellow-Submarine-Swim-School-Logo-transparent-windows-2.png',
  username: 'Yellow Submarine',
  message: '',
  id: '',
  time: '',
};

module.exports = (server) => {
  const io = socketIo(server);
  io.on('connect', (socket) => {
    socket.on('join-room', (roomId) => {
      user.roomId = roomId;
      socket.join(user.roomId);
    });

    socket.on('board-update', (newBoard) => {
      socket.broadcast.to(user.roomId).emit('board-update', newBoard);
    });

    socket.on('new-user', (username) => {
      deepSubs.id = getUniqeId();
      deepSubs.time = getTime();
      deepSubs.message = `${username} has joined the room!`;
      socket.broadcast.to(user.roomId).emit('receive-msg', deepSubs);
      deepSubs.message = `Hello ${username}! This is your room ID: ${user.roomId}`;
      io.to(socket.id).emit('receive-msg', deepSubs);
    });

    socket.on('send-msg', (newMsg) => {
      io.to(user.roomId).emit('receive-msg', newMsg);
    });

    socket.on('announcer', (from, to, username) => {
      deepSubs.id = getUniqeId();
      deepSubs.time = getTime();
      deepSubs.message = `${username} has moved from ${from} to ${to}`;
      socket.broadcast.to(user.roomId).emit('receive-msg', deepSubs);
    });
  });
};
