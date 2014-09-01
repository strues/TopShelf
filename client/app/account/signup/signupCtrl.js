'use strict';

angular.module('app')
  .controller('SignupCtrl', function($scope, $auth, Permission) {
    $scope.role = Permission.userRoles.user;
    $scope.userRoles = Permission.userRoles;

    $scope.signup = function() {
      $auth.signup({
        displayName: $scope.displayName,
        email: $scope.email,
        password: $scope.password,
        role: $scope.role
      });
    }
  });


