(function() {
    'use strict';

    /* jshint latedef: nofunc */
    /** @ngdoc controller
     * @name app.core.SidebarCtrl
     * @description
     * Controller
    */
    angular
        .module('app.core')
        .controller('SidebarCtrl', SidebarCtrl);

    SidebarCtrl.$inject = ['$scope', '$location', '$auth', 'userData'];
    /* @ngInject */
    function SidebarCtrl($scope, $location, $auth, userData) {
    // controllerAs ViewModel
    var vm = this;

    /**
     * Log the user out of whatever authentication they've signed in with
     */
    vm.logout = function() {
      vm.adminUser = undefined;
      $auth.logout()
      .then(function() {
        Materialize.toast('See ya later', 3000);
      });
    };

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
      return $auth.isAdmin();
    };

    /**
     * Currently active nav item when '/' index
     *
     * @param {string} path
     * @returns {boolean}
     */
    vm.indexIsActive = function(path) {
      // path should be '/'
      return $location.path() === path;
    };

    /**
     * Currently active nav item
     *
     * @param {string} path
     * @returns {boolean}
     */
    vm.navIsActive = function(path) {
      return $location.path().substr(0, path.length) === path;
    };
    }
})();
