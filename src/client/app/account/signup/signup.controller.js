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

  SignupCtrl.$inject = ['$auth', 'toastr'];
  /* @ngInject */
  function SignupCtrl($auth, toastr) {
    var vm = this;
    vm.signup = function() {
      $auth.signup({
        displayName: vm.displayName,
        email: vm.email,
        password: vm.password
      }).catch(function(response) {
        if (typeof response.data.message === 'object') {
          angular.forEach(response.data.message, function(message) {
            toastr.error(message[0], 'Error!');
          });
        } else {
          toastr.success(response.data.message, 'Success');
        }
      });
    };
  }
}());
