'use strict';

angular.module('guildApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller/:subcontroller/:subcontrollerTwo', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      sendFriendRequest: {
        method: 'PUT',
        params: {
          id:'me',
          controller: 'friends',
          subcontroller: 'requests'
        }
      },
      acceptFriendRequest: { //requestID (userID of request) in body
        method: 'PUT',
        params: {
          id: 'me',
          controller: 'friends',
          subcontroller: 'requests',
          subcontrollerTwo: 'accept'
        }
      },
      rejectFriendRequest: { //requestID (userID of request) in body
        method: 'PUT',
        params: {
          id: 'me',
          controller: 'friends',
          subcontroller: 'requests',
          subcontrollerTwo: 'reject'
        }
      },
      removeFriend: {
        method: 'DELETE',
        params: {
          id: 'me',
          controller: 'friends',
          subcontroller: '@friendID'
        }
      }
    });
  });
