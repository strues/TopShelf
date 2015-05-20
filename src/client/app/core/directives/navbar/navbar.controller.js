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
    var navbar = this;
    navbar.isCollapsed = false;
    /**
     * @ngdoc function
     * @name logout
     * @methodOf appApp.controller:AppController
     * @description
     * Logout the current user
     */
    navbar.logout = Auth.logout();

    /**
     * @ngdoc function
     * @name isLoggedIn
     * @methodOf appApp.controller:AppController
     * @description
     * See {@link components/auth.service:Auth#isLoggedIn isLoggedIn} of the Auth service
     */
    navbar.isLoggedIn = Auth.isLoggedIn();

    /**
     * @ngdoc function
     * @name currentUser
     * @methodOf appApp.controller:AppController
     * @description
     * See {@link components/auth.service:Auth#getCurrentUser getCurrentUser} of the Auth service
     */
    navbar.currentUser = Auth.getCurrentUser();

    navbar.isAdmin = Auth.isAdmin();
    navbar.isActive = function (route) {
      return route === $location.path();
    };
  }
}());
