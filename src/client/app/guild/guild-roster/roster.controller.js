(function() {
    'use strict';
  /**
   * @ngdoc controller
   * @name RosterCtrl
   *
   * @description pulls information relating to the roster from battle.net
   *
   */
    angular
        .module('app.guild.states')
        .controller('RosterCtrl', RosterCtrl);

    /* @ngInject */
    function RosterCtrl($scope, $http) {
        /*jshint validthis: true */
        var vm = this;

        $scope.filterMaxOnly = function(member) {
            return member.level === 100;
        };

        $scope.characters = [];

        $http.get('/api/roster').then(function(data) {
            $scope.data = data.data;

        });
    }
})();
