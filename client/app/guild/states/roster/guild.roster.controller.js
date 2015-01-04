(function() {

    angular
        .module('topshelf.guild.states')
        .controller('GuildRosterCtrl', GuildRosterCtrl);
//http://us.battle.net/static-render/us/

    function GuildRosterCtrl(RosterService, sweet, $filter, $localStorage) {
        var roster = this;

        roster.currentPage = 1;
        roster.pageSize = 10;

        roster.classes = [];
        roster.specializations = [];
        for (var index in classes) {
            roster.classes.push(classes[index].name);
            var classSpecs = classes[index].specialization;
            for (var wowClass in classSpecs) {
                roster.specializations.push(wowClass);
            }
        }

        roster.characters = [];
        roster.getFilteredCharacters = function () {
                var sortedCharacters = $filter('orderBy')(roster.characters, 'name');
                if (roster.maxLevelOnly) {
                    sortedCharacters = $filter('filter')(sortedCharacters, {level: 100});
                }
                return sortedCharacters;
            };

        roster.getCharacterCount = function () {
                return roster.getFilteredCharacters().length;
            };

        RosterService.getTopShelf()
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
                            roster.characters.push(member);
                        });
                    }
    }
})();
