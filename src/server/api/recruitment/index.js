import express from 'express';
let controller = require('./recruitment.controller');
let auth = require('../../auth/auth.service');

const router = express.Router();

router.get('/', controller.all);
router.get('/:id', controller.show);
router.post('/', auth.hasPermission('manageRecruitment'), controller.create);
router.put('/:id', auth.hasPermission('manageRecruitment'), controller.update);
router.delete('/:id', auth.hasPermission('manageRecruitment'), controller.destroy);

export default router;
