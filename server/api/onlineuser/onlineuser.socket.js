/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Onlineuser = require('./onlineuser.model');

exports.register = {};

exports.register.off = function(socket){
 Onlineuser.findOne({socketID: socket.id}, function (err, doc){
    if(err) console.log('Socket > Disconnect ERROR: ', err);
    if(doc) {
      console.log('Socket > Disconnect');
      doc.remove(function (err, doc){
        if(err) console.log('Onlineuser > remove ERROR: ', err);
        if(doc) console.log('Onlineuser > removed: ', doc.userID, ' : ', doc.socketID);
      });
    }
  })
}

exports.register.on = function(socket) {
  socket
	  .on('onlineuser:login', function (userID){
	  	var onlineUser = new Onlineuser();

	  	console.log('onlineuser:login', userID)

	  	onlineUser.userID = userID;
	  	onlineUser.socketID = socket.id;

	  	onlineUser.save(function (err){
	  		if(err) console.log('Onlineuser > login ERROR: ', err);
	  	});
	  })
	  .on('onlineuser:logout', function (){
	  	console.log('onlineuser:logout');

	  	Onlineuser
        .find({socketID: socket.id})
        .remove(function (err, doc){
  	  		if(err) console.log('Onlineuser > logout ERROR: ', err);
          if(doc) console.log('Onlineuser > removed: ', doc.userID, ' : ', doc.socketID);
  	  	})
	  })

  
  Onlineuser.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Onlineuser.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('onlineuser:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('onlineuser:remove', doc);
}