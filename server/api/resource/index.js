'use strict';

var express = require('express');
var controller = require('./resource.controller');
var Resource = require('./resource.model');

var auth = require('../../auth/auth.service');

var router = express.Router();

router.param('resource', function(req, res, next, id) {
    var query = Resource.findById(id);

    query.exec(function (err, resource) {
        if (err) {
            return next(err);
        }
        if (!resource) {
            return next(new Error('cant find resource'));
        }

        req.resource = resource;
        return next();
    });
});

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
