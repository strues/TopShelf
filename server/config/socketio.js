/**
 * Socket.io configuration
 */

'use strict';
var socketIO = require('socket.io'),
    redis = require('socket.io-redis'),
    socketIOEmitter = require('socket.io-emitter'),
    socketioJwt = require('socketio-jwt');

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
    require('../api/post/post.socket').register(socket);
    require('../api/thing/thing.socket').register(socket);
    require('../api/recruitment/recruitment.socket').register(socket);
    require('../api/raid/raid.socket').register(socket);
}

module.exports = function (socketio) {

   var io = socketIOEmitter(config.redis);

    function init(http) {
      io = socketIO(http);

      io.adapter(redis(config.redis));

      socketio.on('connection', socketioJwt.authorize({
        secret: config.secrets.session,
        timeout: 10000 // 10 seconds to send the authentication message
      })).on('authenticated', function(socket) {
        socket.join('user.' + socket.decoded_token.user._id);
      });

return {
      init: init,
      getIO: function() {
        return io;
      },
      isUserOnline: function(userId) {
        var room = io.sockets.adapter.rooms['user.' + userId];
        return (!!room && Object.keys(room).length > 0);
      },
      emitToUser: function(userId, event, data) {
        io.to('user.' + userId).emit(event, data);
      },
      emitToAll: function(event, data) {
        io.emit(event, data);
      }
    };

  };

  };
