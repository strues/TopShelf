/*jshint node:true*/
'use strict';

var _       = require('lodash'),
    async   = require('async');

var Tag  = require('./tag.model');

function handleError(res, err) {
    return res.status(500).json(err);
}

exports.tagcloud = function(req, res) {
    Tag.find(function(err, tags) {
        if (err) {
            return handleError(res, err);
        } else {
            res.json(tags);
        }});
};
