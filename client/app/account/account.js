(function () {
  'use strict';

  /* @ngdoc object
   * @name topshelf.account
   * @requires $stateProvider
   *
   * @description
   *
   */


  function config($stateProvider) {
     $stateProvider
     .state('account', {
        abstract: true,
        url:'/account',
        template: '<ui-view />'
     })
      .state('account.login', {
        url: '/login',
        templateUrl: 'app/account/account-login/login.tpl.html',
        controller: 'LoginCtrl'
      })
      .state('account.loginWithToken', {
        url: '/login/:sessionToken',
        template: ' ',
        controller: function($stateParams, Auth, $location){
          if ($stateParams.sessionToken) {
            Auth.setSessionToken($stateParams.sessionToken, function(){$location.path('/');});
          }
        }
      })
      .state('account.logout', {
        url: '/logout?referrer',
        referrer: 'home',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer || $state.current.referrer;
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('account.signup', {
        url: '/signup',
        templateUrl: 'app/account/account-signup/signup.tpl.html',
        controller: 'SignupCtrl'
      })
      .state('account.settings', {
        url: '/user/settings',
        templateUrl: 'app/account/account-settings/settings.tpl.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  }

  angular
    .module('topshelf.account')
    .config(config);
})();
