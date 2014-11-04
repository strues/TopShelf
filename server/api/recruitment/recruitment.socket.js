/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Recruitment = require('./recruitment.model');

exports.register = function(socket) {
  Recruitment.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Recruitment.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('recruitment:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('recruitment:remove', doc);
}
