(function() {
    'use strict';

    /* jshint latedef: nofunc */
    /** @ngdoc controller
     * @name app.core.ShellCtrl
     * @description
     * Controller
    */
    angular
        .module('app.core')
        .controller('ShellCtrl', ShellCtrl);

    ShellCtrl.$inject = ['$scope', '$location', '$auth', 'userData'];
    /* @ngInject */
    function ShellCtrl($scope, $location, $auth, userData) {
        var vm = this;

      /**
       * If user is authenticated and adminUser is undefined,
       * get the user and set adminUser boolean.
       *
       * Do this on first controller load (init, refresh)
       * and subsequent location changes (ie, catching logout, login, etc).
       *
       * @private
       */
      function _checkUserAdmin() {
        // if user is authenticated and not defined yet, check if they're an admin
        if ($auth.isAuthenticated() && vm.adminUser === undefined) {
          userData.getUser()
                        .then(function(data) {
                          vm.adminUser = data.isAdmin;
                        });
        }
      }

      _checkUserAdmin();
      $scope.$on('$locationChangeSuccess', _checkUserAdmin);

      /**
       * Is the user authenticated?
       * Needs to be a function so it is re-executed
       *
       * @returns {boolean}
       */
      vm.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      vm.isAdmin = function() {
        var payload = $auth.getPayload();
        return payload.role === 'admin';
      };
    }
})();
