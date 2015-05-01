var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
    _id: String,
    value : {count : Number}
});

mongoose.model('Tag', TagSchema);
