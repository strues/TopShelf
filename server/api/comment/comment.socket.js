/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Comment = require('./comment.model');

exports.register = function(socket) {
  Comment.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Comment.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}
 
function onSave(socket, doc, cb) {
  Comment.populate(doc, {path:'author', select: 'name'}, function(err, comment) {
    socket.emit('comment:save', comment);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('comment:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('comment:remove', doc);
}