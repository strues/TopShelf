'use strict';

var express = require('express');
var controller = require('./user.controller');
//var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/'/*, auth.hasRole('admin')*/, controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/:id/friends', auth.isAuthenticated(), controller.getFriendIndex);
router.get('/:id/friends/requests', auth.isAuthenticated(), controller.getFriendRequests);
router.delete('/:id/friends/requests/me', auth.isAuthenticated(), controller.removeMyFriendRequest)
router.get('/me', auth.isAuthenticated(), controller.me);
router.delete('/me/friends/:friendID', auth.isAuthenticated(), controller.removeMyFriend);
router.put('/me/friends/:friendID/message', auth.isAuthenticated(), controller.messageFriend);
router.get('/me/friends', auth.isAuthenticated(), controller.getMyFriendIndex);
router.get('/me/friends/requests', auth.isAuthenticated(), controller.getMyFriendRequests);
router.put('/me/friends/requests', auth.isAuthenticated(), controller.putFriendRequest);
router.put('/me/friends/requests/accept', auth.isAuthenticated(), controller.acceptFriendRequest);
router.put('/me/friends/requests/reject', auth.isAuthenticated(), controller.rejectFriendRequest);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
