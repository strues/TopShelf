(function() {
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
    angular
        .module('app.account.directives')
        .directive('loginForm', loginForm);

    function loginForm(Auth, $location, $window, toastr) {
        return {
            templateUrl: 'app/account/states/login/account.loginForm.tpl.html',
            restrict: 'EA',
            link: function(scope, element, attrs) {
                scope.user = {};
                scope.errors = {};

                scope.login = function(form) {
                    scope.submitted = true;

                    if (form.$valid) {
                        Auth.login({
                            email: scope.user.email,
                            password: scope.user.password
                        })
                            .then(function success() {
                                toastr.success('Successfully logged in', 'Welcome Back!');
                                // Logged in, redirect to home
                                $location.path('/');
                            })
                            .catch(function(err) {
                                scope.errors.other = err.message;

                            });
                    }
                };

                scope.loginOauth = function(provider) {
                    $window.location.href = '/auth/' + provider;
                };
            }
        };
    }

})();
