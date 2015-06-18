import express from 'express';
import controller from './battlenet.controller';
import auth from '../../auth/auth.service';

var router = new express.Router();

router.post('/characters', auth.isAuthenticated(), controller.grabCharacter);
router.get('/characters/me', auth.appendUser(), controller.grabUsersCharacters);

export default router;
