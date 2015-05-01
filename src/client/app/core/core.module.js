/**
 * @ngdoc overview
 * @name app.core
 * @description
 * The `app.core` module
 *
 * @requires ui.router
 */
(function () {
  'use strict';
  // register the route config on the application
  angular
      .module('app.core', [
        'app.account',
        'app.guild',
        'app.admin'
      ]);
}());
