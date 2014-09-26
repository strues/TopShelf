'use strict';

angular.module('guildApp')
  .factory('Conversation', function ($resource) {
    return $resource('/api/conversations/:id/:controller', {
      id: '@id'
    },
    {
      addMessage: { //message on body
        method: 'POST',
        params: {
          controller:'message'
        }
      },
      muteMessage: { //messageID on body
        method: 'PUT',
        params: {
          controller:'message'
        }
      },
      addBan: {
        method: 'POST',
        params: {
          controller: 'ban'
        }
      },
      addMod: {
        method: 'POST',
        params: {
          controller: 'mod'
        }
      },
      removeBan: {
        method: 'PUT',
        params: {
          controller: 'ban'
        }
      },
      removeMod: {
        method: 'PUT',
        params: {
          controller: 'mod'
        }
      },
      getPublic: {
        method: 'GET',
        params: {
          id: '@id',
          controller: 'public'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: '@id'
        }
      }
    });
  });
