/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var application = require('./application.model');

exports.register = function(socket) {
  application.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  application.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  application.populate(doc, {path:'author', select: 'name'}, function(err, application) {
    socket.emit('application:save', application);
  });
}

function onRemove(socket, doc, cb) {
  socket.emit('application:remove', doc);
}
