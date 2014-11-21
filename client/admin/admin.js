(function () {
  'use strict';

  /* @ngdoc object
   * @name admin
   * @requires $stateProvider
   *
   * @description
   *
   */


  function config($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        authenticate: true,
        views: {
          '': {
            controller: 'AdminCtrl',
            templateUrl: 'admin/admin.tpl.html'
          },
          'content@admin': {
            controller: 'AdminDashboardCtrl',
            templateUrl: 'admin/dashboard.tpl.html'
          }
        }
      })
      .state('admin.applications', {
        url: '/applications',
        views: {
            '': {
            controller: 'AdminCtrl',
            templateUrl: 'admin/admin.tpl.html'
          },
          'content@admin': {
            controller: 'ApplicationListCtrl',
            templateUrl: 'admin/guildApps/applicationList.tpl.html'
          }
        }
      })
      .state('admin.applicationView', {
         url: '/applications/view',
           views: {
              'content@admin': {
                controller: 'ApplicationViewCtrl',
                templateUrl: 'admin/guildApps/applicationView.tpl.html',
              }
          }
       })
      .state('admin.applicationViewID', {
        url: '/applications/view/:id',
         views: {
          'content@admin': {
            controller: 'ApplicationViewCtrl',
            templateUrl: 'admin/guildApps/applicationView.tpl.html',
          }
        }
      })
      .state('admin.newsPost', {
        url: '/news/new-post',
         views: {
          'content@admin': {
            controller: 'NewsCtrl',
            templateUrl: 'admin/news/newsPost.tpl.html',
          }
        }
      })
      .state('admin.news', {
        url: '/news/list',
         views: {
          'content@admin': {
            controller: 'NewsListCtrl',
            templateUrl: 'admin/news/newsList.tpl.html',
          }
        }
      })
      .state('admin.recruitmentStatus', {
        url: '/recruitment',
        views: {
          'content@admin': {
            controller: 'RecruitmentCtrl',
            templateUrl: 'admin/recruitment/recruitment.tpl.html'
          }
        }
      })
      .state('admin.roster', {
        url: '/roster',
        views: {
          'content@admin': {
            controller: 'RosterCtrl',
            templateUrl: 'admin/roster/roster.tpl.html'
          }
        }
      })
      .state('admin.addRaid', {
        url: '/raids',
         views: {
          'content@admin': {
            controller: 'AddRaidCtrl',
            templateUrl: 'admin/raids/addRaid.tpl.html',
          }
        }
      });
}

  angular
    .module('topshelf.admin')
    .config(config);
})();
