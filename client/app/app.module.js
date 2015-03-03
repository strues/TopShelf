(function () {
    'use strict';

  /* @ngdoc object
   * @name app
   * @requires $urlRouterProvider
   *
   * @description main application file
   *
   */
  /*global angular */
/*jshint unused:false */
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
                  'angularFileUpload',
                  'trNgGrid',
                  'angular-loading-bar',
                  'app.core',
                  'app.account',
                  'app.guild',
                  'app.admin'

    ]);
    /* @ngInject */
    function run ($rootScope, $state, $stateParams, editableOptions) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        editableOptions.theme = 'bs3';
    }
    angular
        .module('app')
        .run(run);
})();
