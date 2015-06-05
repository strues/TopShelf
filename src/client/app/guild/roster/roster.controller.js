(function() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.guild.controller:RosterCtrl
   * @description < description placeholder >
   */

  angular
    .module('app.guild')
    .controller('RosterCtrl', RosterCtrl);

  RosterCtrl.$inject = ['armorySvc', '$scope', '$sce'];
  /* @ngInject */
  function RosterCtrl(armorySvc, $scope, $sce) {

    /*jshint validthis: true */
    var vm = this;
    armorySvc.getMembers().success(function(data) {
      vm.members = data.members;

    });

    $scope.trustUrl = function(url) {
        return $sce.trustAsResourceUrl(url);
    }
    vm.rosterlist = {
      maxLevelOnly: true
    };

    $scope.filterMaxOnly = function(member) {
        return member.rank <= 5;
    };
    $scope.filterNoAlt = function(member) {
        return member.rank !== 2;
    };
    $scope.filterNoRAlt = function(member) {
        return member.rank !== 5;
    };
  }
})();
