/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Raid = require('./raid.model');

exports.register = function(socket) {
  Raid.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Raid.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('raid:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('raid:remove', doc);
}
