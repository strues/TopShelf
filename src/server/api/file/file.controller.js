'use strict';

var _ = require('lodash');
var File = require('./file.model');
var User = require('../user/user.model');
var mongoose = require('mongoose');
var config = require('../../config/environment');
var busboy = require('connect-busboy');
var fs = require('fs-extra');
var path = require('path');

exports.all = function(req, res) {
  File.find(function(err, files) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(files);
  });
};

// Get a single admin-file
exports.show = function(req, res) {
  File.findById(req.params.id, function(err, file) {
    if (err) {
      return handleError(res, err);
    }
    if (!file) {
      return res.send(404);
    }
    return res.json(file);
  });
};

// Creates a new admin-file in the DB.
exports.create = function(req, res) {

  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function(fieldname, file, filename) {
    if (filename.length === 0) {
      res.sendStatus(400);
      res.json({
        message: 'No file selected!'
      });
    }

    console.log('Uploading: ' + filename);

    // create 'files' folder if it doesn't exist
    var filePath = path.join(config.root, '/client/assets/uploads');
    fs.exists(filePath, function(exists) {
      if (!exists) {
        fs.mkdir(filePath);
      }

      // create '<username>' folder if it doesn't exist
      filePath = path.join(config.root, '/client/assets/uploads');
      fs.exists(filePath, function(exists) {
        if (!exists) {
          fs.mkdir(filePath);
        }

        fstream = fs.createWriteStream(path.join(filePath, filename));
        file.pipe(fstream);
        fstream.on('close', function() {
          console.log('Upload Finished of ' + filename);

          new File({
            title: req.body.title,
            url: filePath,
            created: new Date(),
            filename: filename,
            isPrivate: false,
            description: req.body.description,
            user: req.user
          }).save(function(err, file) {
            if (err) {
              console.log(err);
            }

            res.sendStatus(201);
          });
        });
      });
    });
  });
};

// Updates an existing admin-file in the DB.
exports.update = function(req, res) {
  var fileUpdates = req.body;
  //get the original from db
  File.findOne({
    _id: req.params.id
  }).exec(function(err, fileToEdit) {
    fileToEdit.url = fileUpdates.url;
    fileToEdit.alt = fileUpdates.alt;
    fileToEdit.caption = fileUpdates.caption;
    fileToEdit.title = fileUpdates.title;

    fileToEdit.save(function(err) {
      if (err) {
        res.sendStatus(400);
        return res.send({
          reason: err.toString()
        });
      }
      res.send(fileToEdit);
    });
  });
};

// Deletes a admin-file from the DB.
exports.destroy = function(req, res) {
  File.findById(req.params.id, function(err, file) {
    if (err) {
      return handleError(res, err);
    }
    if (!file) {
      return res.send(404);
    }
    file.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.sendStatus(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
