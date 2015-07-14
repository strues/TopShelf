import _ from 'lodash';
import Upload from './upload.model';
import * as config from '../../config/environment';
import fs from 'fs-extra';
import path from 'path';
import reportError from '../../lib/errors/reporter';
import errors from '../../lib/errors';

exports.all = function(req, res) {
  Upload.find(function(err, uploads) {
    if (err) {
      return reportError(err);
    }
    return res.status(200).json(uploads);
  });
};

// Get a single admin-file
exports.show = function(req, res, next) {
  Upload.findById(req.params.id, function(err, upload) {
    if (err) {
      return reportError(err);
    }
    if (!upload) {
      return next(new errors.NotFound('Unable to find a matching upload'));
    }
    return res.json(upload);
  });
};

// Creates a new admin-file in the DB.
exports.create = function(req, res) {

  let fstream;
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
    let filePath = path.join(config.root, '/client/uploads');
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
exports.update = function(req, res, next) {
  let uploadUpdates = req.body;
  //get the original from db
  Upload.findOne({
    _id: req.params.id
  })
  .exec(function(err, uploadToEdit) {
    uploadToEdit.url = uploadUpdates.url;
    uploadToEdit.alt = uploadUpdates.alt;
    uploadToEdit.caption = uploadUpdates.caption;
    uploadToEdit.title = uploadUpdates.title;
    uploadToEdit.save(function() {
      if (err) {
        return next(new errors.NotFound('There was a problem with your request'));
      }
      res.status(204).send(uploadToEdit);
    });
  });
};

// Deletes a admin-file from the DB.
exports.destroy = function(req, res, next) {
  Upload.findById(req.params.id, function(err, upload) {
    if (err) {
      return reportError(err);
    }
    if (!upload) {
      return next(new errors.NotFound('Unable to find a matching upload'));
    }
    upload.remove(function() {
      if (err) {
        return reportError(err);
      }
      return res.sendStatus(204);
    });
  });
};
