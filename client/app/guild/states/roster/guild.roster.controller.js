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
        .module('topshelf.guild.states')
        .controller('RosterCtrl', RosterCtrl);

    /* @ngInject */
    function RosterCtrl($scope, Armory) {
        /*jshint validthis: true */
        var vm = this;

        $scope.filterMaxOnly = function(member) {
            return member.level == 100;
        };

        $scope.characters = [];

        Armory.getTopShelfMembers().then(function(data) {
            $scope.data = data.data;

            angular.forEach(data.members, function(character) {
                var member = {
                    name: character.character.name,
                    level: character.character.level,
                    spec: !character.character.spec ? null : character.character.spec.name,
                    role: !character.character.spec ? null : character.character.spec.role,
                    rank: character.rank,
                    wowClass: classes[character.character.class],
                    classLabel: classes[character.character.class].name
                };
                $scope.characters.push(member);
            });

        })
    }
})();
