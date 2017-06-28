const app = require('./app');
const server = require('http').Server(app);
require('./socket_io/index.socket.io')(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`DeepSubs listening on port ${PORT}!`);
});
