(function() {

    'use strict';

    angular
        .module('app.core')
        .config(configure)
        .run(authRun);

    configure
        .$inject = ['$urlRouterProvider', '$httpProvider', '$locationProvider', 'toastrConfig'];
    /* @ngInject */
    function configure($urlRouterProvider, $httpProvider, $locationProvider, toastrConfig) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true).hashPrefix('!');
        $httpProvider.interceptors.push('authInterceptor');
        angular.extend(toastrConfig, {
            autoDismiss: true,
            closeButton: true,
            positionClass: 'toast-top-right',
            tapToDismiss: true,
            target: 'body',
            timeOut: 5000,
            titleClass: 'toast-title',
            toastClass: 'toast'
        });
    }

    authRun.$inject = ['$rootScope', '$location', 'Auth'];

    function authRun($rootScope, $location, Auth) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            Auth.isLoggedIn(function(loggedIn) {
                if (next.authenticate && !loggedIn) {
                    $location.path('/account/login');
                }
                if (next.authorize) {
                    if (next.authorize === 'admin' && !Auth.isAdmin()) {
                        $location.path('/');
                    }
                }
            });
        });
    }

}());
