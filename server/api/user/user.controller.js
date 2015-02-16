'use strict';

var _ = require('lodash'),
    User = require('./user.model'),
    config = require('../../config/environment'),
    jwt = require('jsonwebtoken');

var validationError = function(res, err) {
    return res.status(422).json(err);
};
/**
 * Get list of users
 * restriction: 'admin'
 */

exports.index = function(req, res) {
    User.find({}, '-salt -password', function(err, users) {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(users);
    });
};

exports.getUsers = function(req, res, next) {
    User.find(function(err, users) {
        if (err) {
            return next(err);
        }
        res.send(users);
    });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (err) {
            return next(err);
        }
        //   if (!user) return res.send(401);
        res.json(user.profile);
    });
};

// Checks if the email is already taken
// GET /api/users :email
exports.checkEmailAvailable = function(req, res, next) {
    if (!req.query.email) {
        return res.send(400, {
            message: 'Email parameter is required.'
        });
    }

    User.findOne({
        email: req.query.email
    }, function(err, user) {
        if (err) {
            return next(err);
        }
        res.send({
            available: !user
        });
    });
};

exports.getUserById = function(req, res) {
    User.findOne({
        _id: req.params.id
    }).exec(function(err, user) {
        res.send(user);
    });
};

/**
 * Creates a new user
 */
exports.create = function(req, res) {

    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    newUser.save(function(err, user) {

        if (err) {
            return validationError(res, err);
        }
        // Create the token with the session length
        var token = jwt.sign({
            _id: user._id
        }, config.secrets.session, {
            expiresInMinutes: 30 * 24 * 60
        });
        // Return the user token and log to console upon success
        res.json({
            token: token
        });
        console.log('Created user', user);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */

exports.destroy = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            return res.send(500, err);
        }
        if (!user) {
            return res.send(404);
        }
        user.remove(function(err) {
            if (err) {
                return res.send(500, err);
            }
            return res.send(204);
        });
    });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function(err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) return validationError(res, err);
                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -password', function(err, user) { // don't ever give out the password or salt
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json(401);
        }
        res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
    next();
};
