(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   * @function
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function HomeCtrl(Restangular) {
    var vm = this;
    vm.ctrlName = 'HomeCtrl';

     vm.recruits = Restangular.all('recruits').getList().$object;
  }

  angular
    .module('app')
    .controller('HomeCtrl', HomeCtrl);

})();
