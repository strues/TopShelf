(function () {
  'use strict';

  /* @ngdoc object
   * @name admin
   * @requires $stateProvider
   *
   * @description
   *
   */

  angular
    .module('topshelf.admin')
    .config(config);

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
          'sidebar@admin': {
            controller: 'AdminSidebarCtrl',
            templateUrl: 'admin/sidebar.tpl.html'
          },
          'content@admin': {
            controller: 'AdminDashboardCtrl',
            templateUrl: 'admin/dashboard.tpl.html'
          }
        }
      })
      .state('admin.recruitment', {
        url: '/recruitment',
        views: {
          'sidebar@admin': {
            controller: 'AdminSidebarCtrl',
            templateUrl: 'admin/sidebar.html'
          },
          'content@admin': {
            controller: 'RecruitmentCtrl',
            templateUrl: 'admin/recruitment/recruitment.tpl.html'
          }
        }
      })
      .state('admin.applications', {
        url: '/applications',
        views: {
          'sidebar@admin': {
            controller: 'AdminSidebarCtrl',
            templateUrl: 'admin/sidebar.tpl.html'
          },
          'content@admin': {
            controller: 'ApplicationListCtrl',
            templateUrl: 'admin/guildApps/applicationsList.tpl.html'
          }
        }
      })
      .state('admin.applicationEdit', {
         url: "/applications/edit",
          views: {
          'sidebar@admin': {
            controller: 'AdminSidebarCtrl',
            templateUrl: 'admin/sidebar.tpl.html'
          },
          'content@admin': {
            controller: 'ApplicationEditCtrl',
            templateUrl: 'admin/guildApps/applicationEdit.tpl.html',
          }
        }
       })
      .state('admin.applicationEditID', {
        url: "/applications/edit/:id",
         views: {
          'sidebar@admin': {
            controller: 'AdminSidebarCtrl',
            templateUrl: 'admin/sidebar.tpl.html'
          },
          'content@admin': {
            controller: 'ApplicationEditCtrl',
            templateUrl: 'admin/guildApps/applicationEdit.tpl.html',
          }
        }
      })
      .state('admin.news', {
        url: '/news',
         views: {
          'sidebar@admin': {
            controller: 'AdminSidebarCtrl',
            templateUrl: 'admin/sidebar.tpl.html'
          },
          'content@admin': {
            controller: 'ComposerCtrl',
            templateUrl: 'admin/news/news.tpl.html',
          }
        }


      });
}
})();
