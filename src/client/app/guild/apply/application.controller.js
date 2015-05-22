(function () {
  'use strict';
  /**
   * @ngdoc controller
   * @name app.guild.states.controller:ApplicationCtrl
   * @description Form to submit an application
   */
  angular
    .module('app.guild')
    .controller('ApplicationCtrl', ApplicationCtrl);
  /* @ngInject */
  function ApplicationCtrl() {
    var vm = this;

    vm.ctrlName = 'ApplicationCtrl';
  }
}());
