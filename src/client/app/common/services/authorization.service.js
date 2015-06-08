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

  Authorization.$inject = ['Auth'];

  function Authorization(Auth) {
    var currentUser = Auth.getCurrentUser();
    var service = {

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
