(function () {
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

     var mainState = {
          name: 'main',
          url: '/',
          templateUrl: 'app/guild/main/main.tpl.html',
          controller: 'MainCtrl',
          controllerAs: 'vm',
          resolve: {/* @ngInject */
            posts: function (Article) {
              return Article.all();
            }
          }
        };

      var articleState = {
        name: 'main.article',
        url: '/article/:id',
        templateUrl: 'app/guild/main/article-detail/article-detail.tpl.html',
        controller: 'ArticleDetailCtrl',
          resolve: {/* @ngInject */
            article: function ($stateParams, Article) {
              return Article.get($stateParams.id);
            }
          }
        }

      var guildInfoState = {
        name: 'guild-info',
        url: '/info',
        templateUrl: 'app/guild/info/info.tpl.html',
        controller: 'GuildInfoCtrl',
        controllerAs: 'ginfo'
      }

      var appInfoState = {
        name: 'apply-info',
        url: '/application/info',
        templateUrl: 'app/guild/apply/application-info.tpl.html',
        controller: 'ApplicationCtrl',
        controllerAs: 'vm'
      }

      var rosterState = {
        name: 'roster',
        url: '/roster',
        templateUrl: 'app/guild/roster/roster.tpl.html',
        controller: 'RosterCtrl'
      }

    $stateProvider
        .state(mainState)
        .state(articleState)
        .state(guildInfoState)
        .state(appInfoState)
        .state(rosterState);
  }
})();
