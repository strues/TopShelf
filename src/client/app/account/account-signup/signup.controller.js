(function () {
    'use strict';
    /**
     * @ngdoc object
     * @name account.account-signup.controller:SignupCtrl
     *
     * @description
     *
     */
    angular
        .module('app.account.states')
        .controller('SignupCtrl', SignupCtrl);

    function SignupCtrl($scope, Auth, toastr, $location, $window) {
        var vm = this;
        vm.ctrlName = 'SignupCtrl';

        $scope.user = {};
        $scope.errors = {};
        $scope.register = function (form) {
                    $scope.submitted = true;
                    if (form.$valid) {
                        Auth.createUser({
                            name: $scope.user.name,
                            email: $scope.user.email,
                            battletag: $scope.user.battletag,
                            password: $scope.user.password
                        }).then(function () {
                            toastr.success('Sucessfully signed up', 'Welcome!');
                            // Account created, redirect to home
                            $location.path('/');
                        }).catch(function (err) {
                            err = err.data;
                            $scope.errors = {};
                            // Update validity of form fields that match the mongoose errors
                            angular.forEach(err.errors, function (error, field) {
                                form[field].$setValidity('mongoose', false);
                                $scope.errors[field] = error.message;
                            });
                        });
                    }
                };
        $scope.loginOauth = function (provider) {
                    $window.location.href = '/auth/' + provider;
                };
    }

}());
