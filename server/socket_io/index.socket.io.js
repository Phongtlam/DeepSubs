const socketIo = require('socket.io');

const user = {};

module.exports = (server) => {
  const io = socketIo(server);
  io.on('connect', (socket) => {
    console.log('client connect on ID', socket.id)
    socket.on('join-room', (roomId) => {
      user.roomId = roomId;
      socket.join(user.roomId);
    });

    socket.on('board-update', (newBoard) => {
      socket.broadcast.to(user.roomId).emit('board-update', newBoard);
    });

    socket.on('send-msg', (newMsg) => {
      console.log('this is the new MSG', newMsg);
      socket.broadcast.to(user.roomId).emit('receive-msg', newMsg);
    })

  });
};
