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

// Get a single admin-recruitment
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

// Creates a new admin-recruitment in the DB.
exports.create = function(req, res) {
    Recruitment.create(req.body, function(err, recruitment) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, recruitment);
    });
};

// Updates an existing admin-recruitment in the DB.
exports.update = function(req, res) {
 var recruitmentUpdates = req.body;

    //get the original from db
    Recruitment.findOne({
        _id: req.params.id
    }).exec(function(err, recruitmentToEdit) {
        recruitmentToEdit.websiteName = recruitmentUpdates.websiteName;
        recruitmentToEdit.websiteUrl = recruitmentUpdates.websiteUrl;

        recruitmentToEdit.save(function(err) {
            if (err) {
                res.sendStatus(400);
                return res.send({
                    reason: err.toString()
                });
            }
            res.send(recruitmentToEdit);
        });
    });
};

// Deletes a admin-recruitment from the DB.
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
