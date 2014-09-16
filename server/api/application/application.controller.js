'use strict';

var Application     = require('./application.model');
var mongoose = require('mongoose');
var config      = require('../../config/environment');
var User = require('../user/user.model');

var _ = require('lodash');

/**
 * Get list of applications
 * restriction: 'admin'
 */
// Get list of servers
exports.index = function(req, res) {
  Application.find(function (err, applications) {
    if(err) { return handleError(res, err); }
   return res.status(200).json(applications)
  });
};

// Get a single server
exports.show = function(req, res) {
  Application.findById(req.params.id, function (err, application) {
    if(err) { return handleError(res, err); }
    if(!application) { return res.send(404); }
    return res.json(application);
  });
};

/**
 * Creates a new application
 */
exports.create = function (req, res, next) {
  var application = new Application ();
  application.charName = req.body.charName;
  application.charClass = req.body.charClass;
  application.charSpec = req.body.charSpec;
  application.charOffSpec = req.body.charOffSpec;
  application.charArmory = req.body.charArmory;
  application.charLogs = req.body.charLogs;
  application.heroicXP = req.body.heroicXP;
  application.pastGuilds = req.body.pastGuilds;
  application.microphone = req.body.microphone;
  application.pcSpecs = req.body.pcSpecs;
  application.uiScreenshot = req.body.uiScreenshot;
  application.btag = req.body.btag;
  application.whyTS = req.body.whyTS;
  application.applicant = req.body.user;




  application.save(function(err, application) {
    if (err)
      res.send(err);
    res.json({ message: 'application saved to the database', data: application });
  });
};

// Updates an existing server in the DB.
exports.update = function(req, res) {
            Application.findById.id, function (err, application) {
                application.charName = req.body.charName;
                application.charClass = req.body.charClass;
                application.save(function () {
                    res.send('OK');
                });
            };
};

// Deletes a server from the DB.
exports.destroy = function(req, res) {
  Application.findById(req.params.id, function (err, application) {
    if(err) { return handleError(res, err); }
    if(!application) { return res.send(404); }
    application.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}