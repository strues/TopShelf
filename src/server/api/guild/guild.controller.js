'use strict';

var _ = require('lodash');
var Guild = require('./guild.model');

/**
 * @api {get} /guild Get Guild Status.
 * @apiName all
 * @apiGroup Guild
 *
 */
exports.all = function(req, res) {
  Guild.find()
    .exec(function(err, guilds) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(guilds);
    });
};

/**
 * @api {get} /guild/:id Get Guild By Id
 * @apiName show
 * @apiGroup Guild
 *
 * @apiParam {Number} id Applications unique ID.
 *
 * @apiSuccess {String} classType The class needed.
 * @apiSuccess {String} classSpec The specialization of the class.
 * @apiSuccess {String} priority How badly the guild needs the applicant.
 * @apiSuccess {String} status Whether or not guild is necessary.
 */
exports.show = function(req, res) {
  Guild.findById(req.params.id, function(err, guild) {
    if (err) {
      return handleError(res, err);
    }
    if (!guild) {
      return res.sendStatus(404);
    }
    return res.json(guild);
  });
};

/**
 * @api {post} /guild Post Guild Needs
 * @apiName create
 * @apiGroup Guild
 *
 * @apiPermission admin
 *
 * @apiParam {String} classType The class needed.
 * @apiParam {String} classSpec The specialization of the class.
 * @apiParam {String} priority How badly the guild needs the applicant.
 * @apiParam {String} status Whether or not guild is necessary.
 */
exports.create = function(req, res) {
  Guild.create(req.body, function(err, guild) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(guild);
  });
};

/**
 * @api {put} /recruiting/:id Update Guild Needs
 * @apiName updateGuild
 * @apiGroup Guild
 *
 * @apiPermission admin
 *
 * @apiParam {String} classType The class needed.
 * @apiParam {String} classSpec The specialization of the class.
 * @apiParam {String} priority How badly the guild needs the applicant.
 * @apiParam {Boolean} currentlyRecruiting Whether or not guild is necessary.
 * @apiParam {Date} updatedOn The last time this data was changed
 */
exports.update = function(req, res) {
  Guild.findById(req.params.id, function(err, guild) {
    if (err) {
      return handleError(res, err);
    }
    if (!guild) {
      return res.sendStatus(404);
    }

    // set the new user information if it exists in the request
    if (req.body.classType) guild.classType =
      req.body.classType;
    if (req.body.classSpec) guild.classSpec =
      req.body.classSpec;
    if (req.body.priority) guild.priority =
      req.body.priority;
    if (req.body.currentlyRecruiting) guild.currentlyRecruiting =
      req.body.currentlyRecruiting;
    if (req.body.updatedOn) guild.updatedOn =
      req.body.updatedOn;

    guild.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).json(guild);
    });
  });
};

/**
 * @api {delete} /recruiting/:id Delete The Guild Need
 * @apiName destroy
 * @apiGroup Guild
 *
 * @apiPermission admin
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 */
exports.destroy = function(req, res) {
  Guild.findById(req.params.id, function(err, guild) {
    if (err) {
      return handleError(res, err);
    }
    if (!guild) {
      return res.sendStatus(404);
    }
    guild.remove(function(err) {
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
