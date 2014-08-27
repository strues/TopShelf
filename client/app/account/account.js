'use strict';

angular.module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/account/signin/signin.tpl.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.tpl.html',
        controller: 'SignupCtrl',
        controllerAs: 'vm'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });