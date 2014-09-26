'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OnlineuserSchema = new Schema({
	userID: { type: Schema.Types.ObjectId, ref: 'User' },
	socketID: String,
	status: {type: String, default: 'online'}
});

OnlineuserSchema.methods.isOnline = function (userID){
	mongoose
		.model('Onlineuser', OnlineuserSchema)
		.find({userID: userID}, function (){})
}

module.exports = mongoose.model('Onlineuser', OnlineuserSchema);