(function () {
    'use strict';
    /**
   * @ngdoc controller
   * @name RosterCtrl
   *
   * @description pulls information relating to the roster from battle.net
   *
   */
    angular
      .module('app.guild')
      .controller('RosterCtrl', RosterCtrl);
    /* @ngInject */
    function RosterCtrl(Armory) {
        /*jshint validthis: true */
        var vm = this;
        vm.filterMaxOnly = function (member) {
            return member.level === 100;
        };
        vm.characters = [];

        Armory.getRoster().success(function (data) {
            vm.members = data.members;
        }).error(function (error) {
            vm.status = 'Unable to retrieve roster: ' + error.message;
        });
    }
}());
