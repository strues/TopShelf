(function() {

'use strict';

function NavbarCtrl($location, $scope, Auth) {

  var vm = this;

      vm.menu = [{
      'title': 'Home',
      'uiref': 'main',
      'link': '/'
      },
      {
        'title': 'Apply',
        'uiref': 'application',
        'link': '/#/application'
      }];

      vm.isCollapsed = true;
      vm.isLoggedIn = Auth.isLoggedIn;
      vm.isAdmin = Auth.isAdmin;
      vm.getCurrentUser = Auth.getCurrentUser;

      $scope.logout = function() {
        Auth.logout();
        
        $location.path('/login');
      };

      vm.isActive = function(route) {
        return route === $location.path();
      };
       

    }
    
  angular.module('app')
    .controller('NavbarCtrl', NavbarCtrl);
})();