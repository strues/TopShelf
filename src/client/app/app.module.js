(function() {
  'use strict';

  /* @ngdoc overview
   * @name app
   *
   * @description
   * Main module for the application
   *
   * @requires
   * app.core, app.common, app.account, app.guild, app.admin
   */

  /* @ngInject */
  angular.module('app', [
      'app.core',
      'app.common',
      // application modules
      'app.account',
      'app.guild',
      'app.admin'
  ]);
}());
