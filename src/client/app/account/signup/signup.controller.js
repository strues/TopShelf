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
  SignupController.$inject = ['Auth', '$location', '$window'];
  function SignupController(Auth, $location, $window) {
    var vm = this;
    vm.ctrlName = 'SignupController';
    vm.user = {};
    vm.error = false;
    vm.register = register;
    function register(form) {
      if (form.$valid) {
        Auth.createUser({
          username: vm.user.username,
          email: vm.user.email,
          battletag: vm.user.battletag,
          password: vm.user.password
        }).then(function () {
          Materialize
          .toast('Sucessfully created your account.', 3000);
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
