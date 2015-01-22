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
    Resource.create(function(err, resource) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(resource);
    });
};

// Updates an existing resource in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Resource.findById(req.params.id, function(err, resource) {
        if (err) {
            return handleError(res, err);
        }
        if (!resource) {
            return res.sendStatus(404);
        }

        var updated = _.merge(resource, req.body._id);
        console.log(updated.resource);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            console.log(updated.resource);
            return res.status(200).json(updated);
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
