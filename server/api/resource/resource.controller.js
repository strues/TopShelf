'use strict';

var _ = require('lodash');
var Resource = require('./resource.model');

// Get list of resources
exports.index = function(req, res) {
    Resource.find()
    .exec(function(err, resources) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(resources);
    });
};

// Get a single resource
exports.show = function(req, res) {
    Resource.findById(req.params.id)
    .exec(function (err, resource) {
        if (err) {
            return handleError(res, err);
        }
        if (!resource) {
            return res.sendStatus(404);
        }
        return res.json(resource);
    });
};

// Creates a new resource in the DB.
exports.create = function(req, res) {
    var resource = new Resource();   // create a new instance of the Resource model
    resource.websiteName = req.body.websiteName;  // set the resource name (comes from the request)
    resource.websiteUrl = req.body.websiteUrl;  // set the resource url (comes from the request)

    resource.save(function(err) {
        if (err) {
          // duplicate entry
            if (err.code === 11000)
            return res.json({success: false,
              message: 'A resource with that name already exists. '});
            else {
                return res.send(err);
            }
        }

        // return a message
        res.json({message: 'Resource created!'});
    });

};

// Updates an existing resource in the DB.
exports.update = function(req, res) {
    Resource.findById(req.params.id, function(err, resource) {
        if (err) {
            return handleError(res, err);
        }
        if (!resource) {
            return res.sendStatus(404);
        }

// set the new user information if it exists in the request
        if (req.body.websiteName) resource.websiteName = req.body.websiteName;
        if (req.body.websiteUrl) resource.websiteUrl = req.body.websiteUrl;

        resource.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            console.log('resource updated');
            return res.status(200).json(resource);
        });
    });
};

// Deletes a resource from the DB.
exports.destroy = function(req, res) {
    Resource.findById(req.params.id, function (err, resource) {
        if (err) {
            return handleError(res, err);
        }
        if (!resource) {
            return res.sendStatus(404);
        }
        resource.remove(function(err) {
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
