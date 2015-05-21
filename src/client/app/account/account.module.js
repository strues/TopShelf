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
          controllerAs: 'account'
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
    });
  }
}());
