import express from 'express';
import controller from './battlenet.controller';
import auth from '../../auth/auth.service';

var router = new express.Router();

router.post('/', auth.isAuthenticated(), controller.grabCharacter);

export default router;
