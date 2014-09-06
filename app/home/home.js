(function () {
  'use strict';

  /* @ngdoc object
   * @name home
   * @requires $routeProvider
   *
   * @description
   *
   *
   * @ngInject
   *
   */
function config ($stateProvider) {
    $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'home/home.tpl.html',
          controller: 'HomeCtrl',
          controllerAs: 'home'
        });
    }


  angular
    .module('app')
    .config(config);

})();