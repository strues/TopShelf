(function () {
    'use strict';
    /* @ngdoc object
     * @name app
     * @requires $urlRouterProvider
     *
     * @description main application file
     *
     */
    angular.module('app.core', []);
    angular.module('app.guild', []);
    angular.module('app.account', []);
    angular.module('app.admin', []);
    angular.module('app', []);
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
        'toastr',
        'ngFabForm',
        'ngMdIcons',
        'angularFileUpload',
        'trNgGrid',
        'angular-loading-bar',
        'app.core',
        'app.account',
        'app.guild',
        'app.admin'
    ]);
    run.$inject = [
        '$rootScope',
        '$location',
        '$state',
        '$stateParams',
        'Auth',
        'editableOptions'
    ];
    /* @ngInject */
    function run($rootScope, $state, $stateParams, $location, Auth, editableOptions) {
        $rootScope.Auth = Auth;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
            Auth.isLoggedInAsync(function(loggedIn) {
                if (next.authenticate && !loggedIn) {
                    $location.path('/login');
                }
            });

            editableOptions.theme = 'bs3';
        });
    }
    // TODO Finish adding strict dependency injection.
    angular.module('app').run(run);
}());
