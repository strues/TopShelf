import express from 'express';
import controller from './upload.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.all);
router.get('/:id', controller.show);

router.post('/', controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
