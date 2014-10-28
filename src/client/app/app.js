(function() {
  'use strict';

  angular
    .module('app', ['ngAnimate', 'ngStorage',  'ngMessages', 'ngResource', 'ui.router',
   'ui.bootstrap', 'ngSanitize','ngBattleNet', 'httpi', 'formFor', 'formFor.bootstrapTemplates'
    ])

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, battleNetConfigProvider) {

      $urlRouterProvider.otherwise('/');
      $httpProvider.interceptors.push('authInterceptor');

       battleNetConfigProvider.setApiKey( 'jbdqc3ufm6hfzpymxc3ej52988vvh59b' );
       battleNetConfigProvider.setDefaultRegion( 'us' );

    })
      .factory('authInterceptor', function ($rootScope, $q, $localStorage, $location) {
        return {
          // Add authorization token to headers
          request: function (config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
              config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }
            return config;
          },

          // Intercept 401s and redirect you to login
          responseError: function(response) {
            if(response.status === 401) {
              $location.path('/login');
              // remove any stale tokens
              delete $localStorage.token;
              return $q.reject(response);
            }
            else {
              return $q.reject(response);
            }
          }
        };
      })
.run(function ($rootScope, $state, $window, $location, Auth) {

    $rootScope.$state = $state;

      $rootScope.$on('$stateChangeStart', function (event, next) {
        Auth.isLoggedInAsync(function(loggedIn) {
          if (next.authenticate && !loggedIn) {
            $location.path('/login');
          }
        });
      });
  });

})();
