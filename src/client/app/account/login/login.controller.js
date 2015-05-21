(function () {
  'use strict';
  /**
     * @ngdoc controller
     * @name app.account.controller:LoginController
     *
     * @description
     * Controller for the login page
     */
  angular
    .module('app.account')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['Auth', '$state'];
  /* @ngInject */
  function LoginController(Auth, $state) {
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
        }).then(function () {
          Materialize.toast('Successfully logged in', 4000);
          // Logged in, redirect to home
          $state.go('guild.main');
        }).catch(function (err) {
          vm.error = err;
          Materialize.toast(err, 3000);
        });
      }
    }
  }
}());
