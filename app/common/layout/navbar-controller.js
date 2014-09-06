(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name app.controller:NavbarCtrl
   * @function
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function NavbarCtrl($scope, $location, Auth) {
 $scope.menu = [
    {
      'title': 'Home',
      'link': '/',
      },
      {
        'title': 'Apply',
        'link': '/application'
      },
      {
          'title': 'Guild Info',
          'link': '/about'
      }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
}

  angular
    .module('app')
    .controller('NavbarCtrl', NavbarCtrl);

})();
