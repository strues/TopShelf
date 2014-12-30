(function () {
    'use strict';

  /* @ngdoc object
   * @name topshelf
   * @requires $urlRouterProvider
   *
   * @description main application file
   *
   */
    angular.module('topshelf.core', []);
    angular.module('topshelf.guild', []);
    angular.module('topshelf.account', []);
    angular.module('topshelf.admin', []);

    angular
        .module('topshelf', [
                  'ngStorage',
                  'ngResource',
                  'ngMessages',
                  'ngCookies',
                  'ngSanitize',
                  'ngAnimate',
                  'btford.socket-io',
                  'ui.router',
                  'ui.bootstrap',
                  'textAngular',
                  'hSweetAlert',
                  'topshelf.core',
                  'topshelf.guild',
                  'topshelf.admin',
                  'topshelf.account'
    ]);

    function config ($urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
        $httpProvider.useApplyAsync(true);

    }

    angular
        .module('topshelf')
        .config(config);
})();
