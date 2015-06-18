import express from 'express';
import controller from './battlenet.controller';
import auth from '../../auth/auth.service';

var router = new express.Router();

router.post('/character', auth.isAuthenticated(), controller.grabCharacter);
router.get('/character', controller.index);

export default router;
