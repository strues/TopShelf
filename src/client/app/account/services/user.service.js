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
      getCharacters: getCharacters
    };
    return service;

    function all() {
      return $http.get(apiBase);
    }
    function getProfile() {
      return $http.get(apiBase + '/me');
    }
    function getCharacters() {

      return $http.get('https://us.api.battle.net/wow/user/characters');

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
  }
})();
