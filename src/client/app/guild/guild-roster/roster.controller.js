(function () {
    'use strict';
    /**
   * @ngdoc controller
   * @name RosterCtrl
   *
   * @description pulls information relating to the roster from battle.net
   *
   */
    angular.module('app.guild.states').controller('RosterCtrl', RosterCtrl);
    /* @ngInject */
    function RosterCtrl($http) {
        /*jshint validthis: true */
        var vm = this;
        vm.filterMaxOnly = function (member) {
            return member.level === 100;
        };
        vm.characters = [];
        $http.get('/api/roster').then(function (data) {
            vm.data = data.data;
        });
    }
}());
