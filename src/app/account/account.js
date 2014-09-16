'use strict';

angular.module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'account/login/login.tpl.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'account/signup/signup.tpl.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'account/settings/settings.tpl.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });