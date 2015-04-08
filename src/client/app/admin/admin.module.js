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
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
        .state('admin', {
            url: '/admin',
            views: {
                  'main@': {
                      controller: 'DashboardController',
                      controllerAs: 'dash',
                      templateUrl: 'app/admin/admin.tpl.html'
                  },
                  'content@admin': {
                      controller: 'DashboardController',
                      templateUrl:
                      'app/admin/dashboard/dashboard.tpl.html'
                  },
                  'progression@admin': {
                      controller: 'ProgressionCtrl',
                      templateUrl:
                      'app/admin/progression/adminProgression.tpl.html',
                      resolve: {
                          progression: function ($http) {
                              // $http returns a promise for the url data
                              return $http({
                                  method: 'GET',
                                  url: '/api/progression'
                              });
                          }
                      }
                  }
              }
        })
        .state('admin.applications', {
            url: '/applications',
            views: {
                'content@admin': {
                    controller: 'ApplicationListController',
                    templateUrl: 'app/admin/applications/app-list.tpl.html',
                    resolve: {
                        applications: function ($http) {
                            // $http returns a promise for the url data
                            return $http({
                                method: 'GET',
                                url: '/api/applications'
                            });
                        }
                    }
                }
            }
        })
        .state('admin.applications.app', {
            url: '/:id',
            views: {
                'content@admin': {
                    controller: 'ApplicationViewController',
                    templateUrl: 'app/admin/applications/details/app.tpl.html'
                }
            }
        })
        .state('admin.news', {
            url: '/news',
            views: {
                'content@admin': {
                    controller: 'NewsListController as vm',
                    templateUrl: 'app/admin/news/news.tpl.html'
                }
            }
        })
        .state('admin.news.create', {
            url: '/create',
            views: {
                'content@admin': {
                    controller: 'NewsCreateController as vm',
                    templateUrl: 'app/admin/news/create/new-post.tpl.html'
                }
            }
        })
        .state('admin.news.edit', {
            url: '/:postId',
            views: {
                'content@admin': {
                    templateUrl:
                    'app/admin/news/edit/edit-post.tpl.html',
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
                    controller: 'CarouselController',
                    controllerAs: 'vm',
                    templateUrl: 'app/admin/carousel/carousel.tpl.html'
                }
            }
        })
        .state('admin.recruiting', {
            url: '/recruitment',
            views: {
                'content@admin': {
                    controller: 'RecruitmentController',
                    templateUrl:
                    'app/admin/recruiting/recruitment.tpl.html'
                }
            }
        })
        .state('admin.users', {
            url: '/users',
            views: {
                'content@admin': {
                    controller: 'UsersController',
                    templateUrl: 'app/admin/users/users.tpl.html'
                }
            }
        })
        .state('admin.users.details', {
            url: '/:id',
            views: {
                'content@admin': {
                    controller: 'UserDetailsController',
                    templateUrl: 'app/admin/users/details/user.tpl.html'
                }
            }
        })
        .state('admin.resources', {
            url: '/resources',
            views: {
                'content@admin': {
                    controller: 'ResourceController as vm',
                    templateUrl: 'app/admin/resources/resources.tpl.html'
                }
            }
        })
        .state('admin.resources.create', {
            url: '/create',
            views: {
                'content@admin': {
                    controller: 'ResourceCreateController',
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
                    controller: 'MediaController as vm',
                    templateUrl: 'app/admin/media/media.tpl.html'
                }
            }
        });
    }
}());
