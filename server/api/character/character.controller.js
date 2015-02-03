/*jshint node:true*/
'use strict';

var _ = require('lodash');
var async = require('async');
var Character = require('./character.model'),
    User = require('../user/user.model');

// Get list of characters
exports.index = function(req, res) {
    Character.find().populate('player', 'characterName')
        .exec(function(err, characters) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(characters);
        });
};

// Get a single character
exports.show = function(req, res) {
    Character.findById(req.params.id)
        .populate('player', 'characterName')
        .exec(function(err, character) {
            if (err) {
                return handleError(res, err);
            }
            if (!character) {
                return res.sendStatus(404);
            }
            return res.json(character);
        });
};

// Creates a new character in the DB.
exports.create = function(req, res) {
    Character.create(_.merge(req.body), function(err, character) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(character);
    });
};

// Updates an existing character in the DB.
exports.update = function(req, res) {
    Character.findById(req.params.id, function(err, character) {
        if (err) {
            return handleError(res, err);
        }
        if (!character) {
            return res.sendStatus(404);
        }
        // set the new user information if it exists in the request
        if (req.body.achievementPoints) character.achievementPoints = req.body.achievementPoints;
        if (req.body.battlegroup) character.battlegroup = req.body.battlegroup;
        if (req.body.class) character.class = req.body.class;
        if (req.body.gender) character.gender = req.body.gender;
        if (req.body.guild) character.guild = req.body.guild;
        if (req.body.level) character.level = req.body.level;
        if (req.body.name) character.name = req.body.name;
        if (req.body.race) character.race = req.body.race;
        if (req.body.realm) character.realm = req.body.realm;
        if (req.body.rank) character.rank = req.body.rank;
        if (req.body.player) character.player = req.body.player;
        if (req.body.ilevel) character.ilevel = req.body.ilevel;

        character.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            console.log('character updated');
            return res.status(200).json(character);
        });
    });
};

// Deletes a character from the DB.
exports.destroy = function(req, res) {
    Character.findById(req.params.id, function(err, character) {
        if (err) {
            return handleError(res, err);
        }
        if (!character) {
            return res.sendStatus(404);
        }
        character.remove(function(err) {
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
