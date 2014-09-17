(function () {
  'use strict';

  /* @ngdoc object
   * @name app
   * @requires $stateProvider
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

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
} // End run block
function AuthInterceptor($rootScope, $q, $cookieStore, $location) {
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
      $httpProvider.interceptors.push('AuthInterceptor');

      $urlRouterProvider.otherwise('/');

      RestangularProvider.setBaseUrl('/api');
      RestangularProvider.setRestangularFields({
      id: '_id.$oid'
      });

      RestangularProvider.setMethodOverriders(['put', 'delete']);
      RestangularProvider.setDefaultRequestParams('jsonp', {callback: 'JSON_CALLBACK'});
 

    RestangularProvider.setRequestInterceptor(function (elem, operation, what) {

      if (operation === 'put') {
        elem._id = undefined;
        return elem;
      }
      return elem;
    })
  }
angular
    .module('app', [
      'templates',
      'ngResource',
      'ngAnimate',
      'ngCookies',
      'ngMessages',
      'ngSanitize',
      'ui.router',
      'ui.bootstrap',
      'formFor',
      'formFor.bootstrapTemplates',
      'restangular',
      'btford.socket-io',
      'ui-notification',
      'ui.grid',
      'ui.grid.edit'
    ]);
  angular
    .module('app')
    .config(config)
    .factory('AuthInterceptor', AuthInterceptor)
    .run(run);
})();
