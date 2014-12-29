(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name user.directive:loginForm
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="user">
       <file name="index.html">
        <login-form></login-form>
       </file>
     </example>
   *
   */


  function loginForm(Auth, $location, $window, sweet) {
    return {
      templateUrl: 'app/account/account-login/loginForm.tpl.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.user = {};
        scope.errors = {};

      scope.login = function(form) {
        scope.submitted = true;

        if(form.$valid) {
          Auth.login({
            email: scope.user.email,
            password: scope.user.password
          })
          .then( function success() {
            sweet.show('Welcome Back', 'You\'ve successfully logged in', 'success');
            // Logged in, redirect to home
            $location.path('/');
          })
          .catch( function(err) {
            scope.errors.other = err.message;
              sweet.show(err.other);
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
    .module('topshelf.account')
    .directive('loginForm', loginForm);
})();
