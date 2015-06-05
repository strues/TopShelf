(function() {
  'use strict';
  /**
   * @ngdoc controller
   * @name app.account.controller:LoginCtrl
   *
   * @description
   * Controller for the login page
   */
  angular
    .module('app.account')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$auth', 'toastr'];
  /* @ngInject */
  function LoginCtrl($auth, toastr) {
    var vm = this;
    // view model bindings
    /**
     * @ngdoc property
     * @name user
     * @propertyOf app.account.controller:LoginController
     * @description
     * The user data to use as login
     *
     * @returns {User} The user data
     */
    vm.login = function() {
      $auth.login({
          email: vm.email,
          password: vm.password
        })
        .then(function() {
          toastr.success('You\'re now logged in', 'Success');
        })
        .catch(function(response) {
          toastr.error(response, 'Error!');
        });
    };
    vm.authenticate = function(provider, userData) {
      $auth.authenticate(provider, userData)
        .then(function(userData) {
          toastr.success('You\'re now logged in', 'Success');
          console.log(userData);
        })
        .catch(function(response) {
        toastr.error(response.data ? response.data.message : response, 'Shit');
        });
    };
  }
}());
