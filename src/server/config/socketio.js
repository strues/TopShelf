'use strict';

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  io.on('info', function(data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/article/article.socket').register(socket);
  require('../api/user/user.socket').register(socket);
}

module.exports = function(socketio) {

  socketio.on('connection', function(socket) {
    console.log(c.green('\nSocket Ready'));

    socket.address = socket.handshake.address !== null ?
      socket.handshake.address.address + ':' + socket.handshake.address.port :
      process.env.DOMAIN;

    socket.connectedAt = new Date();
    // broadcast a user's message to other users
    socket.on('send:mesaage', function (data) {
        socket.broadcast.emit('send:message', {
            text: data.text
        });
    });
    // Call onDisconnect.
    socket.on('disconnect', function() {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);
  });
};
