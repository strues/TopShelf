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
            controllerAs: 'vm',
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
            templateUrl: 'app/admin/applications/applicationList.tpl.html'
          }
        }
      })
      .state('admin.applicationView', {
         url: '/applications/view',
           views: {
              'content@admin': {
                controller: 'ApplicationViewCtrl',
                templateUrl: 'app/admin/applications/applicationView.tpl.html'
              }
          }
       })
      .state('admin.applicationViewID', {
        url: '/applications/view/:id',
         views: {
          'content@admin': {
            controller: 'ApplicationViewCtrl',
            templateUrl: 'app/admin/applications/applicationView.tpl.html'
          }
        }
      })
      .state('admin.newsPost', {
        url: '/news/create',
         views: {
          'content@admin': {
            controller: 'NewsCreateCtrl',
            templateUrl: 'app/admin/news/news.create/newsCreate.tpl.html'
          }
        }
      })
      .state('admin.news', {
        url: '/news/list',
         views: {
          'content@admin': {
            controller: 'NewsListCtrl',
            templateUrl: 'app/admin/news/newsList.tpl.html'
          }
        }
      })
      .state('admin.recruitmentStatus', {
        url: '/recruitment',
        views: {
          'content@admin': {
            controller: 'RecruitmentCtrl',
            templateUrl: 'app/admin/recruitment/recruitment.tpl.html'
          }
        }
      })
      .state('admin.addRaid', {
        url: '/raids',
         views: {
          'content@admin': {
            controller: 'AddRaidCtrl',
            templateUrl: 'app/admin/raids/addRaid.tpl.html'
          }
        }
      });
}

  angular
    .module('topshelf.admin')
    .config(config);
})();
