import User from './user.model';

exports.register = function(socket) {
  User.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
};

exports.connect = function(socket) {
  onConnect(socket);
};

function onSave(socket, doc, cb) {
  socket.emit('User:save', doc);
}

function onConnect(socket, doc, cb) {
  socket.emit('connected', {});
}
