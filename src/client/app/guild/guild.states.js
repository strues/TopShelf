(function() {
  'use strict';
  /**
   * @ngdoc object
   * @name core.config:cfg
   *
   * @requires ($urlRouterProvider, $locationProvider, $authProvider)
   * @propertyOf app
   *
   * @description
   * Configuration block for the app
   */

  angular
      .module('app.guild')
      .config(guildStates);

  guildStates.$inject = ['$stateProvider'];

  function guildStates($stateProvider) {
    $stateProvider
    .state('guild', {
      abstract: true
    })
    .state('guild.main', {
      url: '/',
      views: {
        'main@': {
          templateUrl: 'app/guild/main/main.tpl.html',
          controller: 'MainCtrl',
          controllerAs: 'main'
        }
      },
      resolve: { /* @ngInject */
        posts: function(Article) {
          return Article.all();
        }
      }
    }).state('guild.main.article', {
      url: 'article/:id',
      views: {
        'main@': {
          templateUrl: 'app/guild/main/article-detail/article-detail.tpl.html',
          controller: 'ArticleDetailCtrl'
        }
      },
      resolve: { /* @ngInject */
        article: function($stateParams, Article) {
          return Article.get($stateParams.id);
        }
      }
    })
    .state('guild.information', {
      url: '/info',
      views: {
        'main@': {
          templateUrl: 'app/guild/info/info.tpl.html',
          controller: 'GuildInfoCtrl',
          controllerAs: 'ginfo'
        }
      }
    }).state('guild.apply', {
      url: '/apply',
      views: {
        'main@': {
          templateUrl: 'app/guild/apply/application-info.tpl.html',
          controller: 'ApplicationCtrl',
          controllerAs: 'vm'
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
        members: function(Armory) {
          return Armory.getRoster();
        }
      }
    });
  }
}());
