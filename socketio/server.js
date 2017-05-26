var server = require('http').Server()
var io = require('socket.io')(server);

server.listen(3000);
console.log('listen 3000...')

io.on('connection', function (socket) {
  socket.on('new', function (data) {
    console.log(data);
    io.sockets.emit('news', data);
  });
});