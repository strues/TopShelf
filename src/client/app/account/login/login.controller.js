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

  LoginCtrl.$inject = ['Auth', 'ngToast', '$window', '$location'];
  /* @ngInject */
  function LoginCtrl(Auth, ngToast, $window, $location) {
    var vm = this;
    /**
     * @ngdoc property
     * @name user
     * @propertyOf app.account.controller:LoginController
     * @description
     * The user data to use as login
     *
     * @returns {User} The user data
     */
    vm.user = {};
    /**
     * @ngdoc property
     * @name error
     * @propertyOf app.account.controller:LoginController
     * @description
     * Error flag
     * @returns {Boolean} True if there is an error
     */
    vm.error = false;
    vm.login = login;

    function login(form) {
      if (form.$valid) {
        Auth.login({
          email: vm.user.email,
          password: vm.user.password
        }).then(function() {
          ngToast.create('Welcome Back!');
          // Logged in, redirect to home
          $location.path('/');
        }).catch(function(err) {
          vm.error = err;
        });
      }
    }
    vm.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  }
}());
