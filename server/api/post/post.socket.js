/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Post = require('./post.model');

exports.register = function(socketio) {
  Post.schema.post('save', function (doc) {
    socketio.to('post').emit('post:save', doc);
  });
  Post.schema.post('remove', function (doc) {
    socketio.to('post').emit('post:remove', doc);
  });
};
