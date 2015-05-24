(function() {
  'use strict';

  /** @ngdoc controller
   * @name app.account.controller:SignupController
   *
   * @propertyOf app.account
   *
   * @description
   * The controller relating to user registeration
   */
  angular
    .module('app.account')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['$auth'];
  /* @ngInject */
  function SignupController($auth) {
    var vm = this;

    vm.signup = function() {
      $auth.signup({
        displayName: vm.displayName,
        email: vm.email,
        password: vm.password
      }).catch(function(response) {
        if (typeof response.data.message === 'object') {
          angular.forEach(response.data.message, function(message) {
            Materialize.toast(message, 3000);
          });
        } else {
          Materialize.toast(response, 3000);
          console.log('error');
        }
      });
    };
  }
}());
