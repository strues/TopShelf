(function() {

    angular
        .module('topshelf.guild.states')
        .controller('GuildRosterCtrl', GuildRosterCtrl);
//http://us.battle.net/static-render/us/

    function GuildRosterCtrl(ArmoryService, GameDS, sweet, $filter, $localStorage) {
        var guildRoster = this;

        guildRoster.findInStorage = function (storageKey) {
                    if (typeof(Storage) !== 'undefined') {
                        return localStorage.getItem(storageKey);
                    }
                    return null;
                };

        guildRoster.classes = [];
        guildRoster.specializations = [];
        var classes = GameDS.getClasses();
        for (var index in classes) {
            guildRoster.classes.push(classes[index].name);
            var classSpecs = classes[index].specialization;
            for (var wowClass in classSpecs) {
                guildRoster.specializations.push(wowClass);
            }
        }

            // Members
        guildRoster.characters = [];

        guildRoster.getFilteredCharacters = function () {
                var sortedCharacters = $filter('orderBy')(guildRoster.characters, 'name');
                if (guildRoster.maxLevelOnly) {
                    sortedCharacters = $filter('filter')(sortedCharacters, {level: 100});
                }
                return sortedCharacters;
            };

        guildRoster.getCharacterCount = function () {
                return guildRoster.getFilteredCharacters().length;
            };

        ArmoryService.getTopShelf()
            .success(function (data) {
                storeCharacters(data);
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
                            guildRoster.characters.push(member);
                        });
        }
    }
})();
