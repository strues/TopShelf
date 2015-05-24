'use strict';

var _ = require('lodash');
var Recruitment = require('./recruitment.model');

function handleError(res, err) {
  return res.status(500).json(err);
}

/**
 * @api {get} /recruitment Get Recruitment Status.
 * @apiName all
 * @apiGroup Recruitment
 *
 * @apiSuccess {String} classType The class needed.
 * @apiSuccess {String} classSpec The specialization of the class.
 * @apiSuccess {String} priority How badly the guild needs the applicant.
 * @apiSuccess {String} status Whether or not recruitment is necessary.
 */
exports.list = function(req, res) {
  Recruitment.find().exec(function(err, recruitments) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).send(recruitments);
  });
};

/**
 * @api {get} /recruitment/:id Get Recruitment By Id
 * @apiName show
 * @apiGroup Recruitment
 *
 * @apiParam {Number} id Applications unique ID.
 *
 * @apiSuccess {String} classType The class needed.
 * @apiSuccess {String} classSpec The specialization of the class.
 * @apiSuccess {String} priority How badly the guild needs the applicant.
 * @apiSuccess {String} status Whether or not recruitment is necessary.
 */
exports.show = function(req, res) {
  Recruitment.findById(req.params.id, function(err, recruitment) {
    if (err) {
      return handleError(res, err);
    }
    if (!recruitment) {
      return res.sendStatus(404);
    }
    return res.status(200).json(recruitment);
  });
};

/**
 * @api {post} /recruitment Post Recruitment Needs
 * @apiName create
 * @apiGroup Recruitment
 *
 * @apiPermission admin
 *
 * @apiParam {String} classType The class needed.
 * @apiParam {String} classSpec The specialization of the class.
 * @apiParam {String} priority How badly the guild needs the applicant.
 * @apiParam {String} status Whether or not recruitment is necessary.
 */
exports.create = function(req, res) {
  Recruitment.create(req.body, function(err, recruitment) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(recruitment);
  });
};

/**
 * @api {delete} /recruitment/:id Delete The Recruitment Need
 * @apiName destroy
 * @apiGroup Recruitment
 *
 * @apiPermission admin
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 */
exports.destroy = function(req, res) {
  Recruitment.findById(req.params.id, function(err, recruitment) {
    if (err) {
      return handleError(res, err);
    }
    if (!recruitment) {
      return res.sendStatus(404);
    }
    recruitment.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.sendStatus(204);
    });
  });
};
