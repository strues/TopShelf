'use strict';

var express = require('express');
var controller = require('./application.controller');
var auth = require('../../auth/auth.service');
var Application = require('./application.model').model;
var contextService = require('request-context');
var router = express.Router();

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');


router.param('application', function(req, res, next, id) {
    var query = Application.findById(id);

    query.exec(function (err, application) {
        if (err) {
            return next(err);
        }
        if (!application) {
            return next(new Error('cant find application'));
        }

        req.application = application;
        return next();
    });
});

router.get('/', auth.hasRole('admin'), controller.all);
router.get('/:id', auth.hasRole('admin'), controller.get);
router.post('/', controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
