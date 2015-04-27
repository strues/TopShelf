/**
 * @ngdoc overview
 * @name app.guild
 * @description
 * The `app.guild` module
 *
 * @requires ui.router
 */
(function () {
    'use strict';
    // register the route config on the application
    angular.module('app.guild', [])
    .config(config);
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.state('guild', {
            abstract: true,
            url: '/guild'
        }).state('guild.information', {
            url: '/info',
            views: {
                'main@': {
                    templateUrl: 'app/guild/info/info.tpl.html',
                    controller: 'GuildInfoController'
                }
            }
        }).state('guild.apply', {
            url: '/apply',
            views: {
                'main@': {
                    templateUrl:
                    'app/guild/apply/guild-application.tpl.html',
                    controller: 'ApplicationCtrl',
                    controllerAs: 'vm'
                }
            }
        }).state('guild.apply.app', {
            url: '/application',
            views: {
                'guildapp@guild': {
                    templateUrl: 'app/guild/apply/application.tpl.html',
                    controller: 'ApplicationCtrl',
                    controllerAs: 'vm'
                }
            }
        }).state('guild.apply.info', {
            url: '/info',
            views: {
                'guildapp@guild': {
                    templateUrl:
                    'app/guild/apply/application-info.tpl.html',
                    controller: 'ApplicationCtrl',
                    controllerAs: 'vm'
                }
            }
        }).state('guild.streams', {
            url: '/streams',
            views: {
                'main@': {
                    templateUrl: 'app/guild/streams/streams.tpl.html',
                    controller: 'StreamsCtrl'
                }
            }
        }).state('guild.roster', {
            url: '/roster',
            views: {
                'main@': {
                    templateUrl: 'app/guild/roster/roster.tpl.html',
                    controller: 'RosterCtrl'
                }
            },
            resolve: {
                members: function (Armory) {
                    return Armory.getRoster();
                }
            }
        });
    }
}());
