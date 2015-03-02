(function() {
    'use strict';

    /* @ngdoc object
     * @name admin
     * @requires $stateProvider
     *
     * @description States for the admin
     *
     */
    angular
        .module('app.admin')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                authenticate: true,
                views: {
                    '': {
                        templateUrl: 'app/admin/admin.tpl.html'
                    },
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        controller: 'AdminDashboardCtrl',
                        controllerAs: 'dash',
                        templateUrl: 'app/admin/admin-dashboard/adminDashboard.tpl.html'
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
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        controller: 'ApplicationListCtrl',
                        templateUrl: 'app/admin/admin-apps/adminApps.tpl.html'
                    }
                }
            })
            .state('admin.applicationViewID', {
                url: '/applications/view/:id',
                views: {
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        controller: 'ApplicationViewCtrl',
                        templateUrl: 'app/admin/admin-apps/app.details/appDetails.tpl.html'
                    }
                }
            })
            .state('admin.newsPost', {
                url: '/news/create',
                views: {
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        controller: 'NewsCreateCtrl as vm',
                        templateUrl: 'app/admin/admin-news/news.create/newsCreate.tpl.html'
                    }
                }
            })
            .state('admin.news', {
                url: '/news/list',
                views: {
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        controller: 'NewsListCtrl as vm',
                        templateUrl: 'app/admin/admin-news/adminNews.tpl.html'
                    }
                }
            })
            .state('admin.newsEdit', {
                url: '/news/:postId/edit',
                views: {
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        templateUrl: 'app/admin/admin-news/news.edit/newsEdit.tpl.html',
                        controller: function($stateParams) {
                            console.log($stateParams);
                        }
                    }
                }
            })
            .state('admin.recruitmentStatus', {
                url: '/recruitment',
                views: {
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        controller: 'RecruitmentCtrl',
                        templateUrl: 'app/admin/admin-recruitment/adminRecruitment.tpl.html'
                    }
                }
            })
            .state('admin.users', {
                url: '/users/list',
                views: {
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        controller: 'AdminUsersCtrl',
                        templateUrl: 'app/admin/admin-users/adminUsers.tpl.html'
                    }
                }
            })
            .state('admin.userDetails', {
                url: '/users/:id/details',
                views: {
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        controller: 'AdminUserDetailsCtrl',
                        templateUrl: 'app/admin/admin-users/user.details/userDetails.tpl.html'
                    }
                }
            })
            .state('admin.resources', {
                url: '/resources',
                views: {
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        controller: 'ResourceCtrl as vm',
                        templateUrl: 'app/admin/admin-resources/adminResource.tpl.html'
                    }
                }
            })
            .state('admin.resourceCreate', {
                url: '/resources/new',
                views: {
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        controller: 'ResourceCreateCtrl as vm',
                        templateUrl: 'app/admin/admin-resources/resource.create/resourceCreate.tpl.html'
                    }
                }
            })
            .state('admin.resourceEdit', {
                url: '/resources/:resourceId/edit',
                views: {
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        templateUrl: 'app/admin/admin-resources/resource.edit/resourceEdit.tpl.html',
                        controller: function($stateParams) {
                            console.log($stateParams);
                        }
                    }
                }
            });
    }

})();
