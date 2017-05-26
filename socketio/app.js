var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3000);
console.log('listen on 3000...')
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.on('new', function (data) {
    console.log(data);
    io.sockets.emit('news', data);
  });
  socket.on('disconnect', function (){
    io.sockets.emit('leave', 'some one leave');
  })
});