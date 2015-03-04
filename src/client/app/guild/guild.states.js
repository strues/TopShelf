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
                templateUrl: 'app/guild/guild-info/info.tpl.html',
                controller: 'GuildInfoCtrl as ginfo'
            })
            .state('apply', {
                url: '/apply',
                templateUrl: 'app/guild/guild-apply/application.tpl.html',
                controller: 'ApplicationCtrl'
            })
            .state('roster', {
                url: '/roster',
                templateUrl: 'app/guild/guild-roster/roster.tpl.html',
                controller: 'RosterCtrl'
            });
    }
})();
