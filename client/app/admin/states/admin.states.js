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
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        controller: 'ApplicationListCtrl',
                        templateUrl: 'app/admin/states/applications/admin.applications.tpl.html'
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
                        templateUrl: 'app/admin/states/applications/details/application-details.tpl.html'
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
                        templateUrl: 'app/admin/states/news/create/admin.news-create.tpl.html'
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
                        templateUrl: 'app/admin/states/news/admin.news.tpl.html'
                    }
                }
            })
            .state('admin.newsEdit', {
                url: '/news/edit/:postId',
                views: {
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        templateUrl: 'app/admin/states/news/edit/admin.news-edit.tpl.html',
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
                        templateUrl: 'app/admin/states/recruitment/admin.recruitment.tpl.html'
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
                        templateUrl: 'app/admin/states/users/admin.users.tpl.html'
                    }
                }
            })
            .state('admin.userDetails', {
                url: '/users/details/:id',
                views: {
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        controller: 'AdminUserDetailsCtrl',
                        templateUrl: 'app/admin/states/users/details/user-details.tpl.html'
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
                        templateUrl: 'app/admin/states/resources/admin.resource.tpl.html'
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
                        templateUrl: 'app/admin/states/resources/create/admin.resources-create.tpl.html'
                    }
                }
            })
            .state('admin.resourceEdit', {
                url: '/resources/edit/:resourceId',
                views: {
                    'sidebar@admin': {
                        controller: 'AdminSidebarCtrl',
                        templateUrl: 'app/admin/adminSidebar.tpl.html'
                    },
                    'content@admin': {
                        templateUrl: 'app/admin/states/resources/edit/admin.resource-edit.tpl.html',
                        controller: function($stateParams) {
                            console.log($stateParams);
                        }
                    }
                }
            });
    }

})();
