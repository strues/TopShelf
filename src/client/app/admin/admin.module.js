(function () {
  'use strict';
  /* @ngdoc object
     * @name admin
     * @requires $stateProvider
     *
     * @description States for the admin
     *
     */
  angular
    .module('app.admin', [])
    .config(config);

  config.$inject = ['$stateProvider'];
  /* @ngInject */
  function config($stateProvider) {
    $stateProvider
        .state('admin', {
          url: '/admin',
          authenticate: true,
          views: {
            'main@': {
              controller: 'DashboardCtrl',
              controllerAs: 'dash',
              templateUrl: 'app/admin/admin.tpl.html'
            },
            'content@admin': {
              controller: 'DashboardCtrl',
              templateUrl:
              'app/admin/dashboard/dashboard.tpl.html'
            }
          }
        })
        .state('admin.news', {
          url: '/news',
          views: {
            'content@admin': {
              controller: 'NewsListCtrl',
              controllerAs: 'vm',
              templateUrl: 'app/admin/news/news.tpl.html'
            }
          }
        })
        .state('admin.news.create', {
          url: '/create',
          views: {
            'content@admin': {
              controller: 'NewsCreateCtrl',
              controllerAs: 'vm',
              templateUrl: 'app/admin/news/create/new-article.tpl.html'
            }
          }
        })
        .state('admin.news.edit', {
          url: '/:articleId',
          views: {
            'content@admin': {
              templateUrl:
              'app/admin/news/edit/edit-article.tpl.html',
              controller: function ($stateParams) {
                console.log($stateParams);
              }
            }
          }
        })
        .state('admin.carousel', {
          url: '/carousel',
          views: {
            'content@admin': {
              controller: 'CarouselCtrl',
              controllerAs: 'vm',
              templateUrl: 'app/admin/carousel/carousel.tpl.html'
            }
          }
        })
        .state('admin.recruiting', {
          url: '/recruitment',
          views: {
            'content@admin': {
              controller: 'RecruitmentCtrl',
              templateUrl:
              'app/admin/recruiting/recruitment.tpl.html'
            }
          }
        })
        .state('admin.users', {
          url: '/users',
          views: {
            'content@admin': {
              controller: 'UsersCtrl',
              templateUrl: 'app/admin/users/users.tpl.html'
            }
          }
        })
        .state('admin.users.details', {
          url: '/:id',
          views: {
            'content@admin': {
              controller: 'UserDetailsCtrl',
              templateUrl: 'app/admin/users/details/user.tpl.html'
            }
          }
        })
        .state('admin.resources', {
          url: '/resources',
          views: {
            'content@admin': {
              controller: 'ResourceCtrl',
              controllerAs: 'vm',
              templateUrl: 'app/admin/resources/resources.tpl.html'
            }
          }
        })
        .state('admin.resources.create', {
          url: '/create',
          views: {
            'content@admin': {
              controller: 'ResourceCreateCtrl',
              controllerAs: 'vm',
              templateUrl: 'app/admin/resources/create/create.tpl.html'
            }
          }
        })
        .state('admin.resources.edit', {
          url: '/:resourceId',
          views: {
            'content@admin': {
              templateUrl: 'app/admin/resources/edit/edit.tpl.html',
              controller: function ($stateParams) {
                console.log($stateParams);
              }
            }
          }
        })
        .state('admin.media', {
          url: '/media',
          views: {
            'content@admin': {
              controller: 'MediaCtrl',
              controllerAs: 'vm',
              templateUrl: 'app/admin/media/media.tpl.html'
            }
          }
        });
  }
}());
