'use strict';

var _           = require('lodash');
var mongoose    = require('mongoose');
var moment      = require('moment');
var async       = require('async');
var Application = require('./application.model');
var User        = require('../user/user.model');

/**
 * @api {get} /applications All applications.
 * @apiName all
 * @apiGroup Application
 *
 * @apiSuccess {String} charName  The applicant's main character's name.
 * @apiSuccess {String} charClass The applicant's character class.
 * @apiSuccess {String} charSpec The applicant's specialization.
 * @apiSuccess {Date} created The date the application was submitted.
 */
exports.all = function(req, res) {
    Application.find().populate('user', 'name')
        .exec(function(err, applications) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(applications);
        });
};

/**
 * @api {get} /applications/:id Get Application By Id
 * @apiName get
 * @apiGroup Application
 *
 * @apiParam {populate} res Returns the user's name.
 * @apiParam {Number} id Applications unique ID.
 *
 * @apiSuccess {String} charName  The applicant's main character's name.
 * @apiSuccess {String} charClass The applicant's character class.
 * @apiSuccess {String} charSpec The applicant's specialization.
 * @apiSuccess {String} charArmory A link to the armory for the character.
 * @apiSuccess {String} applicantName Firstname of the User.
 * @apiSuccess {String} charServer The server where the applicants character resides.
 * @apiSuccess {Number} applicantAge How old the person is.
 * @apiSuccess {String} applicantTZ The timezone of the applicant.
 * @apiSuccess {String} applicantRealId The battletag or realid for contacting the applicant.
 * @apiSuccess {String} charLogs Link to WarcraftLogs parses.
 * @apiSuccess {String} heroicXP Explaination of previous raiding experience.
 * @apiSuccess {String} pastGuilds A history of the applicants guilds.
 * @apiSuccess {String} screenshot An image from within a raid environment.
 * @apiSuccess {String} whyTS Why do you want to join Top Shelf?
 * @apiSuccess {String} applicantJoke Tell us a joke.
 * @apiSuccess {String} applicantSelfImprovement Where do you go for outside information about your class?
 * @apiSuccess {String} applicantAlt Link to the armory of any alts.
 * @apiSuccess {Date} created The date the application was submitted.
 */
exports.get = function(req, res) {
    Application.findById(req.params.id)
        .populate('user', 'name')
        .exec(function(err, application) {
            if (err) {
                return handleError(res, err);
            }
            if (!application) {
                return res.sendStatus(404);
            }
            return res.json(application);
        });
};

/**
 * @api {post} /applications Create An Application
 * @apiName create
 * @apiGroup Application
 *
 * @apiParam {String} charName  The applicant's main character's name.
 * @apiParam {String} charClass The applicant's character class.
 * @apiParam {String} charSpec The applicant's specialization.
 * @apiParam {String} charArmory A link to the armory for the character.
 * @apiParam {String} applicantName Firstname of the User.
 * @apiParam {String} charServer The server where the applicants character resides.
 * @apiParam {Number} applicantAge How old the person is.
 * @apiParam {String} applicantTZ The timezone of the applicant.
 * @apiParam {String} applicantRealId The battletag or realid for contacting the applicant.
 * @apiParam {String} charLogs Link to WarcraftLogs parses.
 * @apiParam {String} heroicXP Explaination of previous raiding experience.
 * @apiParam {String} pastGuilds A history of the applicants guilds.
 * @apiParam {String} screenshot An image from within a raid environment.
 * @apiParam {String} whyTS Why do you want to join Top Shelf?
 * @apiParam {String} applicantJoke Tell us a joke.
 * @apiParam {String} applicantSelfImprovement Where do you go for outside information about your class?
 * @apiParam {String} applicantAlt Link to the armory of any alts.
 * @apiParam {Date} created The date the application was submitted.
 */
exports.create = function(req, res) {
    Application.create(req.body, function(err, application) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(application);
    });
};

/**
 * @api {put} /application/:id Modify An Application
 * @apiName update
 * @apiGroup Application
 *
 * @apiParam {Number} id          Applications unique ID.
 * @apiParam {String} [state] The status of the application (pending, declined, accepted).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Application.findById(req.params.id, function(err, application) {
        if (err) {
            return handleError(res, err);
        }
        if (!application) {
            return res.sendStatus(404);
        }
        var updated = _.merge(application, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(application);
        });
    });
};

/**
 * @api {delete} /applications/:id Delete The Application
 * @apiName destroy
 * @apiGroup Application
 *
 * @apiParam {Number} id          Applications unique ID.
 * @apiPermission admin
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 */
exports.destroy = function(req, res) {
    Application.findById(req.params.id, function(err, application) {
        if (err) {
            return handleError(res, err);
        }
        if (!application) {
            return res.sendStatus(404);
        }
        application.remove(function(err) {
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
