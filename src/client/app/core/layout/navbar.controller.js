(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = ['$auth', 'toastr', '$location', 'userSrv', 'Authorization'];
  /* @ngInject */
  function NavbarCtrl($auth, toastr, $location, userSrv, Authorization) {
    // controllerAs ViewModel
    var vm = this;
    vm.isCollapsed = true;

    vm.isAdmin = Authorization.roleCheck;

    vm.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    vm.logout = function() {
      $auth.logout();
      toastr.info('See you around', 'Logged Out!');
      $location.path('/account/login');
    };
  }

})();
