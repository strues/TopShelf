  /**
   * @ngdoc object
   * @name home.controller:SignupCtrl
   * @function
   *
   * @description
   *    username: $scope.user.username,
          email: $scope.user.email,
          password: $scope.user.password,
          firstName: $scope.user.firstName,
          age: $scope.user.age,
          birthday: $scope.user.birthday,
          btag: $scope.user.btag,
          sex: $scope.user.sex,
          location: $scope.user.location

   *
   * @ngInject
   *
   */
 'use strict';

angular.module('app')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window, Notification) {
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
           Notification.success('Your account has been created');
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
  });
