(function () {
  'use strict';

  /* @ngdoc object
   * @name home
   * @requires $stateProvider
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
          templateUrl: 'js/home/home.tpl.html',
          controller: 'HomeCtrl',
          controllerAs: 'vm'
        });
    }


  angular
    .module('app')
    .config(config);

})();