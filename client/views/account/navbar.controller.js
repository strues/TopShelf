'use strict';

angular.module('app')
  .controller('NavbarCtrl', function ($scope, Navbar, Auth) {
    $scope.Auth = Auth;

    return Navbar;
  });
