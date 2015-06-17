import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let CharacterSchema = new Schema({
	lastModified: {
		type: Date
	},
	name: {
		type: String
	},
	realm: {
		type: String
	},
	battlegroup: {
		type: String
	},
	race: Number,
	class: Number,
	gender: Number,
	level: Number,
	achievementPoints: Number,
	thumbnail: String,
	calcClass: String,
	player: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Character', CharacterSchema);
