(function() {
  'use strict';

  angular
    .module('app.account')
    .service('userSrv', userSrv);

  userSrv.$inject = ['$http'];

  function userSrv($http) {
    var apiBase = '/api/users';

    var service = {
      all: all,
      getProfile: getProfile,
      create: create,
      updateProfile: updateProfile,
      destroy: destroy,
      forgotPassword: forgotPassword,
      resetPassword: resetPassword
    };
    return service;

    function all() {
      return $http.get(apiBase);
    }
    function getProfile() {
      return $http.get(apiBase + '/me');
    }
    function create(userData) {
      return $http.post(apiBase, userData);
    }
    function updateProfile(profileData) {
      return $http.put(apiBase + '/me', profileData);
    }
    function destroy(id) {
      return $http.delete(apiBase + '/' + id);
    }
    function forgotPassword(emailData) {
      return $http.post('/auth/forgot' , emailData);
    }
    function resetPassword(token, passwordData) {
      return $http.post('/reset' + '/' + token, passwordData);
    }
  }
})();
