(function () {
  'use strict';
  /**
   * @ngdoc overview
   * @name app.core
   * @description
   * The `app.core` module
   *
   * @requires ui.router
   */
  angular
      .module('app.core', [
        'ngStorage',
        'ngResource',
        'ngMessages',
        'ngCookies',
        'vModal',
        'ngAnimate',
        'satellizer',
        'ui.router',
        'ui.materialize',
        'ct.ui.router.extras',
        'angular-carousel',
        'angularFileUpload',
        'ngWig'
      ]);
}());
