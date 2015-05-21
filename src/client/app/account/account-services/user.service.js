(function () {
  'use strict';
  /**
     * @ngdoc service
     * @name app.account.service:User
     *
     * @description
     * Handles the user data
     */
  angular
    .module('app.account')
    .factory('User', User);

  User.$inject = ['$resource'];
  /* @ngInject */
  function User($resource) {
    return $resource('/api/users/:id/:controller', {id: '@_id'}, {
      changePassword: {
        method: 'PUT',
        params: {controller: 'password'}
      },
      get: {
        method: 'GET',
        params: {id: 'me'}
      },
      update: {method: 'PUT'}
    });
  }
}());
