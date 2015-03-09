(function() {
    'use strict';

    /* @ngdoc object
     * @name topshelf.guild.states:states
     * @requires $stateProvider
     *
     * @description holds the states relating to the guild module
     *
     */

    angular
        .module('app.guild.states')
        .config(config);

    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state('information', {
                url: '/info',
                templateUrl: 'app/guild/guild-info/info.tpl.html',
                controller: 'GuildInfoCtrl as ginfo'
            })
            .state('apply', {
                url: '/apply',
                templateUrl: 'app/guild/guild-apply/application.tpl.html',
                controller: 'ApplicationCtrl'
            })
            .state('streams', {
                url: '/streams',
                templateUrl: 'app/guild/guild-streams/streams.tpl.html',
                controller: 'StreamsCtrl'
            })
            .state('roster', {
                url: '/roster',
                templateUrl: 'app/guild/guild-roster/roster.tpl.html',
                controller: 'RosterCtrl'
            });
    }
})();
