'use strict';

var Article = require('./article.model');

exports.register = function(socket) {
  Article.schema.article('save', function(doc) {
    onSave(socket, doc);
  });
  Article.schema.article('remove', function(doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('article:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('article:remove', doc);
}
