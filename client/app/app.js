(function () {
  'use strict';

  /* @ngdoc object
   * @name app
   * @requires $routeProvider
   *
   * @description
   *
   *
   * @ngInject
   *
   */

function run($rootScope, $location, $state, $stateParams, Auth) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    

    $rootScope.$on('$stateChangeSuccess', function () {
    // scroll view to top
    $('html, body').animate({ scrollTop: 0 }, 200);
    });

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });

    $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (toState.Auth && !Auth.isAdmin(toState.Auth)) {
          event.preventDefault();
        }
    });
} // End run block

function AuthInterceptor($q, $cookieStore, $location) {
      return {
            // Add authorization token to headers
            request: function (config) {
              config.headers = config.headers || {};
              if ($cookieStore.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
              }
              return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function(response) {
              if(response.status === 401) {
                $location.path('/login');
                // remove any stale tokens
                $cookieStore.remove('token');
                return $q.reject(response);
              }
              else {
                return $q.reject(response);
              }
            }
          };
        }

  function config($urlRouterProvider, $locationProvider, RestangularProvider, $httpProvider) {

      $urlRouterProvider.otherwise('/');

      RestangularProvider.setBaseUrl('/api');
      RestangularProvider.setRestangularFields({
          id: '_id.$oid',
          selfLink: 'self.link'
      });
      RestangularProvider.setDefaultHttpFields({cache: true});
      RestangularProvider.setMethodOverriders(['put', 'patch']);
      RestangularProvider.setRequestInterceptor(
        function(elem, operation) {

          if (operation === 'put') {
            elem._id = undefined;
            return elem;
          }
          return elem;
        });

      $httpProvider.interceptors.push('AuthInterceptor');
      $locationProvider.html5Mode(true);
  }

  angular
    .module('app', [
      'ngResource',
      'btford.socket-io',
      'ngAnimate',
      'ngCookies',
      'ngSanitize',
      'ui.router',
      
      'formFor',
      'restangular',
      'ngTable'
    ]);

  angular
    .module('app')
    .config(config)
    .factory('AuthInterceptor', AuthInterceptor)
    .run(run);

})();
