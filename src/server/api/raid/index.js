import express from 'express';
var controller = require('./raid.controller');
//var auth = require('../../auth/auth.service');

var router = express.Router();
router.get('/', controller.find);
router.get('/all', controller.find);
router.post('/',  controller.create);
router.put('/',  controller.update);
router.patch('/',  controller.update);
router.delete('/',  controller.delete);

// Affecting single items.
router.get('/:id', controller.findById);
router.put('/:id',  controller.updateById);
router.patch('/:id',  controller.updateById);
router.delete('/:id',  controller.deleteById);
// Export the configured express router for the post api routes
module.exports = router;
