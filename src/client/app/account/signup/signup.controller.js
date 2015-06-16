(function() {
  'use strict';

  /** @ngdoc controller
   * @name app.account.controller:SignupCtrl
   *
   * @propertyOf app.account
   *
   * @description
   * The controller relating to user registeration
   */
  angular
    .module('app.account')
    .controller('SignupCtrl', SignupCtrl);

  SignupCtrl.$inject = ['Auth', 'ngToast', '$window', '$location'];
  /* @ngInject */
  function SignupCtrl(Auth, ngToast, $window, $location) {
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
        }).then(function() {
         ngToast.create('Sucessfully created your account.');
          // Account created, redirect to home
          $location.path('/');
        }).catch(function(err) {
          vm.error = err;
          ngToast.create('Uh oh');
        });
      }
    }
  }
}());
