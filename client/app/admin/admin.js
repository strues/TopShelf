'use strict';

angular.module('guildApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .state('admin.dashboard', {
        url: '',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .state('application_list', { 
        url: "/admin/applications", 
        templateUrl: 'app/admin/application/list.html', 
        controller: 'ApplicationListCtrl' 
      })
      .state('application_edit', {
         url: "/admin/applications/edit", 
         templateUrl: 'app/admin/application/edit.html', 
         controller: 'ApplicationEditCtrl' 
       })
      .state('application_edit_id', { 
        url: "/admin/applications/edit/:id", 
        templateUrl: 'app/admin/application/edit.html', 
        controller: 'ApplicationEditCtrl' 
      });
    
  });