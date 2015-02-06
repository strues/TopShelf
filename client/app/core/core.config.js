(function() {
    'use strict';

    angular.module('topshelf.core')
        .config(configureToastr)
        .config(configure);

    function config() {
        return {
            //Configure the exceptionHandler decorator
            appErrorPrefix: '[Top Shelf Error] ',
            appTitle: 'Top Shelf Guild',
            version: '1.0.0'
        };
    }

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
            positionClass: 'toast-top-right',
            tapToDismiss: true,
            timeOut: 5000,
            titleClass: 'toast-title',
            toastClass: 'toast'
        });
    }

    /* @ngInject */
    function configure ($urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    }
})();
