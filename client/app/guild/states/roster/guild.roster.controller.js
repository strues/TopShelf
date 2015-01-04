(function() {

    angular
        .module('topshelf.guild.states')
        .controller('GuildRosterCtrl', GuildRosterCtrl);

    /* @ngInject */
    function GuildRosterCtrl(RosterService, $scope, sweet, $filter, $localStorage) {

        $scope.grid = {
            data: [],
            localMode: true,
                 columnDefs: [
                    {
                        field: 'character.name',
                        displayName: 'Name'
                    },
                    {
                        field: 'character.spec.name',
                        displayName: 'Specialization',
                        columnFilter: true
                    },
                    {
                        field: 'character.spec.role',
                        displayName: 'Role',
                        columnFilter: true
                    }
                ]
            };
        RosterService.getTopShelf().then(function (response) {
                    $scope.grid.data = response.data.members;
                });
    }

})();
