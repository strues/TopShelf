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
    /* @ngInject */
    angular.module('topshelf', [
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
                  'ngFabForm',
                  'ngReactGrid',
                  'angular-loading-bar',
                  'topshelf.core',
                  'topshelf.account',
                  'topshelf.guild',
                  'topshelf.admin'

    ]);
    /* @ngInject */
    function run ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
    angular
        .module('topshelf')
        .run(run);
})();
