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
  // register the route config on the application
  angular
      .module('app.account', [])
      .config(config);
  config.$inject = ['$stateProvider'];
  /* @ngInject */
  function config($stateProvider) {
    $stateProvider.state('account', {
      abstract: true,
      url: '/account'
    })
    .state('account.profile', {
      url: '',
      views: {
        'main@': {
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
      }
    })
    .state('account.login', {
      url: '/login',
      views: {
        'main@': {
          templateUrl: 'app/account/login/login.tpl.html',
          controller: 'LoginController',
          controllerAs: 'login'
        }
      }
    })
    .state('account.logout', {
      url: '/logout?referrer',
      referrer: 'home',
      controller: function (Auth) {
        Auth.logout();
      }
    })
    .state('account.signup', {
      url: '/signup',
      views: {
        'main@': {
          templateUrl: 'app/account/signup/signup.tpl.html',
          controller: 'SignupController',
          controllerAs: 'signup'
        }
      }
    })
    .state('account.password', {
      abstract: true,
      url: '/password',
      templateUrl: '<ui-view/>'
    })
    .state('account.password.forgot', {
      url: '/forgot',
      templateUrl: 'app/account/password/forgot/forgot.tpl.html',
      controller: 'ForgotCtrl',
      controllerAs: 'forgot'
    })
    .state('account.password.reset', {
      abstract: true,
      url: '/reset',
      template: '<ui-view/>'
    })
    .state('account.password.reset.invalid', {
      url: '/invalid',
      templateUrl: 'app/account/password/reset/invalid/reset-invalid.tpl.html'
    })
    .state('account.password.reset.form', {
      url: '/:token',
      templateUrl: 'app/account/password/reset/form/reset-form.tpl.html',
      controller: 'ResetFormCtrl',
      controllerAs: 'reset'
    });
  }
}());
