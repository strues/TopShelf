'use strict';

var _ = require('lodash');
var Upload = require('./upload.model');
var User = require('../user/user.model');
var mongoose = require('mongoose');
var config = require('../../config/environment');
var busboy = require('connect-busboy');
var fs = require('fs-extra');
var path = require('path');

exports.all = function(req, res) {
  Upload.find(function(err, uploads) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(uploads);
  });
};

// Get a single admin-file
exports.show = function(req, res) {
  Upload.findById(req.params.id, function(err, upload) {
    if (err) {
      return handleError(res, err);
    }
    if (!upload) {
      return res.send(404);
    }
    return res.json(upload);
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

    // create 'uploads' folder if it doesn't exist
    var filePath = path.join(config.root, '/client/uploads');
    fs.exists(filePath, function(exists) {
      if (!exists) {
        fs.mkdir(filePath);
      }

      // create '<username>' folder if it doesn't exist
      filePath = path.join(config.root, '/client/uploads');
      fs.exists(filePath, function(exists) {
        if (!exists) {
          fs.mkdir(filePath);
        }

        fstream = fs.createWriteStream(path.join(filePath, filename));
        file.pipe(fstream);
        fstream.on('close', function() {
          console.log('Upload Finished of ' + filename);

          new Upload({
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
  var uploadUpdates = req.body;
  //get the original from db
  Upload.findOne({
    _id: req.params.id
  }).exec(function(err, uploadToEdit) {
    uploadToEdit.url = uploadUpdates.url;
    uploadToEdit.alt = uploadUpdates.alt;
    uploadToEdit.caption = uploadUpdates.caption;
    uploadToEdit.title = uploadUpdates.title;

    uploadToEdit.save(function(err) {
      if (err) {
        res.sendStatus(400);
        return res.send({
          reason: err.toString()
        });
      }
      res.send(uploadToEdit);
    });
  });
};

// Deletes a admin-file from the DB.
exports.destroy = function(req, res) {
  Upload.findById(req.params.id, function(err, upload) {
    if (err) {
      return handleError(res, err);
    }
    if (!upload) {
      return res.send(404);
    }
    upload.remove(function(err) {
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
