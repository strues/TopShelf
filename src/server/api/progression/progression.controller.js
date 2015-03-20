'use strict';

var _ = require('lodash');
var Progression = require('./progression.model');

/**
 * @api {get} /progression Get Progression Status.
 * @apiName all
 * @apiGroup Progression
 *
 * @apiSuccess {String} bossName The name of the killed boss.
 * @apiSuccess {String} killdate When the boss was killed.
 */
exports.all = function(req, res) {
    Progression.find()
        .exec(function(err, progressions) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(progressions);
        });
};

/**
 * @api {get} /progression/:id Get Progression By Id
 * @apiName show
 * @apiGroup Progression
 *
 * @apiParam {Number} id Bosses unique ID.
 *
 * @apiSuccess {String} bossName The the name of the boss killed.

 */
exports.show = function(req, res) {
    Progression.findById(req.params.id, function(err, progression) {
        if (err) {
            return handleError(res, err);
        }
        if (!progression) {
            return res.sendStatus(404);
        }
        return res.json(progression);
    });
};

/**
 * @api {post} /progression Post Progression Needs
 * @apiName create
 * @apiGroup Progression
 *
 * @apiPermission admin
 *
 * @apiParam {String} bossName The name of the killed boss.
 * @apiParam {String} killdate When the boss was killed.
 */
exports.create = function(req, res) {
    Progression.create(req.body, function(err, progression) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(progression);
    });
};

/**
 * @api {put} /progression/:id Update Progression
 * @apiName update
 * @apiGroup Progression
 *
 * @apiParam {Number} id Bosses unique ID.
 *
 * @apiParam {String} bossName The the name of the boss killed.
 * @apiParam {String} zone Where the boss is located.
 * @apiParam {String} dead Is the boss dead or not?
 * @apiParam {Date} date of the boss kill

 */
exports.update = function(req, res) {
    Progression.findById(req.params.id, function(err, progression) {
        if (err) {
            return handleError(res, err);
        }
        if (!progression) {
            return res.sendStatus(404);
        }

        // set the new user information if it exists in the request
        if (req.body.bossName) progression.bossName = req.body.bossName;
        if (req.body.dead) progression.dead = req.body.dead;
        if (req.body.zone) progression.zone = req.body.zone;
        if (req.body.killDate) progression.killDate = req.body.killDate;

        progression.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            console.log('progression updated');
            return res.status(200).json(progression);
        });
    });
};

/**
 * @api {delete} /progression/:id Delete The Progression Need
 * @apiName destroy
 * @apiGroup Progression
 *
 * @apiPermission admin
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 */
exports.destroy = function(req, res) {
    Progression.findById(req.params.id, function(err, progression) {
        if (err) {
            return handleError(res, err);
        }
        if (!progression) {
            return res.sendStatus(404);
        }
        progression.remove(function(err) {
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
