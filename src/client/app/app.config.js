(function() {
  'use strict';

  angular
    .module('app')
    .config(appConfig);

  appConfig.$inject = ['$urlRouterProvider', '$locationProvider',
  '$httpProvider',
  '$sceProvider'];

  function appConfig($urlRouterProvider, $locationProvider,
      $httpProvider, $sceProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({enabled: true}).hashPrefix('!');
    $sceProvider.enabled(false);

    $httpProvider.interceptors.push('authInterceptor');
  }
})();
