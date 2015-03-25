(function () {
    'use strict';
    /**
     * @ngdoc object
     * @name user.account-login.controller:LoginCtrl
     *
     * @description
     *
     */
    angular.module('app.account.states').controller('LoginCtrl', LoginCtrl);
    function LoginCtrl($scope, Auth, $location, $window, toastr) {
        var vm = this;
        vm.ctrlName = 'LoginCtrl';

        $scope.user = {};
                $scope.errors = {};
                $scope.login = function (form) {
                    $scope.submitted = true;
                    if (form.$valid) {
                        Auth.login({
                            email: $scope.user.email,
                            password: $scope.user.password
                        }).then(function success() {
                            toastr.success('Successfully logged in', 'Welcome Back!');
                            // Logged in, redirect to home
                            $location.path('/');
                        }).catch(function (err) {
                            $scope.errors.other = err.message;
                        });
                    }
                };
               $scope.loginOauth = function (provider) {
                    $window.location.href = '/auth/' + provider;
                };
    }
}());
