(function () {
  'use strict';
  /**
   * @ngdoc Controller
   * @name app.guild.controller:GuildInfoCtrl
   *
   * @description Currently is just "there"
   *
   */
  angular
    .module('app.guild')
    .controller('GuildInfoCtrl', GuildInfoCtrl);
  /* @ngInject */
  function GuildInfoCtrl() {
    var vm = this;
    vm.ctrlName = 'GuildInfoCtrl';
  }
}());
