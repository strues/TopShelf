(function() {
    'use strict';

    angular
        .module('app')
        .controller('NavbarCtrl', NavbarCtrl);

function NavbarCtrl ($rootScope, $scope, $http, $state, $location, Auth) {
        /*jshint validthis: true */
       // var vm = this;
    $scope.Auth = Auth;

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
})();
