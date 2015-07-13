import express from 'express';
import controller from './user.controller';
import auth from '../../auth/auth.service';

const router = express.Router();

router.get('/list', controller.list);
router.get('/', auth.hasRole('admin'), controller.index);
router.post('/', controller.create);

router.delete('/:id', auth.hasRole('admin'), controller.destroy);

router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', controller.show);

router.put('/:id', auth.hasRole('admin'), controller.update);
router.put('/me', auth.isAuthenticated(), controller.update);
router.get('/me', auth.isAuthenticated(), controller.me);

export default router;
