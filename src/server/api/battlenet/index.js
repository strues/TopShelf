import express from 'express'
import auth from '../../auth/auth.service'
import controller from './battlenet.controller'

var router = new express.Router();

router.post('/characters', controller.grabCharacter);
router.get('/characters/me', auth.appendUser(), controller.grabUsersCharacters);

export default router;
