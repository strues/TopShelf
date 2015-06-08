(function() {
  'use strict';

  /* @ngdoc object
   * @name app.account
   * @description
   * Module for the user accounts
   */
  angular
    .module('app.account', [])
    .config(configure);

  configure.$inject = ['$stateProvider'];

  function configure($stateProvider) {
    $stateProvider
      .state('account', {
        url: '/account',
        abstract: true
      })
      .state('account.login', {
        url: '/login',
        views: {
          'main@': {
            templateUrl: 'app/account/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
          }
        }
      })
      .state('account.signup', {
        url: '/signup',
        views: {
          'main@': {
            templateUrl: 'app/account/signup/signup.html',
            controller: 'SignupCtrl',
            controllerAs: 'signup'
          }
        }
      })
      .state('account.logout', {
        url: '/logout?referrer',
        referrer: 'main',
        template: '',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer ||
                          $state.current.referrer ||
                          'guild.home';
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('account.profile', {
        url: '/profile',
        views: {
          'main@': {
            templateUrl: 'app/account/profile/profile.html',
            controller: 'ProfileCtrl',
            controllerAs: 'profile',
            resolve: {
              authenticated: function($q, $location, Auth) {
                var deferred = $q.defer();

                if (!Auth.isLoggedIn) {
                  $location.path('/account/login');
                }
                else {
                  deferred.resolve();
                }

                return deferred.promise;
              }
            }
          }
        }
      })
      .state('account.password', {
        abstract: true,
        url: '/password',
        views: {
          'main@': {
            template: '<ui-view/>'
          }
        }
      })
      .state('account.password.forgot', {
        url: '/forgot',
        views: {
          'main@': {
            templateUrl: 'app/account/password/forgot/forgot.html',
            controller: 'ForgotCtrl as forgot'
          }
        }
      })
      .state('account.password.reset', {
        abstract: true,
        url: '/reset',
        views: {
          'main@': {
            template: '<ui-view/>'
          }
        }
      })
      .state('account.password.reset.invalid', {
        url: '/invalid',
        views: {
          'main@': {
            templateUrl: 'app/account/password/reset/invalid.html'
          }
        }
      })
      .state('account.password.reset.form', {
        url: '/:token',
        views: {
          'main@': {
            templateUrl: 'app/account/password/reset/form.html',
            controller: 'ResetCtrl as reset'
          }
        }
      });
  }
}());
