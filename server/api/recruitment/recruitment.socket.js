/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Recruitment = require('./recruitment.model');

exports.register = function(socketio) {
  Recruitment.schema.post('save', function (doc) {
    onSave(socketio, doc);
  });
  Recruitment.schema.post('remove', function (doc) {
    onRemove(socketio, doc);
  });
};

function onSave(socketio, doc, cb) {
  socketio.emit('recruitment:save', doc);
}

function onRemove(socketio, doc, cb) {
  socketio.emit('recruitment:remove', doc);
}
