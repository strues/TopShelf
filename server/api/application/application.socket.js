/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Application = require('./application.model');

exports.register = function(socket) {
  Application.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Application.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('application:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('application:remove', doc);
}