'use strict';

angular.module('app', [
  'ngResource',
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'formFor',
  'restangular',
  'ncy-angular-breadcrumb',
  'ngRetina',
  'angular-growl'
])
.run(function ($rootScope, $location, $state, $stateParams, Auth) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    
    $rootScope.page_title = 'Top Shelf Guild';
    
    $rootScope.$on('$stateChangeSuccess', function () {
    // scroll view to top
    $("html, body").animate({ scrollTop: 0 }, 200);
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
        if (toState.auth && !Auth.isAdmin(toState.auth)) {
          event.preventDefault();
        }
    });
}) // End run block

/*
 * Need to separate this from the main app module
 */
.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
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
  })

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider, $httpProvider, $tooltipProvider, growlProvider) {
      $urlRouterProvider
          .when('/home', '/')
          .otherwise('/');

      RestangularProvider.setBaseUrl('/api');
      RestangularProvider.setRestangularFields({
          id: '_id.$oid',
          selfLink: 'self.link'
      });
      RestangularProvider.setDefaultHttpFields({cache: true});
      RestangularProvider.setMethodOverriders(['put', 'patch']);
      RestangularProvider.setRequestInterceptor(
        function(elem, operation, what) {

          if (operation === 'put') {
            elem._id = undefined;
            return elem;
          }
          return elem;
        });

      $httpProvider.interceptors.push('authInterceptor');
      $locationProvider.html5Mode(true).hashPrefix('!');
      $tooltipProvider.options({
            appendToBody: true
        });
     
      $httpProvider.interceptors.push(growlProvider.serverMessagesInterceptor);
});