(function () {
  'use strict';

  /* @ngdoc object
   * @name core
   * @requires $stateProvider
   *
   * @description
   *
   */


  angular
    .module('topshelf.core')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'core/home/home.tpl.html',
        controller: 'HomeCtrl as home'
      });
  }

})();
