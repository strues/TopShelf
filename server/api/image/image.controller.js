'use strict';

var _ = require('lodash');
var Image = require('./image.model');
var mongoose = require('mongoose');
var fs = require('fs'),
    fsmonitor = require('fsmonitor');

fsmonitor.watch('./client/assets/images/', null, function(change) {
    var i = 0;
    while (i < change.addedFiles.length) {
        var image = new Image({
            url: 'assets/images/' + change.addedFiles[i],
        });
        image.save(function(error, found) {
            if (error)
                console.log(error);
        });
        i++;
    }

    var i = 0;
    while (i < change.removedFiles.length) {
        mongoose.model('Image').remove({
            url: 'assets/images/' + change.removedFiles[i]
        }, function(error, found) {
            if (error)
                console.log(error);
        });
        i++;
    }
});
// Get list of posts
exports.all = function(req, res) {
    Image.find(function(err, images) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(images);
    });
};

// Get a single admin-image
exports.show = function(req, res) {
    Image.findById(req.params.id, function(err, image) {
        if (err) {
            return handleError(res, err);
        }
        if (!image) {
            return res.send(404);
        }
        return res.json(image);
    });
};

// Creates a new admin-image in the DB.
exports.create = function(req, res) {
    var image = new Image(); // create a new instance of the User model
    // image.title = req.body.title; // set the users name (comes from the request)
    image.url = req.body.url; // set the users username (comes from the request)

    image.save(function(err) {
        if (err) {
            // duplicate entry
            if (err.code == 11000)
                return res.json({
                    success: false,
                    message: 'An image with that id already exists. '
                });
        } else {
            return res.send(err);
        }
        // return a message
        res.json({
            message: 'Image saved!'
        });
    });

};

// Updates an existing admin-image in the DB.
exports.update = function(req, res) {
    var imageUpdates = req.body;
    //get the original from db
    Image.findOne({
        _id: req.params.id
    }).exec(function(err, imageToEdit) {
        imageToEdit.url = imageUpdates.url;
        imageToEdit.alt = imageUpdates.alt;
        imageToEdit.caption = imageUpdates.caption;
        imageToEdit.title = imageUpdates.title;

        imageToEdit.save(function(err) {
            if (err) {
                res.sendStatus(400);
                return res.send({
                    reason: err.toString()
                });
            }
            res.send(imageToEdit);
        });
    });
};

// Deletes a admin-image from the DB.
exports.destroy = function(req, res) {
    Image.findById(req.params.id, function(err, image) {
        if (err) {
            return handleError(res, err);
        }
        if (!image) {
            return res.send(404);
        }
        image.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.sendStatus(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
