(function () {
    'use strict';

  /**
   * @ngdoc directive
   * @name account.directive:signupForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="user">
       <file name="index.html">
        <signup-form></signup-form>
       </file>
     </example>
   *
   */
  /*jshint unused:false */

    function signupForm (Auth, $location, $window, sweet) {
        return {
          templateUrl: 'app/account/states/signup/account.signupForm.tpl.html',
          restrict: 'EA',
          link: function (scope, element, attrs) {
              scope.user = {};
              scope.errors = {};

              scope.register = function(form) {
                  scope.submitted = true;

                  if (form.$valid) {
                      Auth.createUser({
                        username: scope.user.username,
                        email: scope.user.email,
                        password: scope.user.password
              })
              .then(function() {
                  sweet.show('Success!', 'You\'re account has been created', 'success');
                // Account created, redirect to home
                  $location.path('/');
              })
              .catch(function(err) {
                  err = err.data;
                  scope.errors = {};

                // Update validity of form fields that match the mongoose errors
                  angular.forEach(err.errors, function(error, field) {
                      form[field].$setValidity('mongoose', false);
                      scope.errors[field] = error.message;
                  });
              });
                  }
              };

              scope.loginOauth = function(provider) {
                 $window.location.href = '/auth/' + provider;
             };
          }
        };
    }

    angular
        .module('topshelf.account.directives')
        .directive('signupForm', signupForm);
})();
