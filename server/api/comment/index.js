'use strict';

var express = require('express');
var controller = require('./comment.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.get);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.param('commentId', controller.getById);
    router.param('postId', controller.getListByPost);

module.exports = router;
