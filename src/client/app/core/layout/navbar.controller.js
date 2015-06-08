(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = ['Auth', 'toastr', '$location', 'User'];
  /* @ngInject */
  function NavbarCtrl(Auth, toastr, $location, User) {
    // controllerAs ViewModel
    var vm = this;
    vm.isCollapsed = true;

    vm.isAdmin = Auth.isAdmin;
    vm.currentUser = Auth.getCurrentUser;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAuthenticated = function() {
      return Auth.isLoggedIn();
    };
    vm.logout = function() {
      Auth.logout();
      toastr.info('See you around', 'Logged Out!');
      $location.path('/account/login');
    };

    vm.isActive = function(route) {
      if (route !== '/') {
        return -1 !== $location.path().indexOf(route);
      }
      else {
        return route === $location.path();
      }
    };
  }

})();
