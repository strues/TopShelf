(function() {
  'use strict';

  /* @ngdoc object
   * @name app.admin
   * @description
   * Module for admin things
   */
  angular
    .module('app.admin', ['app.core', 'app.components'])
    .config(configure);

  configure.$inject = ['$stateProvider'];

  function configure($stateProvider) {
    $stateProvider
      .state('admin', {
        title: 'Admin - TSG Admin',
        url: '/admin',
        authorize: 'admin',
        views: {
          'main@': {
            templateUrl: 'app/admin/admin.html',
            controller: 'AdminDashboardCtrl',
            controllerAs: 'vm'
          },
          'workspace@admin': {
            template: '<ui-view="workspace" />',
            controller: 'AdminDashboardCtrl'
          }
        }
      })
      .state('admin.dashboard', {
        title: 'Dashboard - TSG Admin',
        url: '/dashboard',
        views: {
          'workspace@admin': {
            templateUrl: 'app/admin/dashboard/admin-dashboard.html',
            controller: 'AdminDashboardCtrl',
            controllerAs: 'dash'
          }
        }
      })
      .state('admin.media', {
        url: '/media',
        views: {
          'workspace@admin': {
            templateUrl: 'app/admin/media/media.html',
            controller: 'MediaController'
          }
        }
      })
      .state('admin.users', {
        url: '/users',
        views: {
          'workspace@admin': {
            templateUrl: 'app/admin/users/users.html',
            controller: 'UserCtrl as uctrl'
          }
        }
      })
      .state('admin.news', {
        title: 'Article List - TSG Admin',
        url: '/news',
        views: {
          'workspace@admin': {
            templateUrl: 'app/admin/news/listing.html',
            controller: 'NewsListingCtrl',
            controllerAs: 'nlc',
            resolve: { /* @ngInject */
              articles: function(articleSvc) {
                return articleSvc.all();
              }
            }
          }
        }
      })
      .state('admin.news.create', {
        title: 'Article Composer - TSG Admin',
        url: '/create',
        views: {
          'workspace@admin': {
            templateUrl: 'app/admin/news/create/create.html',
            controller: 'NewsCreateCtrl',
            controllerAs: 'ncc'
          }
        }
      })
      .state('admin.news.article', {
        url: '/:id',
        views: {
          'workspace@admin': {
            templateUrl: 'app/admin/news/article/article.html',
            controller: 'EditArticleCtrl',
            controllerAs: 'eac',
            resolve: { /* @ngInject */
              article: function($stateParams, articleSvc) {
                return articleSvc.get($stateParams.id);
              }
            }
          }
        }
      })
      .state('admin.recruitment', {
        title: 'Recruitment - TSG Admin',
        url: '/recruit',
        views: {
          'workspace@admin': {
            templateUrl: 'app/admin/recruit/recruitment.html',
            controller: 'RecruitmentCtrl as recruit'
          }
        }
      });
  }
}());
