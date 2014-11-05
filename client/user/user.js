(function () {
  'use strict';

  /* @ngdoc object
   * @name user
   * @requires $stateProvider
   *
   * @description
   *
   */

  angular
    .module('topshelf.user')
    .config(config);

  function config($stateProvider) {
     $stateProvider
     .state('user', {
        abstract: true,
        url:'/user',
        template: '<ui-view />'
     })
      .state('user.login', {
        url: '/login',
        templateUrl: 'user/login/login.tpl.html',
        controller: 'LoginCtrl'
      })
      .state('user.loginWithToken', {
        url: '/login/:sessionToken',
        template: ' ',
        controller: function($stateParams, Auth, $location){
          if ($stateParams.sessionToken) {
            Auth.setSessionToken($stateParams.sessionToken, function(){$location.path('/');});
          }
        }
      })
      .state('user.logout', {
        url: '/logout?referrer',
        referrer: 'main',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer || $state.current.referrer;
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('user.signup', {
        url: '/signup',
        templateUrl: 'user/signup/signup.tpl.html',
        controller: 'SignupCtrl'
      })
      .state('user.settings', {
        url: '/user/settings',
        templateUrl: 'user/settings/settings.tpl.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  }

})();
