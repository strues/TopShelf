(function() {
  'use strict';
  /**
   * @ngdoc service
   * @name app.account.accountSrv
   * @description < description placeholder >
   */
  angular
    .module('app.account')
    .factory('accountSrv', accountSrv);

  accountSrv.$inject = ['$http'];

  function accountSrv($http) {

    var service = {
      getProfile: getProfile,
      updateProfile: updateProfile
    };

    return service;

    ////////////////////////////

    /**
     * @ngdoc
     * @name app.account.userSrv#getProfile
     * @methodOf app.account.accountSrv
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * user.testFunction(id);
     * </pre>
     * @param {int} entity id
     */
    function getProfile() {
      return $http.get('/api/users/me');
    }

    /**
     * @ngdoc
     * @name app.account.userSrv#updateProfile
     * @methodOf app.account.accountSrv
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * user.testFunction(id);
     * </pre>
     * @param {int} entity id
     */
    function updateProfile(profileData) {
      return $http.put('/api/users/me', profileData);
    }
  }

})();
