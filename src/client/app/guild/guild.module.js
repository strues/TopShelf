/**
 * @ngdoc overview
 * @name app.guild
 * @description
 * The `app.guild` module contains the locations
 * and definitions for each state relating to guild info
 *
 * @requires ui.router
 */
(function () {
  'use strict';
  // register the route config on the application
  angular.module('app.guild', [])
  .config(config);
  /* @ngInject */
  config.$inject = ['$stateProvider'];
  function config($stateProvider) {
    $stateProvider
        .state('guild', {
          abstract: true
        })
        .state('guild.main', {
          url: '/',
          views: {'main@': {templateUrl: 'app/guild/main/main.tpl.html'}},
          controller: 'MainCtrl',
          controllerAs: 'vm',
          resolve: {/* @ngInject */
            posts: function (Article) {
              return Article.all();
            }
          }
        }).state('guild.main.article', {
          url: 'article/:id',
          views: {
            'main@': {
              templateUrl:
              'app/guild/main/article-detail/article-detail.tpl.html'
            }
          },
          controller: 'ArticleDetailCtrl',
          resolve: {/* @ngInject */
            article: function ($stateParams, Article) {
              return Article.get($stateParams.id);
            }
          }
        })
        .state('guild.information', {
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
