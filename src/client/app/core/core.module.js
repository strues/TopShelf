/* global Materialize:false*/
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
        'app.account',
        'app.guild',
        'app.admin'
      ]).constant('Materialize', Materialize);
}());
