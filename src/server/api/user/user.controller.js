'use strict';

var User = require('./user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
    return res.status(422).json(err);
};

/**
 * @api {get} /users Get All Users
 * @apiName index
 * @apiGroup User
 *
 * @apiSuccess {String} name Username of the new user.
 * @apiSuccess {String} battletag The user's battletag.
 * @apiSuccess {String} role The user's role.
 */
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword', function(err, users) {
        if (err) return res.status(500).json(err);
        res.status(200).json(users);
    });
};

/**
 * @api {post} /users Add New User
 * @apiName create
 * @apiGroup User
 *
 * @apiParam {String} name Username of the new user.
 * @apiParam {String} email Email address of the user.
 * @apiParam {String} password Password for the user.
 * @apiParam {String} battletag The user's battletag.
 * @apiParam {String} role The user's role.
 *
 * @apiSuccess {String} token Returns a token to the user.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 */
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({
            _id: user._id
        }, config.secrets.session, {
            expiresInMinutes: 60 * 5
        });
        res.json({
            token: token
        });
    });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (err) return next(err);
        if (!user) return res.sendStatus(401);
        res.json(user.profile);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) return res.status(500).json(err);
        return res.sendStatus(204);
    });
};

/**
 * Change a admin-users password
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
                res.sendStatus(200);
            });
        } else {
            res.sendStatus(403);
        }
    });
};

exports.update = function(req, res) {
    var userId = req.params.id;
    User.findById(req.params.id, function(err, user) {
        if (err) res.send(err);
        // set the new user information if it exists in the request
        if (req.body.email) user.email = req.body.email;
        if (req.body.role) user.role = req.body.role;
        if (req.body.username) user.username = req.body.username;
        if (req.body.battletag) user.battletag = req.body.battletag;
        // save the user
        user.save(function(err) {
            if (err) res.send(err);
            // return a message
            res.json({
                message: 'User updated!'
            });
        });
    });
};

exports.me = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.json(401);
        res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};
