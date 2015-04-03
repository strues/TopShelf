(function () {
    'use strict';
    /* @ngdoc object
     * @name admin
     * @requires $stateProvider
     *
     * @description States for the admin
     *
     */
    angular.module('app.admin').config(config);
    function config($stateProvider) {
        $stateProvider.state('admin', {
            url: '/admin',
            views: {
                'main@': {
                    controller: 'AdminDashboardCtrl',
                    controllerAs: 'dash',
                    templateUrl: 'app/admin/admin.tpl.html'
                },
                'content@admin': {
                    controller: 'AdminDashboardCtrl',
                    templateUrl: 'app/admin/admin-dashboard/adminDashboard.tpl.html'
                },
                'progression@admin': {
                    controller: 'ProgressionCtrl',
                    templateUrl: 'app/admin/admin-progression/adminProgression.tpl.html',
                    resolve: {
                        progression: function($http) {
                            // $http returns a promise for the url data
                            return $http({method: 'GET', url: '/api/progression'});
                        }
                    }
                }
            }
        }).state('admin.applications', {
            url: '/applications',
            views: {
                'content@admin': {
                    controller: 'ApplicationListCtrl',
                    templateUrl: 'app/admin/admin-apps/adminApps.tpl.html',
                    resolve: {
                        applications: function($http) {
                            // $http returns a promise for the url data
                            return $http({method: 'GET', url: '/api/applications'});
                        }
                    }
                }
            }
        }).state('admin.applicationViewID', {
            url: '/applications/view/:id',
            views: {
                'content@admin': {
                    controller: 'ApplicationViewCtrl',
                    templateUrl: 'app/admin/admin-apps/app.details/appDetails.tpl.html'
                }
            }
        }).state('admin.newsPost', {
            url: '/news/create',
            views: {
                'content@admin': {
                    controller: 'NewsCreateCtrl as vm',
                    templateUrl: 'app/admin/admin-news/news.create/newsCreate.tpl.html'
                }
            }
        }).state('admin.news', {
            url: '/news/list',
            views: {
                'content@admin': {
                    controller: 'NewsListCtrl as vm',
                    templateUrl: 'app/admin/admin-news/adminNews.tpl.html'
                }
            }
        }).state('admin.newsEdit', {
            url: '/news/:postId/edit',
            views: {
                'content@admin': {
                    templateUrl: 'app/admin/admin-news/news.edit/newsEdit.tpl.html',
                    controller: function ($stateParams) {
                        console.log($stateParams);
                    }
                }
            }
        }).state('admin.carousel', {
            url: '/carousel',
            views: {
                'content@admin': {
                    controller: 'AdminCarouselCtrl as vm',
                    templateUrl: 'app/admin/admin-carousel/adminCarousel.tpl.html'
                }
            }
        }).state('admin.recruitmentStatus', {
            url: '/recruitment',
            views: {
                'content@admin': {
                    controller: 'RecruitmentCtrl',
                    templateUrl: 'app/admin/admin-recruitment/adminRecruitment.tpl.html'
                }
            }
        }).state('admin.users', {
            url: '/users/list',
            views: {
                'content@admin': {
                    controller: 'AdminUsersCtrl',
                    templateUrl: 'app/admin/admin-users/adminUsers.tpl.html'
                }
            }
        }).state('admin.userDetails', {
            url: '/users/:id/details',
            views: {
                'content@admin': {
                    controller: 'AdminUserDetailsCtrl',
                    templateUrl: 'app/admin/admin-users/user.details/userDetails.tpl.html'
                }
            }
        }).state('admin.resources', {
            url: '/resources',
            views: {
                'content@admin': {
                    controller: 'ResourceCtrl as vm',
                    templateUrl: 'app/admin/admin-resources/adminResource.tpl.html'
                }
            }
        }).state('admin.resourceCreate', {
            url: '/resources/new',
            views: {
                'content@admin': {
                    controller: 'ResourceCreateCtrl as vm',
                    templateUrl: 'app/admin/admin-resources/resource.create/resourceCreate.tpl.html'
                }
            }
        }).state('admin.resourceEdit', {
            url: '/resources/:resourceId/edit',
            views: {
                'content@admin': {
                    templateUrl: 'app/admin/admin-resources/resource.edit/resourceEdit.tpl.html',
                    controller: function ($stateParams) {
                        console.log($stateParams);
                    }
                }
            }
        }).state('admin.media', {
            url: '/media',
            views: {
                'content@admin': {
                    controller: 'MediaCtrl as vm',
                    templateUrl: 'app/admin/admin-media/adminMedia.tpl.html'
                }
            }
        });
    }
}());
