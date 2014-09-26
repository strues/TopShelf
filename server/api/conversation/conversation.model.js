'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User 	 = require('../user/user.model');

var SchemaSettings = {
	messageRetentionLength: 200,
	maxMessageLength: 1000
}

var ConversationSchema = new Schema({
	identifier: {type: String, index: true},
  publicConversation: {type: Boolean, default: false},
  banlist: [{
  	userID: {type: Schema.Types.ObjectId, ref: 'User'},
  	reason: {
  		type: String,
  		validate: [
  		function (s){return s.length < SchemaSettings.maxMessageLength},
  		'Conversation > Ban reason length exceeds max length of '+SchemaSettings.maxMessageLength
  	]}
  }],
  admins: [{type: Schema.Types.ObjectId, ref: 'User'}],
  moderators: [{type: Schema.Types.ObjectId, ref: 'User'}],
  participants: [{type: Schema.Types.ObjectId, ref: 'User'}],
  online: [{type: Schema.Types.ObjectId, ref:'User'}],
  messages: [{
  	userID: {type: Schema.Types.ObjectId, ref: 'User'},
  	name: String,
  	text: {
  		type: String, 
  		validate: [
  			function(s){return s.length < SchemaSettings.maxMessageLength}, 
  			'Conversation > Message length exceeds max length of '+SchemaSettings.maxMessageLength
  		]
  	},
  	date: {type: String, default: Date.now}
  }]
});

/*ConversationSchema
	.path('identifier')
	.validate(function (identifier, respond){
		mongoose.model('Conversation').find({identifier: identifier}, function (err, doc){
			if(doc.length > 1) 
				respond(false);
			else
				respond(true);
		})
	})
*/
ConversationSchema
	.pre('save', function (next){
		/*
			Shift message array to ensure it's length doesn't get out of hand.
		*/
		if(this.messages.length > SchemaSettings.messageRetentionLength) this.messages.shift();

		next();
	})

ConversationSchema.statics = ConversationSchema.statics || {};

ConversationSchema.statics.findOneAndPopulate = function(query, callback){
	var findQuery;

	if(!query) callback('Conversation.findOneAndPopulate > no query parameter');
	if(!mongoose.Types.ObjectId.isValid(query))
		findQuery = {identifier: query}
	else
		findQuery = {_id: query}
	
	this
		.findOne(findQuery)
		.populate('online', 'name')
		.exec(callback);
}

ConversationSchema.statics.findOneBySharedId = function (query, callback, noPopulate){
	var findQuery;

	if(!query) callback('Conversation.findOneAndPopulate > no query parameter');
	if(!mongoose.Types.ObjectId.isValid(query))
		findQuery = {identifier: query}
	else
		findQuery = {_id: query}

	if(noPopulate){
		this
			.findOne(findQuery)
			.exec(callback);
	} else {
		this
			.findOne(findQuery)
			.populate('online', 'name')
			.exec(callback);
	}
}

ConversationSchema.methods = ConversationSchema.methods || {};

ConversationSchema.methods.isAdmin = function (userID){
	var isAdmin = false;
	this.admins.forEach(function (admin){
		if(admin.equals(userID)) isAdmin = true;
	})

	return isAdmin;
}

ConversationSchema.methods.isBanned	= function (userID){
	var isBanned = false;
	this.banlist.forEach(function (banned){
		if(banned.userID.equals(userID)) isBanned = true;
	})

	return isBanned;
}

ConversationSchema.methods.isModerator = function (userID){
	var isMod = false;
	this.moderators.forEach(function (modID){
		if(modID.equals(userID)) isMod = true;
	})

	return isMod;
}

ConversationSchema.methods.removeModerator = function (userID, moderatorID){
	var self = this,
			changeMade = false;

	if(this.isAdmin(userID)){
		this.moderators.forEach(function (modID, index){
			if(modID.equals(moderatorID)) {
				self.moderators.splice(index, 1);
				changeMade = true;
			}
		})

		if(changeMade){
			this.save(function (err){
				if(err) console.log('Conversation.removeModerator > ERROR: ', err);
			})

			if(!this.isPublic()) this.addParticipant(userID, moderatorID);
		}
	}
}

ConversationSchema.methods.addBan = function (userID, banID, reason){
	if(this.isAdmin(banID) || this.isModerator(banID)) return false;

	if(this.isAdmin(userID) && !this.isAdmin(banID)){
		this.removeModerator(userID, banID);
		this.removeParticipant(userID, banID);
		this.banlist.push({userID: banID, reason: reason || ''});
		this.muteOnBan(banID);

		return false;
	}

	if(this.isModerator(userID) && !this.isModerator(banID) && !this.isAdmin(banID)){
		this.removeModerator(userID, banID);
		this.removeParticipant(userID, banID);
		this.banlist.push({userID: banID, reason: reason || ''});
		this.muteOnBan(banID);

		return false;
	}
}

ConversationSchema.methods.removeBan = function (userID, banID){
	var self = this,
			changeMade = false;

	if(this.isAdmin(userID) || this.isModerator(userID)){
		this.banlist.forEach(function (banned, index){
			if(banned.userID.equals(banID)) {
				self.banlist.splice(index, 1);
				changeMade = true;
			}
		})

		if(changeMade){
			this.save(function (err){
				if(err) console.log('Conversation.removeBan > ERROR: ', err);
			})

			if(!this.isPublic()) this.addParticipant(userID, banID);
		}
	}
}

ConversationSchema.methods.addModerator = function (userID, modID){
	if(this.isAdmin(userID)){
		if(!this.isModerator(modID)) {
			this.moderators.push(modID);
			this.save(function (err){
				if(err) console.log('Conversation.addModerator > ERROR: ', err);
			})
		}
	}
}

ConversationSchema.methods.isParticipant = function (userID){
	var isParticipant = false;
	
	this.participants.forEach(function (participantID){
		if(participantID.equals(userID)) isParticipant = true;
	})

	return isParticipant;
}

ConversationSchema.methods.addParticipant = function (userID, partID){
	if(this.isPublic() || this.isModerator(userID) || this.isAdmin(userID)){
		this.participants.push(partID);
		this.save(function (err){
			if(err) console.log('Conversation.addParticipant > ERROR: ', err);
		})
	}
}

ConversationSchema.methods.removeParticipant = function (userID, participantID){
	var self = this,
			changeMade = false;

	if(this.isAdmin(userID) || this.isModerator(userID)){
		this.participants.forEach(function (partID, index){
			if(partID.equals(participantID)) {
				self.participants.splice(index, 1);
				changeMade = true;
			}
		})

		if(changeMade){
			this.save(function (err){
				if(err) console.log('Conversation.removeModerator > ERROR: ', err);
			})
		}
	}
}

ConversationSchema.methods.isPublic = function(){
	return this.publicConversation;
}

ConversationSchema.methods.maySee = function (userID){
	if(this.isPublic()) return true;
	if(this.isAdmin(userID) || this.isModerator(userID) || this.isParticipant(userID)) return true;
	return false;
}

ConversationSchema.methods.addMessage = function (userID, message){
	if(this.isBanned(userID)) return false;

	if(this.isPublic() || this.isParticipant(userID) || this.isModerator(userID) || this.isAdmin(userID)){
		var self = this;

		/*
			Get User name/ID
		*/

		User.findOne({_id: userID}, 'name', function (err, user){
			if(err) console.log('Conversation.addMessage > Can\'t retrieve user with ID :', userID, 'ERROR: ', err);
			if(user) {

				message.name = user.name;
				message.userID = user._id;

				self.messages.push(message);

				self.save(function (err){
					if(err) console.log('Conversation.addMessage > ERROR: ', err);
				})
			}

		})

	}
}

ConversationSchema.methods.muteMessage = function (userID, messageID){
	var self = this,
			hasChanged = false,
			ownerIsAdmin,
			ownerIsModerator,
			messageOwner;

	this.messages.forEach(function (message){
		if(message._id.equals(messageID)) messageOwner = message.userID;
	})

	ownerIsAdmin 			= this.isAdmin(messageOwner);
	ownerIsModerator 	= this.isModerator(messageOwner);

	if(ownerIsAdmin) return false;
	if(ownerIsModerator && this.isModerator(userID)) return false;

	if(this.isModerator(userID) || this.isAdmin(userID)) {
		this.messages.forEach(function (message, index){
			if(message._id.equals(messageID)) {
				self.messages[index].text = '[Redacted]';
				hasChanged = true;
			}
		})
	}

	this.save(function (err){
		if(err) console.log('Conversation.muteMessage > Error saving changes ERROR: ', err);
	})
}

ConversationSchema.methods.notifyOnline = function (userID){
	if(this.maySee(userID)) {
		var exists = false;

		this.online.forEach(function (uid){
			if(uid.equals(userID)) exists = true;
		})

		if(!exists){
			this.online.push(userID);
			this.save(function (err){
				console.log('saved')
				if(err) console.log('Conversation.notifyOnline > ERROR: ', err);
			})
		}
	}
}

ConversationSchema.methods.notifyOffline = function (userID){
	var self = this,
			hasChanged = false;

	this.online.forEach(function (uid, index){
		if(uid.equals(userID)) {
			self.online.splice(index, 1);
			hasChanged = true;
		}
	})

	if(hasChanged) {
		this.save(function (err){
			if(err) console.log('Conversation.notifyOffline > ERROR: ', err);
		})
	}
}

ConversationSchema.methods.muteOnBan = function (userID){
	this.messages.map(function (message){
		if(message.userID.equals(userID)) message.text = '[Banned]';
		return message;
	})

	this.save(function (err){
		if(err) console.log('Conversation.muteOnBan > ERROR: ', err);
	})
}

module.exports = mongoose.model('Conversation', ConversationSchema);