(function () {
  'use strict';

  /* @ngdoc object
   * @name user
   * @requires $stateProvider
   *
   * @description
   *
   */


  function config($stateProvider) {
     $stateProvider
     .state('user', {
        abstract: true,
        url:'/user',
        template: '<ui-view />'
     })
      .state('user.login', {
        url: '/login',
        templateUrl: 'app/user/login/login.tpl.html',
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
        referrer: 'home',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer || $state.current.referrer;
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('user.signup', {
        url: '/signup',
        templateUrl: 'app/user/signup/signup.tpl.html',
        controller: 'SignupCtrl'
      })
      .state('user.settings', {
        url: '/user/settings',
        templateUrl: 'app/user/settings/settings.tpl.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  }

  angular
    .module('topshelf.user')
    .config(config);
})();
