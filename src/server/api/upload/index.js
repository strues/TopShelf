'use strict';

var express    = require('express'),
    controller = require('./upload.controller'),
    auth       = require('../../auth/auth.service'),
    router     = express.Router();

router.get('/', controller.all);
router.get('/:id', controller.show);

router.post('/', controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
