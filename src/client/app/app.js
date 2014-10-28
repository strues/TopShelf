(function() {
  'use strict';

  angular
    .module('app', ['ngAnimate', 'ngStorage',  'ngMessages', 'ngResource', 'ui.router',
        'angular-loading-bar', 'ui.bootstrap','restangular', 'ngSanitize', 'formFor', 'formFor.bootstrapTemplates'
    ])

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, RestangularProvider) {

      RestangularProvider.setBaseUrl('api/');
      $urlRouterProvider.otherwise('/');
      $httpProvider.interceptors.push('authInterceptor');
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
