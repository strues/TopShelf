/**
 * @ngdoc overview
 * @name app.account
 * @description
 * The `app.account` module
 *
 * @requires ui.router
 */
(function () {
  'use strict';
  angular
    .module('app.account')
    .config(config);

 config.$inject = ['$stateProvider'];
  /* @ngInject */
  function config($stateProvider) {
    var profileState = {
      name: 'account',
      url: '/account',
      templateUrl: 'app/account/account.tpl.html',
      controller: 'AccountCtrl',
      controllerAs: 'vm',
      resolve: { /*@ngInject */
        authenticated: function($q, $location, $auth) {
          var deferred = $q.defer();

          if (!$auth.isAuthenticated()) {
            $location.path('/login');
          } else {
            deferred.resolve();
          }

          return deferred.promise;
        }
      }
    }

    var loginState = {
      name: 'login',
      url: '/login',
      templateUrl: 'app/account/login/login.tpl.html',
      controller: 'LoginController',
      controllerAs: 'login'
    }

    var signupState = {
      name: 'signup',
      url: '/signup',
      templateUrl: 'app/account/signup/signup.tpl.html',
      controller: 'SignupController',
      controllerAs: 'signup'
    }

    var logoutState = {
      name: 'logout',
      url: '/logout?referrer',
      referrer: 'home',
      controller: function ($auth) {
        $auth.logout();
      }
    }

    var passwordState = {
      name: 'password',
      abstract: true,
      url: '/password',
      templateUrl: '<ui-view/>'
    }

    var forgotState = {
      name: 'password.forgot',
      url: '/forgot',
      templateUrl: 'app/account/password/forgot/forgot.tpl.html',
      controller: 'ForgotCtrl',
      controllerAs: 'forgot'
    }

    var resetState = {
      name: 'password.reset',
      abstract: true,
      url: '/reset',
      template: '<ui-view/>'
    }

    var invalidState = {
      name: 'password.reset.invalid',
      url: '/invalid',
      templateUrl: 'app/account/password/reset/invalid/reset-invalid.tpl.html'
    }

    var resetFormState = {
      name: 'password.reset.form',
      url: '/:token',
      templateUrl: 'app/account/password/reset/form/reset-form.tpl.html',
      controller: 'ResetFormCtrl',
      controllerAs: 'reset'
    }

   $stateProvider
        .state(profileState)
        .state(loginState)
        .state(signupState)
        .state(logoutState)
        .state(passwordState)
        .state(forgotState)
        .state(resetState)
        .state(invalidState)
        .state(resetFormState);
  }
})();
