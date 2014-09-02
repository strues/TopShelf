(function() {

'use strict';

  function config ($stateProvider) {
    $stateProvider
          .state('login', {
              url: '/login',
              templateUrl: 'app/account/login/login.tpl.html',
              controller: 'LoginCtrl'
          })
          .state('signup', {
              url: '/signup',
              templateUrl: 'app/account/signup/signup.tpl.html',
              controller: 'SignupCtrl',
              controllerAs: 'vm'
          })
          .state('logout', {
              url: '/logout',
              template: null,
              controller: 'LogoutCtrl'
          })
          .state('profile', {
              url: '/profile',
              templateUrl: 'app/account/profile.tpl.html',
              controller: 'ProfileCtrl'
          })
          .state('settings', {
              url: '/settings',
              templateUrl: 'app/account/settings/settings.html',
              controller: 'SettingsCtrl',
              authenticate: true
          });
  }

angular
  .module('app')
  .config(config);
})();