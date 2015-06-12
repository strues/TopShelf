/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var user = require('./user.model');

exports.register = function(socket) {
  user.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('user:save', doc);
}
