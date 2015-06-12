(function() {
  'use strict';
  /**
   * @ngdoc service
   * @name app.core.factory:User
   *
   * @description
   *
   */
  angular
    .module('app.core')
    .factory('User', User);

  User.$inject = ['$resource'];
  /* @ngInject */
  function User($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    }, {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      },
      update: {
        method: 'PUT'
      }
    });
  }
}());
