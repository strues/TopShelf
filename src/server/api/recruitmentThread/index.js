import express from 'express';
import controller from './recruitmentThread.controller';

let auth = require('../../auth/auth.service');

const router = express.Router();

router.get('/', controller.allThreads);
router.get('/:id', controller.show);
router.delete('/:id', auth.hasPermission('manageRecruitmentThreads'), controller.destroy);
router.post('/', auth.hasPermission('manageRecruitmentThreads'), controller.createThread);
router.put('/:id', auth.hasPermission('manageRecruitmentThreads'), controller.updateThread);

module.exports = router;
