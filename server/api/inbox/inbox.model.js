'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SchemaSettings = {
  maxMessageLength: 1000,
  maxMessagesLength: 80
}

var InboxSchema = new Schema({
	owner: {type: Schema.Types.ObjectId, ref: 'User'},
  box: [{
    sender: {type: Schema.Types.ObjectId, ref: 'User'},
    messages: [{
      message: {
        type: String, 
        validate: [
          function (s){return s.length < SchemaSettings.maxMessageLength}, 
          'Inbox > inbox.box.messages.message ERROR: message.length > '+SchemaSettings.maxMessageLength
        ]
      },
      date: {type: Date, default: Date.now}
    }]
  }]
});

InboxSchema.pre('save', function (next){
	var inbox = this;
	
	if(!inbox || !inbox.box || !inbox.box.messages) {
		next();
		return false;
	}

	if(inbox.box.messages.length > SchemaSettings.maxMessagesLength){
		inbox.box.messages.$shift();
		next();
	}
})

InboxSchema.statics = {};

InboxSchema.statics.findByOwner = function (ownerID, cb){
  var Inbox = this || mongoose.model('Inbox');

  Inbox.findOne({owner: ownerID}, cb);
}

InboxSchema.methods = {};

InboxSchema.methods.addMessage = function (recipientID, senderID, message){
  if(this.owner.equals(recipientID)){
    var boxExists = false;

    for(var i = 0, l = this.box.length; i < l; i++){
      var box = this.box[i];

      if(box.sender.equals(senderID)){      
        box.messages.push({message: message});
        
        boxExists = true;
      }
          }
        this.save = function (err){
          if(err) console.log(err);
        }



    if(!boxExists) {
      this.box.push({
        sender: senderID,
        messages: [{
          message: message
        }]
      })

      this.save(function (err){
        if(err) console.log(err);
      })
    }
  }
}

module.exports = mongoose.model('Inbox', InboxSchema);