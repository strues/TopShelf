/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var roster = require('./roster.model');

exports.register = function(socketio) {
  roster.schema.post('save', function (doc) {
    onSave(socketio, doc);
  });
  roster.schema.post('remove', function (doc) {
    onRemove(socketio, doc);
  });
};

function onSave(socketio, doc, cb) {
  socketio.emit('roster:save', doc);
}

function onRemove(socketio, doc, cb) {
  socketio.emit('roster:remove', doc);
}
