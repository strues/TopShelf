'use strict';

angular.module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.tpl.html',
        controller: 'AdminCtrl'
      })
     .state('appAdmin', {
        url: '/admin/applications',
        templateUrl: 'app/admin/applications/appAdmin.tpl.html',
        controller: 'AppAdminCtrl'
      });
  });