(function () {
  'use strict';

  /* @ngdoc object
   * @name account
   * @requires $routeProvider
   *
   * @description
   *
   *
   * @ngInject
   *
   */
function config ($stateProvider) {
    $stateProvider
        .state('account', {
          url: '/account',
          templateUrl: 'account/account.tpl.html',
          controller: 'AccountCtrl',
          controllerAs: 'account'
        })
        .state('login', {
          url: '/account/login',
          templateUrl: 'account/login/login.tpl.html',
          controller: 'LoginCtrl'
        })
        .state('signup', {
          url: '/account/signup',
          templateUrl: 'account/signup/signup.tpl.html',
          controller: 'SignupCtrl',
          controllerAs: 'signup'
        })
        .state('settings', {
          url: '/account/settings',
          templateUrl: 'account/settings/settings.tpl.html',
          controller: 'SettingsCtrl',
          controllerAs: 'settings'
        });
    }

  angular
    .module('account', [
      'ui.router',
      'restangular'
    ]);

  angular
    .module('account')
    .config(config);

})();