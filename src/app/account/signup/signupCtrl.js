(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:SignupCtrl
   * @function
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function SignupCtrl(Auth, $location, $window) {
    var $scope = this;
    $scope.ctrlName = 'SignupCtrl';
    
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          username: $scope.user.username,
          email: $scope.user.email,
          password: $scope.user.password,
          firstName: $scope.user.firstName,
          age: $scope.user.age,
          birthday: $scope.user.birthday,
          btag: $scope.user.btag,
          sex: $scope.user.sex,
          location: $scope.user.location

        })
        .then( function() {
         
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
}
  angular
    .module('app')
    .controller('SignupCtrl', SignupCtrl);

})();
