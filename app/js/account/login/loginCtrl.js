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


        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        $location.path('/')
       
    };
 
    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
}
  angular
    .module('app')
    .controller('LoginCtrl', LoginCtrl);

})();
