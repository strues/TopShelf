import express from 'express';
import controller from './article.controller';
import auth from '../../auth/auth.service';

const router = new express.Router();

// Get all comments
router.get('/comments', controller.getAllComments);

router.get('/', controller.index);
router.get('/:id', controller.show);  // This can be a seoTitle as well
router.post('/', auth.hasPermission('publishContent'), controller.create);
router.put('/:id', auth.hasPermission('publishContent'), controller.update);
router.patch('/:id', auth.hasPermission('publishContent'), controller.update);
router.delete('/:id', auth.hasPermission('publishContent'), controller.destroy);

// Comments
router.post('/:id/comment', controller.addComment); // :id can be a seoTitle as well
router.delete('/:id/comment/:commentId', auth.hasRole('admin'), controller.destroyComment);
router.put('/:id/comment/:commentId', auth.hasRole('admin'), controller.editComment);
router.patch('/:id/comment/:commentId', auth.hasRole('admin'), controller.editComment);

export default router;
