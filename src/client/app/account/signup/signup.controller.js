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

  SignupCtrl.$inject = ['Auth', 'toastr', '$window', '$location'];
  /* @ngInject */
  function SignupCtrl(Auth, toastr, $window, $location) {
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
          toastr
            .success('Sucessfully created your account.', 'Welcome!');
          // Account created, redirect to home
          $location.path('/');
        }).catch(function(err) {
          vm.error = err;
          toastr.error('Uh oh');
        });
      }
    }
  }
}());
