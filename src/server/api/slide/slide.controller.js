'use strict';

var _ = require('lodash');
var Slide = require('./slide.model');

// Get list of slides
exports.index = function(req, res) {
    Slide.find()
    .exec(function(err, slides) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(slides);
    });
};

// Get a single slide
exports.show = function(req, res) {
    Slide.findById(req.params.id)
    .exec(function (err, slide) {
        if (err) {
            return handleError(res, err);
        }
        if (!slide) {
            return res.sendStatus(404);
        }
        return res.json(slide);
    });
};

// Creates a new resource in the DB.
exports.create = function(req, res) {
    var slide = new Slide();   // news.create a new instance of the Resource model
    slide.image = req.body.image;  // set the resource name (comes from the request)
    slide.title = req.body.title;  // set the resource url (comes from the request)
    slide.caption = req.body.caption;

    slide.save(function(err) {
        if (err) {
          // duplicate entry
            if (err.code === 11000)
            return res.json({success: false,
              message: 'A slide with that name already exists. '});
            else {
                return res.send(err);
            }
        }

        // return a message
        res.json({message: 'Slide created!'});
    });

};

// Updates an existing slide in the DB.
exports.update = function(req, res) {
    Slide.findById(req.params.id, function(err, slide) {
        if (err) {
            return handleError(res, err);
        }
        if (!slide) {
            return res.sendStatus(404);
        }

// set the new user information if it exists in the request
        if (req.body.image) slide.image = req.body.image;
        if (req.body.title) slide.title = req.body.title;
        if (req.body.caption) slide.caption = req.body.caption;

        slide.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            console.log('slide updated');
            return res.status(200).json(slide);
        });
    });
};

// Deletes a resource from the DB.
exports.destroy = function(req, res) {
    Slide.findById(req.params.id, function (err, slide) {
        if (err) {
            return handleError(res, err);
        }
        if (!slide) {
            return res.sendStatus(404);
        }
        slide.remove(function(err) {
        if (err) {
            return handleError(res, err);
        }
        return res.sendStatus(204);
    });
    });
};

function handleError(res, err) {
    return res.status(500).json(err);
}
