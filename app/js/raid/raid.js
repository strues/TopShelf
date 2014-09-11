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
        .state('raid', {
          url: '/raid',
          templateUrl: 'js/raid/raid.tpl.html',
          controller: 'RaidCtrl',
          controllerAs: 'vm'
        });
    }


  angular
    .module('app')
    .config(config);
})();