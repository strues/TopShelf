
/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var User = require('./user.model'),
		Auth = require('../../auth/auth.service');

exports.register = {};

exports.register.off = function (socket, socketPool){
	//Remove socketID
	setTimeout(function (){
		socket.userID = undefined;
	}, 100)

	User.findOne({socketID: socket.id}, function (err, doc){
		if(err) console.log('User.socket.off ERROR > can\'t query user collection: ', err);
		if(doc){
			doc.socketID = '';
			doc.online	 = false;
			
			doc.save(function (err){
				if(err) console.log('User.socket.off ERROR > can\'t update socketID: ', err);
			})
		}
	})
}

exports.register.on = function (socket){
	socket
		.on('user:auth', function (token){
			Auth.tokenToUserID(token, function (err, userID){
				User
					.findOne({_id: userID}, function (err, doc){
						if(err) console.log('User.socket.on.auth ERROR > can\'t query user collection: ', err);
						if(doc){
							doc.socketID 	= socket.id;
							doc.online		= true;

							doc.save(function (err){
								if(err) console.log('User.socket.on.auth ERROR > can\'t update socketID: ', err);
							})

							socket.userID = doc._id;
							socket.userRole = doc.role;
							socket.completeUser = doc;
						}
					})
			})
		})
		.on('user:logout', function (token){
			console.log('User.socket.off > token: ', token);
			Auth.tokenToUserID(token, function (err, userID){
				User.findOne({_id: userID}, function (err, doc){
					if(err) console.log('User.socket.on.logout ERROR > can\'t query user collection: ', err);
					if(doc){
						doc.socketID = '';
						doc.online 	 = false;

						doc.save(function (err){
							if(err) console.log('User.socket.on.logout ERROR > can\'t update socketID: ', err);
						})
					}
				})
			})
		})

		User.schema.post('save', function (doc){
			onSave(socket, doc);
		})

		User.schema.post('remove', function (doc){
			onRemove(socket, doc);
		})
}

function onSave(socket, doc, cb) {
	if(!socket.userID) return false;

  User
  	.findOne({_id: socket.userID}, '-hashedPassword -salt')
    .populate('friendlist', 'name online')
    .populate('friendrequests', 'name')
    .populate('pendingfriendrequests', 'name') 
    .populate('conversations')
    .exec(function (err, user){
	  	if(err) console.log('User.socket.save ERROR > ', err);
	  	if(user) socket.emit('user:save', user);
	  })
}

function onRemove(socket, doc, cb) {
	if(!socket.userID) return false;

	User
  	.findOne({_id: socket.userID}, '-hashedPassword -salt')
    .populate('friendlist', 'name online')
    .populate('friendrequests', 'name')
    .populate('pendingfriendrequests', 'name') 
    .populate('conversations')
    .exec(function (err, user){
	  	if(err) console.log('User.socket.save ERROR > ', err);
	  	if(user) socket.emit('user:remove', user);
	  })
}