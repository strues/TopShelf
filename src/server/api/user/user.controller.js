import User from './user.model';
import jwt from 'jsonwebtoken';
import isNumeric from 'isnumeric';
import reportError from '../../lib/errors/reporter';

var config = require('../../config/environment');

var validationError = (res, err) => {
    return res.status(422).json(reportError(err));
};

User.on('error', err => reportError(err));

function singleUserQuery(query) {
    if (isNumeric(query)) {
        return User.findById(query);
    }
    else {
        return User.findOne({
            'username': query
        });
    }
}

/**
 * Get Users Admin restrict
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.index = function(req, res) { // don't ever give out the password or salt
    User.find({}, '-salt -hashedPassword', (err, users) => {
        if (err) {return res.status(500).json(err); }
        res.status(200).json(users);
    });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save((err, user) => {
        if (err) {
            return res.status(500).json(reportError(err));
        }
        if (!user) {
            return res.status(500).json(reportError(err));
        }

        var token = jwt.sign({
            _id: user._id
        }, config.session.secret, {
            expiresInMinutes: 60 * 5
        });

        res.status(201).json({
            token: token
        });
    });
};

/**
 * Get User
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.show = function(req, res, next) {
    var response = function(err, user) {
        if (err) {
            return res.status(500).json(reportError(err));
        }
        if (!user) {
            return res.sendStatus(404);
        }
        return res.json(user);
    };

    singleUserQuery(req.params.id).exec(response);
};

/**
 * Delete User
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.destroy = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) {return res.status(500).json(err); }
        return res.sendStatus(204);
    });
};

/**
 * Change Password
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function(err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) {return validationError(res, err); }
                res.sendStatus(200);
            });
        }
        else {
            if (err) {
                return reportError(err);
            }
            res.sendStatus(403);
        }
    });
};

/**
 * Update the current user's information
 * @param  {String} req username
 * @param  {String} res email address
 * @return {String}     user
 */
exports.updateUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            return reportError(err);
        }
        if (!user) {
            return res.sendStatus(404);
        }

        // set the new user information if it exists in the request
        if (req.body.username) {user.username = req.body.username; }
        if (req.body.email) {user.email = req.body.email; }
        if (req.body.lastUpdated) {user.lastUpdated = req.body.lastUpdated; }
        if (req.body.role) {user.role = req.body.role; }
        if (req.body.active) {user.active = req.body.active; }
        if (req.body.bio) {user.bio = req.body.bio; }

        user.save(function(err) {
            if (err) {
                return reportError(res, err);
            }
            return res.status(200).json(user);
        });
    });
};

/**
 * list
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.list = function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            reportError(err);
        }
        var userArr = [];

        users.forEach(function(user) {
            userArr.push(user);
        });

        res.send(userArr);
    });
};

/**
 * getMe
 * @param  {Number}   req  userId
 * @param  {String}   res  User
 * @param  {Function} next [description]
 * @return {User}        The user
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId // don't ever give out the password or salt
    }, '-salt -hashedPassword', function(err, user) {
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
};
