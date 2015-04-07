(function () {
    'use strict';
    /**
       * @ngdoc controller
       * @name app.account.controller:SignupController
       *
       * @description
       *
       */
    angular
      .module('app.account')
      .controller('SignupController', SignupController);
    /* @ngInject */
    function SignupController(Auth, toastr, $location, $window) {
        var vm = this;
        vm.ctrlName = 'SignupController';
        vm.user = {};
        vm.error = false;
        vm.register = register;
        function register(form) {
            if (form.$valid) {
                Auth.createUser({
                    name: vm.user.name,
                    email: vm.user.email,
                    battletag: vm.user.battletag,
                    password: vm.user.password
                }).then(function () {
                    toastr
                    .success('Sucessfully created your account.', 'Welcome!');
                    // Account created, redirect to home
                    $location.path('/');
                }).catch(function (err) {
                    vm.error = err;
                    angular.forEach(err, function (error, field) {
                        form[field].$setValidity('mongoose', false);
                        vm.error[field] = err;
                    });
                });
            }
        }
    }
}());
