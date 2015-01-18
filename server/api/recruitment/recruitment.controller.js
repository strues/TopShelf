'use strict';

var _ = require('lodash');
var Recruitment = require('./recruitment.model');

// Get list of posts
exports.index = function(req, res) {
    Recruitment.find(function(err, recruitments) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(recruitments);
    });
};

// Get a single recruitment
exports.show = function(req, res) {
    Recruitment.findById(req.params.id, function(err, recruitment) {
        if (err) {
            return handleError(res, err);
        }
        if (!recruitment) {
            return res.send(404);
        }
        return res.json(recruitment);
    });
};

// Creates a new recruitment in the DB.
exports.create = function(req, res) {
    Recruitment.create(req.body, function(err, recruitment) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, recruitment);
    });
};

// Updates an existing recruitment in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Recruitment.findById(req.params.id, function(err, recruitment) {
        if (err) {
            return handleError(res, err);
        }
        if (!recruitment) {
            return res.send(404);
        }
        // var updated = _.merge(recruitment, req.body);
        var updated = _.extend(recruitment, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, recruitment);
        });
    });
};

// Deletes a recruitment from the DB.
exports.destroy = function(req, res) {
    Recruitment.findById(req.params.id, function(err, recruitment) {
        if (err) {
            return handleError(res, err);
        }
        if (!recruitment) {
            return res.send(404);
        }
        recruitment.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
