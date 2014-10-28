(function() {
  'use strict';

  angular
    .module('app')
    .config(function($stateProvider) {
      $stateProvider
        .state('profile', {
          url: '/account/user/:id',
          templateUrl: 'app/account/profile/profile.tpl.html',
          controller: 'ProfileCtrl'
        })

      .state('login', {
          url: '/account/login',
          templateUrl: 'app/account/login/login.tpl.html',
          controller: 'LoginCtrl'
        })
        .state('loginWithToken', {
          url: '/login/:sessionToken',
          template: ' ',
          controller: function($stateParams, Auth, $location) {
            if ($stateParams.sessionToken) {
              Auth.setSessionToken($stateParams.sessionToken, function() {
                $location.path('/');
              });
            }
          }
        })
 .state('logout', {
        url: '/logout?referrer',
        referrer: 'home',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer || $state.current.referrer;
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('register', {
          url: '/account/register',
          templateUrl: 'app/account/register/register.tpl.html',
          controller: 'RegisterCtrl'
        })
        .state('settings', {
          url: '/settings',
          templateUrl: 'app/account/settings/settings.tpl.html',
          controller: 'SettingsCtrl',
          authenticate: true
        });
    });
})();
