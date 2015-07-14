(function() {
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

  LoginCtrl.$inject = ['Auth', 'toastr', '$timeout', '$rootScope', '$window', '$location'];
  /* @ngInject */
  function LoginCtrl(Auth, toastr, $timeout, $rootScope, $window, $location) {
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
    vm.error = false;
    vm.login = login;

    function login(form) {
      if (form.$valid) {
        Auth.login({
          email: vm.user.email,
          password: vm.user.password
        }).then(function() {
          $timeout(function() {
           $rootScope.isLoggedIn = Auth.isLoggedIn();
           $location.path('/');
         });
          toastr.success('You\'re now logged in', 'Welcome Back!');
          // Logged in, redirect to home
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
