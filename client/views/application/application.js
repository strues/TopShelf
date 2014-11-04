'use strict';

angular.module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state('application', {
        url: '/apply',
        templateUrl: 'views/application/application.html',
        controller: 'ApplicationCtrl'
      })
      .state('applicationList', {
        url: '/applications/list',
        templateUrl: 'views/application/applicationList.html',
        controller: 'ApplicationListCtrl'
       })
      .state('applicationEdit', {
         url: "/applications/edit",
         templateUrl: 'views/application/applicationEdit.html',
         controller: 'ApplicationEditCtrl'
       })
      .state('applicationEditId', {
        url: "/applications/edit/:id",
        templateUrl: 'views/application/applicationEdit.html',
        controller: 'ApplicationEditCtrl'
      });
  });
