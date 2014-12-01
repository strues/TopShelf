/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var application = require('./application.model');

exports.register = function(socketio) {
  application.schema.post('save', function (doc) {
    onSave(socketio, doc);
  });
  application.schema.post('remove', function (doc) {
    onRemove(socketio, doc);
  });
};

function onSave(socketio, doc, cb) {
  application.populate(doc, {path:'author', select: 'name'}, function(err, application) {
    socketio.emit('application:save', application);
  });
}

function onRemove(socketio, doc, cb) {
  socketio.emit('application:remove', doc);
}
