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
    angular.module('topshelf', []);
    angular
        .module('topshelf', [
                  'ngStorage',
                  'ngResource',
                  'ngMessages',
                  'ngCookies',
                  'ngSanitize',
                  'ngAnimate',
                  'ui.router',
                  'ui.bootstrap',
                  'textAngular',
                  'vModal',
                  'toastr',
                  'formFor',
                  'formFor.bootstrapTemplates',
                  'ngReactGrid',
                  'angular-loading-bar',
                  'topshelf.core',
                  'topshelf.account',
                  'topshelf.guild',
                  'topshelf.admin'

    ]);

    function config ($urlRouterProvider, $locationProvider, $httpProvider, toastrConfig) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
        $httpProvider.useApplyAsync(true);
        angular.extend(toastrConfig, {
        allowHtml: false,
        closeButton: false,
        closeHtml: '<button>&times;</button>',
        containerId: 'toast-container',
        extendedTimeOut: 1000,
        iconClasses: {
          error: 'toast-error',
          info: 'toast-info',
          success: 'toast-success',
          warning: 'toast-warning'
        },
        maxOpened: 0,
        messageClass: 'toast-message',
        newestOnTop: true,
        onHidden: null,
        onShown: null,
        positionClass: 'toast-top-right',
        tapToDismiss: true,
        timeOut: 5000,
        titleClass: 'toast-title',
        toastClass: 'toast'
      });
    }

    function run ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    angular
        .module('topshelf')
        .config(config)
        .run(run);
})();
