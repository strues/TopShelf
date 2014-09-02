'use strict';

angular.module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.tpl.html'
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
        controllerAs: 'vm'
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
    });
});