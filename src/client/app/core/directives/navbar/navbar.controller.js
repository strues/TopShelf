(function () {
  'use strict';
  /**
     * @ngdoc controller
     * @name app.core.controller:NavbarCtrl
     *
     * @description Controller for the Navbar
     *
     */
  angular
    .module('app.core')
    .controller('NavbarCtrl', NavbarCtrl);
  /* @ngInject */
  function NavbarCtrl(Auth, $scope, $rootScope, $location) {
    var vm = this;
    vm.isCollapsed = false;
    /**
     * @ngdoc function
     * @name logout
     * @methodOf appApp.controller:AppController
     * @description
     * Logout the current user
     */
    vm.logout = Auth.logout();

    /**
     * @ngdoc function
     * @name isLoggedIn
     * @methodOf appApp.controller:AppController
     * @description
     * See {@link components/auth.service:Auth#isLoggedIn isLoggedIn} of the Auth service
     */
    vm.isLoggedIn = Auth.isLoggedIn();

    /**
     * @ngdoc function
     * @name currentUser
     * @methodOf appApp.controller:AppController
     * @description
     * See {@link components/auth.service:Auth#getCurrentUser getCurrentUser} of the Auth service
     */
    vm.currentUser = Auth.getCurrentUser();

    vm.isAdmin = Auth.isAdmin();
    vm.isActive = function (route) {
      return route === $location.path();
    };
  }
}());
