(function() {
    'use strict';

    /* @ngdoc object
     * @name topshelf.guild.states: config
     * @requires $stateProvider
     *
     * @description holds the states relating to the guild module
     *
     */

    angular
        .module('app.guild.states')
        .config(config);
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
            .state('information', {
                url: '/info',
                templateUrl: 'app/guild/states/info/guild.info.tpl.html',
                controller: 'GuildInfoCtrl as ginfo'
            })
            .state('apply', {
                url: '/apply',
                templateUrl: 'app/guild/states/application/guild.application.tpl.html',
                controller: 'ApplicationCtrl'
            })
            .state('roster', {
                url: '/roster',
                templateUrl: 'app/guild/states/roster/guild.roster.tpl.html',
                controller: 'RosterCtrl'
            })
            .state('streams', {
                url: '/streams',
                templateUrl: 'app/guild/states/streams/guild.streams.tpl.html',
                controller: 'StreamCtrl as vm'
            });
    }
})();
