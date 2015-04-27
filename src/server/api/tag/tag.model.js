var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
    tagName: String,
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
});

mongoose.model('Tag', TagSchema);
