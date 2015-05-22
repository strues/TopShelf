(function() {
  'use strict';

  /* @ngdoc overview
   * @name app
   *
   * @description
   * Main module for the application
   *
   * @requires
   * ngResource, ngAnimate, ngMessages, ui.router, ui.bootstrap, satellizer,
   * app.core, app.account
   */

  /* @ngInject */
  angular.module('app', [
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
      'ngWig',
      'app.account',
      'app.core',
      'app.guild',
      'app.admin'
  ]);
}());
