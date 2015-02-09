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
                  'ngSanitize',
                  'ngAnimate',
                  'ui.router',
                  'angular-carousel',
                  'mgcrea.ngStrap',
                  'textAngular',
                  'toastr',
                  'ngFabForm',
                  'ngReactGrid',
                  'angular-loading-bar',
                  'app.core',
                  'app.account',
                  'app.guild',
                  'app.admin'

    ]);
    /* @ngInject */
    function run ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
    angular
        .module('app')
        .run(run);
})();
