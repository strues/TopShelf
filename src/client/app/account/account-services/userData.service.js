(function () {
  'use strict';

  /* jshint latedef: nofunc */
  /** @ngdoc service
   * @name app.account.service:userData
   *
   * @propertyOf app.account
   * @requires
   * $http
   *
   * @description
   * Service for getting user information
   */

  angular
    .module('app.account')
    .factory('userData', userData);

  userData.$inject = ['$http', '$auth'];

  function userData($http, $auth) {
    return {
      /**
       * Get current user's data
       *
       * @returns {promise}
       */
      getUser: function () {
        return $http.get('/api/users/me');
      },
      getProfile: function () {
        return $http.get('/api/users/me');
      },
      isAdmin: function () {
        var payload = $auth.getPayload();
        return payload.role === 'admin';
      },
      /**
       * Update current user's profile data
       *
       * @param profileData {object}
       * @returns {promise}
       */
      updateUser: function (profileData) {
        return $http
          .put('/api/users/me', profileData);
      },
      updateProfile: function (profileData) {
        return $http
          .put('/api/users/me', profileData);
      },
      /**
       * Get all users (admin authorized only)
       *
       * @returns {promise}
       */
      getAllUsers: function () {
        return $http
          .get('/api/users')
          .then(_getRes);
      }
    };
  }
}());
