/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Conversation 	= require('./conversation.model');

exports.register = {};


exports.register.off = function (socket){
	if(socket.userID && socket.conversations){
		socket.conversations.forEach(function (cid){
			Conversation.findOneBySharedId(cid, function (err, doc){
				if(err) console.log('Conversation.socket.off > ERROR: ', err);
				if(doc) doc.notifyOffline(socket.userID);
			}, true)
		})
	}
}

exports.register.on = function(socket) {
  Conversation.schema.post('save', function (doc) {
  	onSave(socket, doc);
  });
  Conversation.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });

  socket.on('conversation:notify:online', function (data){
  	if(!data || !data.conversationID || !socket.userID) return false;

  	if(socket.conversations)
  		socket.conversations.push(data.conversationID);
  	else
  		socket.conversations = [data.conversationID];

  	Conversation.findOneBySharedId(data.conversationID, function (err, doc){
  		if(err) console.log('Conversation.socket.on > ERROR: ', err);
  		if(doc) doc.notifyOnline(socket.userID);
  	}, true)
  })

  socket.on('conversation:notify:offline', function (data){
  	if(!data || !data.conversationID || !socket.userID) return false;

  	Conversation.findOneBySharedId(data.conversationID, function (err, doc){
  		if(err) console.log('Conversation.socket.on > ERROR: ', err);
  		if(doc) doc.notifyOffline(socket.userID);
  	}, true)

  	socket.conversations.forEach(function (cid, index){
  		if(cid === data.conversationID) socket.conversations.splice(index, 1);
  	})
  })
}

function onSave(socket, doc, cb) {
  if(doc.maySee(socket.userID)) {
  	Conversation.findOneAndPopulate(doc.identifier || doc._id, function (err, popdoc){
  		if(err) console.log('Conversation.socket.onSave > ERROR: ', err);
  		if(popdoc) socket.emit('conversation:save', popdoc)
  	})
  }
}

function onRemove(socket, doc, cb) {
  if(doc.maySee(socket.userID)) {
  	Conversation.findOneAndPopulate(doc.identifier || doc._id, function (err, popdoc){
  		if(err) console.log('Conversation.socket.onRemove > ERROR: ', err);
  		if(popdoc) socket.emit('conversation:remove', popdoc)
  	})
  }
}