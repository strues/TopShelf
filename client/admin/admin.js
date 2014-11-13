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
          // 'sidebar@admin': {
          //   controller: 'AdminSidebarCtrl',
          //   templateUrl: 'admin/sidebar.tpl.html'
          // },
          'content@admin': {
            controller: 'AdminDashboardCtrl',
            templateUrl: 'admin/dashboard.tpl.html'
          }
        }
      })
      .state('admin.recruitmentStatus', {
        url: '/recruitment',
        views: {
          // 'sidebar@admin': {
          //   controller: 'AdminSidebarCtrl',
          //   templateUrl: 'admin/sidebar.tpl.html'
          // },
            '': {
            controller: 'AdminCtrl',
            templateUrl: 'admin/admin.tpl.html'
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
          // 'sidebar@admin': {
          //   controller: 'AdminSidebarCtrl',
          //   templateUrl: 'admin/sidebar.tpl.html'
          // },
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
          // 'sidebar@admin': {
          //   controller: 'AdminSidebarCtrl',
          //   templateUrl: 'admin/sidebar.tpl.html'
          // },
          'content@admin': {
            controller: 'ApplicationViewCtrl',
            templateUrl: 'admin/guildApps/applicationView.tpl.html',
          }
        }
       })
      .state('admin.applicationViewID', {
        url: '/applications/view/:id',
         views: {
          // 'sidebar@admin': {
          //   controller: 'AdminSidebarCtrl',
          //   templateUrl: 'admin/sidebar.tpl.html'
          // },
            '': {
            controller: 'AdminCtrl',
            templateUrl: 'admin/admin.tpl.html'
          },
          'content@admin': {
            controller: 'ApplicationViewCtrl',
            templateUrl: 'admin/guildApps/applicationView.tpl.html',
          }
        }
      })
      .state('admin.news', {
        url: '/news',
         views: {
          // 'sidebar@admin': {
          //   controller: 'AdminSidebarCtrl',
          //   templateUrl: 'admin/sidebar.tpl.html'
          // },
            '': {
            controller: 'AdminCtrl',
            templateUrl: 'admin/admin.tpl.html'
          },
          'content@admin': {
            controller: 'NewsCtrl',
            templateUrl: 'admin/news/news.tpl.html',
          }
        }
      })
      .state('admin.newsList', {
        url: '/news/list',
         views: {
          // 'sidebar@admin': {
          //   controller: 'AdminSidebarCtrl',
          //   templateUrl: 'admin/sidebar.tpl.html'
          // },
            '': {
            controller: 'AdminCtrl',
            templateUrl: 'admin/admin.tpl.html'
          },
          'content@admin': {
            controller: 'NewsListCtrl',
            templateUrl: 'admin/news/newsList.tpl.html',
          }
        }
      })
      .state('admin.addRaid', {
        url: '/raids',
         views: {
          // 'sidebar@admin': {
          //   controller: 'AdminSidebarCtrl',
          //   templateUrl: 'admin/sidebar.tpl.html'
          // },
            '': {
            controller: 'AdminCtrl',
            templateUrl: 'admin/admin.tpl.html'
          },
          'content@admin': {
            controller: 'AddRaidCtrl',
            templateUrl: 'admin/raids/addRaid.tpl.html',
          }
        }
      });
}
})();
