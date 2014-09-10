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
          templateUrl: 'js/account/account.tpl.html',
          controller: 'AccountCtrl',
          controllerAs: 'account'
        })
        .state('login', {
          url: '/account/login',
          templateUrl: 'js/account/login/login.tpl.html',
          controller: 'LoginCtrl'
        })
        .state('signup', {
          url: '/account/signup',
          templateUrl: 'js/account/signup/signup.tpl.html',
          controller: 'SignupCtrl',
          controllerAs: 'signup'
        })
        .state('settings', {
          url: '/account/settings',
          templateUrl: 'js/account/settings/settings.tpl.html',
          controller: 'SettingsCtrl',
          controllerAs: 'settings'
        });
    }


  angular
    .module('app')
    .config(config);

})();