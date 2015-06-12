(function()
{
  'use strict';

  /* @ngdoc object
   * @name app.guild
   * @description
   * Module for the guild portions of the application
   */
  angular
    .module('app.guild', ['app.core', 'app.components'])
    .config(configure);

  configure.$inject = ['$stateProvider'];

  function configure($stateProvider) {
    $stateProvider
      .state('guild', {
        abstract: true,
        url: '',
        template:'<ui-view />'
      })
      .state('guild.home', {
        url: '/',
        title: 'Top Shelf - Sargeras US Mythic Raiding',
        templateUrl: 'app/guild/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home',
        resolve: { /* @ngInject */
          articles: function(articleSvc) {
            return articleSvc.all();
          }
        }
      })
      .state('guild.home.article', {
        url: 'news/:id',
        templateUrl: 'app/guild/news/view/news.view.html',
        controller: 'NewsViewCtrl',
        controllerAs: 'vm',
        resolve: { /* @ngInject */
          article: function($stateParams, articleSvc) {
            return articleSvc.get($stateParams.id);
          }
        }
      })
      .state('guild.info', {
        url: '/info',
        title: 'About Us - Top Shelf',
        templateUrl: 'app/guild/info/info.html',
        controller: 'InfoCtrl',
        controllerAs: 'info'
      })
      .state('guild.videos', {
        url: '/videos',
        title: 'Boss Kill Videos - Top Shelf',
        templateUrl: 'app/guild/videos/video-list.html',
        controller: 'VideoCtrl',
        controllerAs: 'vid'
      })
      .state('guild.roster', {
        url: '/roster',
        title: 'Active Raid Roster - Top Shelf',
        templateUrl: 'app/guild/roster/roster.html',
        controller: 'RosterCtrl',
        controllerAs: 'roster',
        resolve: { /*@ngInject*/
          members: function(armorySvc) {
            return armorySvc.getMembers();
          }
        }
      });
  }
}());
