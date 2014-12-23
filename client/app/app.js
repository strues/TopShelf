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
angular.module('topshelf.user', []);
angular.module('topshelf.admin', []);

  angular
    .module('topshelf', [
      'ngStorage',
      'ngResource',
      'ngSanitize',
      'ngAnimate',
      'btford.socket-io',
      'ui.router',
      'ui.bootstrap',
      'ui.grid',
      'ui.grid.edit',
      'ui.grid.selection',
      'textAngular',
      'formly',
      'toastr',
      'topshelf.core',
      'topshelf.guild',
      'topshelf.admin',
      'topshelf.user'
    ]);

  function config($urlRouterProvider, $locationProvider, $httpProvider, toastrConfig) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.useApplyAsync(true);
    angular.extend(toastrConfig, {
      allowHtml: true,
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
      messageClass: 'toast-message',
      positionClass: 'toast-bottom-right',
      tapToDismiss: true,
      timeOut: 5000,
      titleClass: 'toast-title',
      toastClass: 'toast'
    });
  }

  angular
    .module('topshelf')
    .config(config)
    .run( ['appStart', function ( appStart ) {
      appStart.start();
    }]);
})();
