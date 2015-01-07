(function() {
    'use strict';

    angular
        .module('topshelf.admin.states')
        .controller('AdminRosterCtrl', AdminRosterCtrl);

    /* @ngInject */
    function AdminRosterCtrl(GameDS, $filter, $scope, sweet, $rootScope, ArmoryService) {
        /*jshint validthis: true */
        var adminRoster = this;
        // Pagination
        adminRoster.currentPage = 1;
        adminRoster.pageSize = 10;

        adminRoster.guildName = null;
        adminRoster.maxLevelOnly = true;

        // Init
        adminRoster.classes = [];
        adminRoster.specializations = [];
        var classes = GameDS.getClasses();
        for (var index in classes) {
            adminRoster.classes.push(classes[index].name);
            var classSpecs = classes[index].specialization;
            for (var wowClass in classSpecs) {
                adminRoster.specializations.push(wowClass);
            }
        } // end fors
        adminRoster.notifyFetchCharacters = function () {
            $rootScope.$broadcast('fetch-characters');
        };
        // Members
        adminRoster.characters = [];

        adminRoster.getFilteredCharacters = function () {
            var sortedCharacters = $filter('orderBy')(adminRoster.characters, 'name');
            if (adminRoster.maxLevelOnly) {
                sortedCharacters = $filter('filter')(sortedCharacters,
                    {level: 100});
            }
            return sortedCharacters;
        };

        adminRoster.getCharacterCount = function () {
            return adminRoster.getFilteredCharacters().length;
        };

        $scope.$on('fetch-characters', function () {
            adminRoster.fetchCharacters();
        });

        adminRoster.fetchCharacters = function () {
        adminRoster.lastError = null;
        adminRoster.characters = [];

            ArmoryService.getTopShelf().success(function (data) {
                    // Convert to a character list
                    storeCharacters(data);
                    // Save these new correct values
                    ArmoryService.saveInStorage();
                    adminRoster.guildName = 'Top Shelf';
                }).error(function (data, status, headers, config, statusText) {
                    if (status === '404') {
                        sweet.show('warning', 'No guild named ' + adminRoster.guildName +
                            ' was found!');
                    } else {
                        sweet.show('danger', ArmoryService.asError(status, statusText));
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
                    adminRoster.characters.push(member);
                });
            }
        }; // fetch
         // Roster
        adminRoster.roster = {};
        adminRoster.rosterCount = 0;
        adminRoster.roles = GameDS.getRoles();

        // Buffs
        adminRoster.buffs = GameDS.getBuffs();
        adminRoster.availableBuffs = {};

        adminRoster.cooldowns = GameDS.getCooldowns();
        adminRoster.availableCDs = {};

        adminRoster.getRosterData = function () {
            var armorData = [
                {"label": "Plate", "value": 0},
                {"label": "Mail", "value": 0},
                {"label": "Leather", "value": 0},
                {"label": "Cloth", "value": 0}
            ];
            var classData = [];
            for (index in classes) {
                classData.push({
                    label: classes[index].name,
                    value: 0,
                    color: classes[index].color
                });
            }

            for (var role in adminRoster.roster) {
                for (index in adminRoster.roster[role]) {
                    var member = adminRoster.roster[role][index];

                    for (var armorIndex in armorData) {
                        if (armorData[armorIndex].label === member.wowClass.armor) {
                            armorData[armorIndex].value++;
                        }
                    }
                    for (var classIndex in classData) {
                        if (classData[classIndex].label === member.wowClass.name) {
                            classData[classIndex].value++;
                        }
                    }
                }
            }
            return {
                armorData: armorData,
                classData: classData
            };
        };

    } // End Ctrl
})();
