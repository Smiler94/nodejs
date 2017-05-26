var io = require('socket.io-client')

var socket = io('localhost:3000');
socket.emit('new', 'this is client');