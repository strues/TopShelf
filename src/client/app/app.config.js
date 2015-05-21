(function() {
  'use strict';

  angular
    .module('app')
    .config(appConfig);

  appConfig.$inject = ['$urlRouterProvider', '$locationProvider'];

  function appConfig($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider
      .html5Mode({
        enabled: true
      })
      .hashPrefix('!');
  }
})();
