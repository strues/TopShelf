'use strict';

var _        = require('lodash');
var User     = require('./user.model');
var config   = require('../../config/environment');
var jwt      = require('jsonwebtoken');


/**
 * Get list of users
 * restriction: 'admin'
 */
exports.handleError = function (res, err) {
  return res.status(500).json(err);
};

exports.validationError = function(res, err) {
  return res.status(422).json(err);
};

exports.index = function(req, res) {
  User.find({}, '-salt -password', function (err, users) {
    if(err) {
      return res.status(500).json(err);
    }
    res.status(200).json(users);
  });
};

exports.getUsers = function (req, res, next) {
    User.find(function (err, users) {
        if (err) {
            return next(err);
        }
        res.send(users);
    });
};

// Checks if the email is already taken TODO: protect with fail2ban
// GET /api/users :email
exports.checkEmailAvailable = function (req, res, next) {
    if (!req.query.email) {
        return res.send(400, {
            message: 'Email parameter is required.'
        });
    }

    User.findOne({
        email: req.query.email
    }, function (err, user) {
        if (err) {
            return next(err);
        }
        res.send({
            available: !user
        });
    });
};

exports.getUserById = function(req, res) {
    User.findOne({_id:req.params.id}).exec(function(err, user) {
        res.send(user);
    });
};

exports.updateCurrentUser = function(req, res) {
    var userUpdates = req.body;

    if(req.user._id !== userUpdates._id && !req.user.hasRole('admin')) {
        res.sendStatus(403);
        return res.end();
    }

    req.user.name = userUpdates.name;

    if(userUpdates.password && userUpdates.password.length > 0) {
        req.user.salt = encryption.createSalt();
        req.user.hashed_pwd = encryption.hashPwd(req.user.salt, userUpdates.password);
    }

    req.user.save(function(err) {
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(req.user);
    });
};

exports.updateUser = function(req, res) {
    var userUpdates = req.body;

    if(!req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    //get the original from db
    User.findOne({_id:req.params.id}).exec(function(err, userToEdit) {
        userToEdit.name     = userUpdates.name;
        userToEdit.email    = userUpdates.email;
        userToEdit.battletag = userUpdates.battletag;

        userToEdit.save(function(err) {
            if(err) {
                res.sendStatus(400);
                return res.send({reason:err.toString()});
            }
            res.send(userToEdit);
        });
    });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {

  var newUser      = new User(req.body);
  newUser.provider = 'local';
  newUser.role     = 'user';
  newUser.createdAt = new Date();
  newUser.updatedAt = new Date();
  newUser.save(function(err, user) {

    if (err) {
      return validationError(res, err);

    }
    // Create the token with the session length
  var token = jwt.sign({_id: user._id }, config.secrets.session,
    { expiresInMinutes: 30 * 24 * 60 });
  // Return the user token and log to console upon success
    res.json({ token: token });
    console.log('user ' + req.body.name + ' created');
  });
  next();
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.sendStatus(404); }
    // var updated = _.merge(post, req.body);
    var updated = _.extend(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(user);
    });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) {
      return next(err);
    }
 //   if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) {
      return res.status(500).json(err);
    }
    return res.sendStatus(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    user.authenticate(oldPass, function(authErr, authenticated) {
      if (authErr) {
        res.sendStatus(403);
      }

      if (authenticated) {
        user.password = newPass;
        user.save(function(err) {
          if (err) {
            return validationError(res, err);
          }
          res.sendStatus(200);
        });
      } else {
        res.sendStatus(403);
      }
    });
  });
  next();
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
