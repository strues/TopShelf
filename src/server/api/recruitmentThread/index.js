import express from 'express';
import controller from './recruitmentThread.controller';

let auth = require('../../auth/auth.service');

const router = express.Router();

router.get('/', controller.allThreads);
router.get('/:id', controller.show);
router.delete('/:id', controller.destroy);
router.post('/', controller.createThread);
router.put('/:id', controller.updateThread);

module.exports = router;
