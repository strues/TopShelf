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

  function InfoCtrl($scope, wowApi) {
      //var vm = this;
     wowApi.guild.members({ name: 'Top Shelf', realm: 'Sargeras' }).then(function (data){
            $scope.error = {};
            $scope.guild = data;
      })
  }

})();

