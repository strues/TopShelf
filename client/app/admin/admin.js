'use strict';

angular.module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        templateUrl: 'app/admin/admin.tpl.html'
      })
    .state('admin.dashboard', {
        url: '',
        templateUrl: 'app/admin/adminDash.tpl.html',
        controller: 'AdminCtrl'
    })
    .state('appAdmin', {
        abstract: true,
        url: '/admin/applications',
        templateUrl: 'app/admin/applications/main.tpl.html'
    })

    .state('appAdmin.list', {
        url: '',
        templateUrl: 'app/admin/applications/appAdmin.tpl.html',
        controller: 'AppAdminListCtrl',
        view: 'adminCont'
    })
    .state('appAdmin.edit', {
        url: '/edit/{id}',
        templateUrl: 'app/admin/applications/appAdminEdit.tpl.html',
        controller: 'AppAdminEditCtrl',
        controllerAs: 'vm'
    })

    .state('appAdmin.item', {
        url: '/{id}',
        templateUrl: 'app/admin/applications/appAdminItem.tpl.html',
        controller: 'AppAdminItemCtrl',
        controllerAs: 'vm'
    })
    .state('recruit', {
        abstract: true,
        url: '/admin/recruit',
        templateUrl: 'app/admin/recruit/main.tpl.html'
    })
    .state('recruit.list', {
        url: '',
        templateUrl: 'app/admin/recruit/recruit.tpl.html',
        controller: 'RecruitListCtrl'
    })
    .state('recruit.edit', {
        url: '/edit/{id}',
        templateUrl: 'app/admin/recruit/recruitEdit.tpl.html',
        controller: 'RecruitEditCtrl'
    })
    .state('recruit.add', {
        url: '/add',
        templateUrl: 'app/admin/recruit/recruitEdit.tpl.html',
        controller: 'RecruitAddCtrl'
    })
    .state('recruit.item', {
        url: '/{id}',
        templateUrl: 'app/admin/recruit/recruitItem.tpl.html',
        controller: 'RecruitItemCtrl'
    }); 
});