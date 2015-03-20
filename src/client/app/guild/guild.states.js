(function () {
    'use strict';
    /* @ngdoc object
     * @name topshelf.guild.states:states
     * @requires $stateProvider
     *
     * @description holds the states relating to the guild module
     *
     */
    angular.module('app.guild.states').config(config);
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
        .state('guild', {
            abstract: true
        })
        .state('guild.information', {
            url: '/guild/info',
            views: {
                'main@': {
                templateUrl: 'app/guild/guild-info/info.tpl.html',
                controller: 'GuildInfoCtrl as ginfo'
                }
            }
        })
        .state('guild.apply', {
            url: '/guild/apply',
            views: {
                'main@': {
                    templateUrl: 'app/guild/guild-apply/guild-application.tpl.html',
                    controller: 'ApplicationCtrl'
                }
            }
        })
        .state('guild.apply.app', {
            url: '/guild/application',
            views: {
                'guildapp@guild': {
                    templateUrl: 'app/guild/guild-apply/application.tpl.html',
                    controller: 'ApplicationCtrl'
                }
            }
        })
        .state('guild.apply.info', {
            url: '/guild/application/info',
            views: {
                'guildapp@guild': {
                    templateUrl: 'app/guild/guild-apply/application-info.tpl.html',
                    controller: 'ApplicationCtrl'
                }
            }
        })
        .state('guild.streams', {
            url: '/guild/streams',
            views: {
                'main@': {
                    templateUrl: 'app/guild/guild-streams/streams.tpl.html',
                    controller: 'StreamsCtrl'
                }
            }
        })
        .state('guild.roster', {
            url: '/guild/roster',
            views: {
                'main@': {
                    templateUrl: 'app/guild/guild-roster/roster.tpl.html',
                    controller: 'RosterCtrl'
                }
            }
        });
    }
}());
