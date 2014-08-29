'use strict';

var Application     = require('./application.model');
var config      = require('../../config/environment');

/**
 * Get list of applications
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  Application.find({}, function (err, applications) {
    if(err) return res.send(500, err);
    res.json(200, applications);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var application = new Application ();
  application.user = req.user;
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
  application.whyTS = req.body.whyTS;



  application.save(function(err, application) {
    if (err) 
      res.send(err);
    res.json({ message: 'application saved to the database', data: application });
  });
};

/**
 * Get a single application
 */
exports.getApplication = function (req, res, next) {

  Application.find({ userId: req.user._id, _id: req.params.application_id }, function(err, application) {
    if (err)
      res.send(err);

    res.json(application);
  });
};

/**
 * Deletes an application
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  Application.remove({ userId: req.user._id, _id: req.params.application_id }, function(err) {

    if(err) return res.send(500, err);
    return res.json({ message: 'Application removed from the db' });
  });
};


// Create endpoint /api/applications/:application_id for PUT
exports.putApplication = function(req, res) {
  // Use the Application model to find a specific application
  Application.update({ userId: req.user._id, _id: req.params.application_id }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

