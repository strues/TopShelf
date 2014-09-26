'use strict';

angular.module('guildApp')
  .factory('Inbox', function ($resource) {
  	return $resource('/api/inboxes/:id/:controller', {
      id: '@_id'
    },
    {
      message: {
        method: 'POST',
        params: {
          id: 'me',
          controller:'message'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
