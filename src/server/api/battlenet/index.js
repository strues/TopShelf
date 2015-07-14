import express from 'express';
import auth from '../../auth/auth.service';
import controller from './battlenet.controller';

const router = new express.Router();

router.post('/characters', auth.isAuthenticated(), controller.grabCharacter);
router.get('/characters/me', auth.appendUser(), controller.grabUsersCharacters);

export default router;
