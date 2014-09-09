(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:LoginCtrl
   * @function
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function LoginCtrl($scope, Auth, $location, $window) {
    
    
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        toastr.success('Successfully logged into your account')
        $location.path('/')
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
}
  angular
    .module('app')
    .controller('LoginCtrl', LoginCtrl);

})();
