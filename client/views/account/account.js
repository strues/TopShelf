'use strict';

angular.module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('loginWithToken', {
        url: '/login/:sessionToken',
        template: ' ',
        controller: function($stateParams, Auth, $location){
          if ($stateParams.sessionToken) {
            Auth.setSessionToken($stateParams.sessionToken, function(){$location.path('/');});
          }
        }
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'main',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer || $state.current.referrer;
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'views/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });
