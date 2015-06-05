(function() {
  'use strict';
  /**
   * @ngdoc service
   * @name app.common.Authorization
   * @description < description placeholder >
   */
  angular
    .module('app.common')
    .factory('Authorization', Authorization);

  Authorization.$inject = ['$auth'];

  function Authorization($auth) {
    var currentUser = $auth.getPayload();
    var service = {
      showPayload: showPayload,
      roleCheck: roleCheck
    };

    return service;

    ////////////////////////////

    /**
     * @ngdoc
     * @name app.account.Authorization#getProfile
     * @methodOf app.account.accountSrv
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * user.testFunction(id);
     * </pre>
     * @param {int} entity id
     */
    function showPayload() {
      return $auth.getPayload();
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
    function roleCheck() {
      return currentUser.role === 'Admin';
    }

  }
})();
