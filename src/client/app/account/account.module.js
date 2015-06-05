(function()
{
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

  function configure($stateProvider)
  {
    $stateProvider
      .state('account',
      {
        url: '/account',
        abstract: true
      })
      .state('account.login',
      {
        url: '/login',
        views:
        {
          'main@':
          {
            templateUrl: 'app/account/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
          }
        }
      })
      .state('account.signup',
      {
        url: '/signup',
        views:
        {
          'main@':
          {
            templateUrl: 'app/account/signup/signup.html',
            controller: 'SignupCtrl',
            controllerAs: 'signup'
          }
        }
      })
      .state('account.profile',
      {
        url: '/profile',
        views:
        {
          'main@':
          {
            templateUrl: 'app/account/profile/profile.html',
            controller: 'ProfileCtrl',
            controllerAs: 'profile',
            resolve:
            {
              authenticated: function($q, $location, $auth)
              {
                var deferred = $q.defer();

                if (!$auth.isAuthenticated())
                {
                  $location.path('/account/login');
                }
                else
                {
                  deferred.resolve();
                }

                return deferred.promise;
              }
            }
          }
        }
      });
  }
}());
