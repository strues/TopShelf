(function () {
  'use strict';

  /** @ngdoc controller
   * @name app.account.controller:LoginCtrl
   *
   * @description
   * Interface to login a registered user
   */
  angular
    .module('app.account')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$auth', '$rootScope', '$location', 'OAUTH'];
  /* @ngInject */
  function LoginController($auth, OAUTH, $rootScope, $location) {
    var vm = this;

    vm.error = false;

    vm.logins = OAUTH.LOGINS;
    //$scope.login = login;

    /**
     * Check if user is authenticated
     *
     * @returns {boolean}
     */
    vm.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    vm.login = function() {
      $auth.login({
        email: vm.email,
        password: vm.password
      })
      .then(function(response) {
          Materialize.toast('Welcome back!', 3000);
          console.log(response);
        })
    };

    /**
     * Authenticate the user via Oauth with the specified provider
     *
     * @param {string} provider - (twitter, facebook, github, google)
     */
    vm.authenticate = function(provider) {
      vm.loggingIn = true;

      /**
       * Successfully authenticated
       * Go to initially intended authenticated path
       *
       * @param response {promise}
       * @private
       */
      function _authSuccess(response) {
        vm.loggingIn = false;

        if ($rootScope.authPath) {
          $location.path($rootScope.authPath);
        }
      }

      /**
       * Error authenticating
       *
       * @param response {promise}
       * @private
       */
      function _authCatch(response) {
        console.log(response.data);
        vm.loggingIn = 'error';
        vm.loginMsg = '';
      }

      $auth.authenticate(provider)
        .then(_authSuccess)
        .catch(_authCatch);
    };

    /**
     * Log the user out of whatever authentication they've signed in with
     */
    vm.logout = function() {
      $auth.logout('/login');
    };

  }
}());
