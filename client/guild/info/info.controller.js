(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name topshelf.guild.controller:InfoCtrl
   *
   * @description
   *
   */
  angular
    .module('topshelf.guild')
    .controller('InfoCtrl', InfoCtrl);

 function InfoCtrl($scope, Restangular) {
$scope.members = Restangular.all('roster').getList().$object;
}

})();
