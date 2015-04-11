(function () {
    'use strict';
    /* @ngdoc object
     * @name app
     * @requires $urlRouterProvider
     *
     * @description Main module for app
     *
     */
    /* @ngInject */
    angular.module('app', [
        'ngStorage',
        'ngResource',
        'ngMessages',
        'ngCookies',
        'ngTouch',
        'ngAnimate',
        'ui.router',
        'angular-carousel',
        'mgcrea.ngStrap',
        'textAngular',
        'xeditable',
        'btford.socket-io',
        'toastr',
        'ngFabForm',
        'ngMdIcons',
        'angularFileUpload',
        'trNgGrid',
        'app.core',
        'app.account',
        'app.guild',
        'app.admin'
    ]);

    /* @ngInject */
    function run($rootScope, $state, $stateParams, $location, Auth, editableOptions) {
        $rootScope.Auth = Auth;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
            if (!next.authenticate) {
                return;
            }
            Auth.isLoggedInAsync(function (loggedIn) {
                if (!loggedIn || next.role && !Auth.hasRole(next.role)) {
                    $location.path('/login');
                }
            });
        });
        editableOptions.theme = 'bs3';
    }
    /* @ngInject */
    angular.module('app').run(run);
}());
