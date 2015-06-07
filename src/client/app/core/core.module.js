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
        'ngAnimate',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ui.router',
        'ui.bootstrap',
        'satellizer',
        'textAngular',
        'toastr',
        'angularFileUpload'
      ]);
}());
