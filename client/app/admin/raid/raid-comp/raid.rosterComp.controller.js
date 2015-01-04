(function() {

    angular
        .module('topshelf.guild')
        .controller('GuildRosterCtrl', GuildRosterCtrl);

    /* @ngInject */
    function GuildRosterCtrl(RosterService, sweet, $scope, $filter, $localStorage) {
        /*jshint validthis: true */

        // Pagination
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        $scope.guildName = null;
        $scope.maxLevelOnly = true;

        // Init
        $scope.classes = [];
        $scope.specializations = [];
        for (var index in $scope.classes) { /*jshint -W089 */
            $scope.classes.push($scope.classes[index].name);
            var classSpecs = $scope.classes[index].specialization;
            for (var wowClass in classSpecs) { /*jshint -W089 */
                $scope.specializations.push(wowClass);
            }
        }

        // Members
        $scope.characters = [];

        $scope.getFilteredCharacters = function () {
            var sortedCharacters = $filter('orderBy')($scope.characters, 'name');
            if ($scope.maxLevelOnly) {
                sortedCharacters = $filter('filter')(sortedCharacters, {level: 100});
            }
            return sortedCharacters;
        };

        $scope.getCharacterCount = function () {
            return $scope.getFilteredCharacters().length;
        };

        $scope.$on('fetch-characters', function(event, args) {
            $scope.fetchCharacters();
        });

        $scope.fetchCharacters = function () {
                $scope.lastError = null;
                $scope.characters = [];

                if (RosterService.getRegion().trim() === '' ||
                    RosterService.getRealm().trim() === '' ||
                    RosterService.getGuildName().trim() === '') {
                    sweet.show('warning', 'You have to fill all three fields');
                } else {

                    RosterService.getCharacters()
                        .success(function (data) {
                            // Convert to a character list
                            storeCharacters(data);
                            // Save these new correct values
                            RosterService.saveInStorage();
                            $scope.guildName = RosterService.getGuildName() +
                             '/' + RosterService.getRealm();

                        }).error(function (data, status, headers, config, statusText) {
                            if (status === '404') {
                                sweet.show('warning', 'No guild named ' +
                                    RosterService.getGuildName() + ' was found on ' +
                                    RosterService.getRealm() + '(' +
                                    RosterService.getRegion() + ')');
                            } else {
                                sweet.show('danger', RosterService.asError(status, statusText));
                            }

                        });
                    function storeCharacters(data) {
                        angular.forEach(data.members, function (value) {
                            var member = {
                                name: value.character.name,
                                level: value.character.level,
                                spec: !value.character.spec ? null : value.character.spec.name,
                                role: !value.character.spec ? null : value.character.spec.role,
                                wowClass: classes[value.character.class],
                                classLabel: classes[value.character.class].name
                            };
                            $scope.characters.push(member);
                        });
                    }
                }
            };

            // Roster
        $scope.roster = {};
        $scope.rosterCount = 0;
        $scope.roles = roles;

            // Buffs
        $scope.buffs = buffs;
        $scope.availableBuffs = {};

        $scope.getCount = function (role) {
                if ($scope.roster[role.id]) {
                    return $scope.roster[role.id].length;
                }
                return 0;
            };

        $scope.get = function (role) {
                return $scope.roster[role.id];
            };

        $scope.addToRoster = function (member) {
                // Find the current specialization
            var memberClass = member.wowClass;
            var memberSpec = memberClass.specialization[member.spec];
            if (memberSpec) {
                // Add to the matching role in the roster
                var memberRole = memberSpec.role.id;
                if (!$scope.roster[memberRole]) {
                    $scope.roster[memberRole] = [];
                }
                $scope.roster[memberRole].push(member);
                $scope.rosterCount++;

                // Check for new buffs
                if (memberSpec.buffs) {
                    for (var index in memberSpec.buffs) { /*jshint -W089 */
                        var buff = memberSpec.buffs[index].id;
                        if (!$scope.availableBuffs[buff]) {
                            $scope.availableBuffs[buff] = {
                                buff: buff, count: 0
                            };
                        }
                        $scope.availableBuffs[buff].count++;
                    }
                }
            } else {
                sweet.show('Warning!', 'This character (' + member.name +
                    ') has no valid specialization');
            }
        };

        $scope.removeFromRoster = function (member) {
            var memberClass = member.wowClass;
            var memberSpec = memberClass.specialization[member.spec];
            var memberRole = memberSpec.role.id;
            $scope.roster[memberRole].splice($.inArray(member, $scope.roster[memberRole]), 1);
            $scope.rosterCount--;

            // Check for lost buffs
            if (memberSpec.buffs) {
                for (var index in memberSpec.buffs) { /*jshint -W089 */
                    var buff = memberSpec.buffs[index].id;
                    if ($scope.availableBuffs[buff]) {
                        $scope.availableBuffs[buff].count--;
                    }
                }
            }
        };

        $scope.hasBeenAddedToRoster = function (member) {
            var memberClass = member.wowClass;
            var memberSpec = memberClass.specialization[member.spec];
            if (memberSpec) {
                if (!memberSpec.role) {
                    console.log(memberSpec + ' is invalid');
                }
                var memberRole = memberSpec.role.id;
                if ($scope.roster[memberRole]) {
                    var matches = $filter('filter')($scope.roster[memberRole], {name: member.name});
                    return matches.length > 0;
                }

            }
            return false;
        };

        $scope.isBuffAvailable = function(buff) {
            return $scope.availableBuffs[buff.id] && $scope.availableBuffs[buff.id].count > 0;
        };

        $scope.clearRoster = function() {
            $scope.roster = [];
            $scope.rosterCount = 0;
            $scope.availableBuffs = {};
        };
    }
})();
