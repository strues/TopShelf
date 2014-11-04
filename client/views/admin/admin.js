'use strict';

angular.module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {

        url: '/admin',
        authenticate: true,
        views: {
          '': {
            controller: 'AdminCtrl',
            templateUrl: 'views/admin/admin.html'
          },
          'sidebar@admin': {
            controller: 'AdminSidebarCtrl',
            templateUrl: 'views/admin/sidebar.html'
          },
          'dashboard@admin': {
            controller: 'AdminDashboardCtrl',
            templateUrl: 'views/admin/dashboard.html'
          }
        }
      })
      .state('admin.recruitment', {
        url: '/recruitment',
        views: {
          'sidebar@admin': {
            controller: 'AdminSidebarCtrl',
            templateUrl: 'views/admin/sidebar.html'
          },
          'dashboard@admin': {
            controller: 'RecruitmentCtrl',
            templateUrl: 'views/admin/recruitment/recruitment.html'
          }
        }
      })
      .state('admin.applications', {
        url: '/applications',
        views: {
          'sidebar@admin': {
            controller: 'AdminSidebarCtrl',
            templateUrl: 'views/admin/sidebar.html'
          },
          'dashboard@admin': {
            controller: 'ApplicationListCtrl',
            templateUrl: 'views/admin/applications/applicationsList.html'
          }
        }
      })
      .state('admin.applicationEdit', {
         url: "/applications/edit",
          views: {
          'sidebar@admin': {
            controller: 'AdminSidebarCtrl',
            templateUrl: 'views/admin/sidebar.html'
          },
          'dashboard@admin': {
            controller: 'ApplicationEditCtrl',
            templateUrl: 'views/admin/applications/applicationEdit.html',
          }
        }
       })
      .state('admin.applicationEditID', {
        url: "/applications/edit/:id",
         views: {
          'sidebar@admin': {
            controller: 'AdminSidebarCtrl',
            templateUrl: 'views/admin/sidebar.html'
          },
          'dashboard@admin': {
            controller: 'ApplicationEditCtrl',
            templateUrl: 'views/admin/applications/applicationEdit.html',
          }
        }
      })
      .state('admin.composer', {
        url: '/composer',
         views: {
          'sidebar@admin': {
            controller: 'AdminSidebarCtrl',
            templateUrl: 'views/admin/sidebar.html'
          },
          'dashboard@admin': {
            controller: 'ComposerCtrl',
            templateUrl: 'views/admin/composer/composer.html',
          }
        }


      });
  });
