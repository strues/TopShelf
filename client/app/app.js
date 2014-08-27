(function () {

'use strict';
  function config(authInterceptor, $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
  
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');



function run($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  }
}

    angular.module('app', ['ngAnimate', 'ngMessages', 'ngResource', 'ngSanitize', 'ngCookies', 'ui.router']);
})();