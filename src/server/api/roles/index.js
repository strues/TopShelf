import express from 'express';
let controller = require('./roles.controller');
let auth = require('../../auth/auth.service');
const router = express.Router();

// Affecting multiple or all items.
router.get('/', controller.find);
router.get('/all', controller.find);
router.post('/', auth.hasPermission('manageRoles'), controller.create);
router.put('/', auth.hasPermission('manageRoles'), controller.update);
router.patch('/', auth.hasPermission('manageRoles'), controller.update);
router.delete('/', auth.hasPermission('manageRoles'), controller.delete);

// Affecting single items.
router.get('/:id', controller.findById);
router.put('/:id', auth.hasPermission('manageRoles'), controller.updateById);
router.patch('/:id', auth.hasPermission('manageRoles'), controller.updateById);
router.delete('/:id', auth.hasPermission('manageRoles'), controller.deleteById);

export default router;
