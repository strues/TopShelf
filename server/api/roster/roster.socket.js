/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var roster = require('./roster.model');

exports.register = function(socket) {
  roster.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  roster.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('roster:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('roster:remove', doc);
}
