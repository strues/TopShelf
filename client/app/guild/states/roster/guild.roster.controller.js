(function() {

    angular
        .module('topshelf.guild.states')
        .controller('GuildRosterCtrl', GuildRosterCtrl);

    /* @ngInject */
    function GuildRosterCtrl(RosterService, sweet, $filter, $localStorage) {

        var roster = this;

        RosterService.getTopShelf()
            .then(function (result) {
                roster.topshelf = result;
                console.log('roster.topshelf', roster.topshelf);
            });
    }

})();
