/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Inbox = require('./inbox.model'),
		Auth	= require('../../auth/auth.service');

exports.register = function(socket) {
  Inbox.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Inbox.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  if(doc.owner.equals(socket.userID) || Auth.socketHasRole(socket, 'admin')) {
  	Inbox
  		.findOne({_id: doc._id})
  		.populate('owner box.sender', 'name')
  		.exec(function (err, inbox){
  			if(err){ console.log('Inbox.socket > onSave ERROR: ', err)}
  			socket.emit('inbox:save', inbox);
  		})
  }
}

function onRemove(socket, doc, cb) {
  if(doc.owner.equals(socket.userID) || Auth.socketHasRole(socket, 'admin')) {
  	socket.emit('inbox:remove', doc);
  }
}