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
            templateUrl: 'app/admin/admin.tpl.html'
          },
          'content@admin': {
            controller: 'AdminDashboardCtrl',
            controllerAs: 'dash',
            templateUrl: 'app/admin/dashboard.tpl.html'
          }
        }
      })
      .state('admin.applications', {
        url: '/applications',
        views: {
            '': {
            controller: 'AdminCtrl',
            templateUrl: 'app/admin/admin.tpl.html'
          },
          'content@admin': {
            controller: 'ApplicationListCtrl',
            templateUrl: 'app/admin/states/applications/admin.applications.tpl.html'
          }
        }
      })
      .state('admin.applicationView', {
         url: '/applications/view',
           views: {
              'content@admin': {
                controller: 'ApplicationViewCtrl',
                templateUrl: 'app/admin/states/applications/details/application-details.tpl.html'
              }
          }
       })
      .state('admin.applicationViewID', {
        url: '/applications/view/:id',
         views: {
          'content@admin': {
            controller: 'ApplicationViewCtrl',
            templateUrl: 'app/admin/states/applications/details/application-details.tpl.html'
          }
        }
      })
      .state('admin.newsPost', {
        url: '/news/create',
         views: {
          'content@admin': {
            controller: 'NewsCreateCtrl',
            templateUrl: 'app/admin/states/news/create/admin.news-create.tpl.html'
          }
        }
      })
      .state('admin.news', {
        url: '/news/list',
         views: {
          'content@admin': {
            controller: 'NewsListCtrl',
            templateUrl: 'app/admin/states/news/admin.news.tpl.html'
          }
        }
      })
      .state('admin.recruitmentStatus', {
        url: '/recruitment',
        views: {
          'content@admin': {
            controller: 'RecruitmentCtrl',
            templateUrl: 'app/admin/states/recruitment/admin.recruitment.tpl.html'
          }
        }
      })
    .state('admin.roster', {
        url: '/roster',
        views: {
          'content@admin': {
            controller: 'AdminRosterCtrl as adminRoster',
            templateUrl: 'app/admin/states/roster/admin.roster.tpl.html'
          }
        }
      });
    }

    angular
        .module('topshelf.admin')
        .config(config);
})();
