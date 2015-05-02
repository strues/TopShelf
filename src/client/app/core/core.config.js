(function () {
  'use strict';
  angular
      .module('app.core')
      .config(configureToastr)
      .config(configureDatepicker)
      .config(configure);

  /* @ngInject */
  function configureToastr(toastrConfig) {
    angular.extend(toastrConfig, {
      allowHtml: true,
      closeButton: true,
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
      positionClass: 'toast-bottom-full-width',
      tapToDismiss: true,
      timeOut: 5000,
      titleClass: 'toast-title',
      toastClass: 'toast'
    });
  }
  /* @ngInject */
  function configure($urlRouterProvider, $locationProvider, $httpProvider, $modalProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true).hashPrefix('!');
    $httpProvider.interceptors.push('authInterceptor');
    angular.extend($modalProvider.defaults, {
      html: true
    });
  }
  /* @ngInject */
  function configureDatepicker($datepickerProvider) {
    angular.extend($datepickerProvider.defaults, {
      dateFormat: 'dd/MM/yyyy',
      startWeek: 1
    });
  }

}());
