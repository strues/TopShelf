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
            templateUrl: 'app/account/states/login/account.login.tpl.html',
            controller: 'LoginCtrl'
      })
      .state('account.loginWithToken', {
            url: '/login/:sessionToken',
            template: ' ',
            controller: function($stateParams, Auth, $location) {
                if ($stateParams.sessionToken) {
                    Auth.setSessionToken($stateParams.sessionToken, function() {
                      $location.path('/');});
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
            templateUrl: 'app/account/states/signup/account.signup.tpl.html',
            controller: 'SignupCtrl'
      })
      .state('account.profile', {
            url: '/profile',
            templateUrl: 'app/account/states/profile/account.profile.tpl.html',
            controller: 'ProfileCtrl'
      })
      .state('account.profile-edit', {
            url: '/profile/edit',
            templateUrl: 'app/account/states/profile/edit/account.profile-edit.tpl.html',
            controller: 'ProfileEditCtrl',
            controllerAs: 'vm',
            authenticate: true
      })
      .state('account.settings', {
            url: '/user/settings',
            templateUrl: 'app/account/states/settings/account.settings.tpl.html',
            controller: 'SettingsCtrl'
      });
    }

    angular
        .module('topshelf.account.states')
        .config(config);
})();
