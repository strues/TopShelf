const User = require('./user.model');

/**
 * Emit a User save event on a socket object: 'user:save'
 * @param {socket.io} socket - The socket object to emit the User save event on
 * @param {MogooseDocument} doc - The saved document that triggered the event
 * @param {function} cb - The callback function
 */
function onSave(socket, doc, cb) {
  socket.emit('user:save', doc);
}

/**
 * Emit a User remove event on a socket object: 'user:remove'
 * @param {socket.io} socket - The socket object to emit the User remove event on
 * @param {MogooseDocument} doc - The removed document that triggered the event
 * @param {function} cb - The callback function
 */
function onRemove(socket, doc, cb) {
  socket.emit('user:remove', doc);
}

/**
 * Register User model change events on the passed socket
 * @param {socket.io} socket - The socket object to register the User model events on
 */
function registerUserSockets(socket) {
  User.schema.post('save', function(doc) {
    onSave(socket, doc);
  });

  User.schema.post('remove', function(doc) {
    onRemove(socket, doc);
  });
}

// export the function to register all socket broadcasts
exports.register = registerUserSockets;
