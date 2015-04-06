(function() {
    'use strict';
    angular.module('app.core')
        .config(configureToastr)
        .config(configureDatepicker)
        .config(configureTooltip)
        .config(configure);

    configureToastr.$inject = ['toastrConfig'];
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
    configure.$inject = [
        '$urlRouterProvider', '$locationProvider', '$httpProvider', 'cfpLoadingBarProvider'
    ];
    /* @ngInject */
    function configure($urlRouterProvider, $locationProvider, $httpProvider, cfpLoadingBarProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true).hashPrefix('!');
        $httpProvider.interceptors.push('authInterceptor');
        cfpLoadingBarProvider.includeSpinner = true;
    }
    configureDatepicker.$inject = ['$datepickerProvider'];
    /* @ngInject */
    function configureDatepicker($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'dd/MM/yyyy',
            startWeek: 1
        });
    }
    configureTooltip.$inject = ['$tooltipProvider'];
    /* @ngInject */
    function configureTooltip($tooltipProvider) {
        angular.extend($tooltipProvider.defaults, {
            animation: 'am-flip-x',
            trigger: 'hover'
        });
    }
}());
