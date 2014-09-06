(function () {
  'use strict';

  /* @ngdoc object
   * @name admin
   * @requires $stateProvider
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function config($stateProvider) {
      $stateProvider
          .state('admin', {
              url: '/admin',
              templateUrl: 'admin/admin.tpl.html',
              controller: 'AdminCtrl'
          })
          .state('appAdmin', {
              abstract: true,
              url: '/admin/applications',
              templateUrl: 'admin/applications/main.tpl.html'
          })

          .state('appAdmin.list', {
              url: '',
              templateUrl: 'admin/applications/appAdmin.tpl.html',
              controller: 'AppAdminListCtrl',
              view: 'adminCont'
          })
          .state('appAdmin.edit', {
              url: '/edit/{id}',
              templateUrl: 'admin/applications/appAdminEdit.tpl.html',
              controller: 'AppAdminEditCtrl'
          })

          .state('appAdmin.item', {
              url: '/{id}',
              templateUrl: 'admin/applications/appAdminItem.tpl.html',
              controller: 'AppAdminItemCtrl'
          })
          .state('recruit', {
              abstract: true,
              url: '/admin/recruit',
              templateUrl: 'admin/recruit/main.tpl.html'
          })
          .state('recruit.list', {
              url: '',
              templateUrl: 'admin/recruit/recruit.tpl.html',
              controller: 'RecruitListCtrl'
          })
          .state('recruit.edit', {
              url: '/edit/{id}',
              templateUrl: 'admin/recruit/recruitEdit.tpl.html',
              controller: 'RecruitEditCtrl'
          })
          .state('recruit.add', {
              url: '/add',
              templateUrl: 'admin/recruit/recruitEdit.tpl.html',
              controller: 'RecruitAddCtrl'
          })
          .state('recruit.item', {
              url: '/{id}',
              templateUrl: 'admin/recruit/recruitItem.tpl.html',
              controller: 'RecruitItemCtrl'
          });

  }

  angular
    .module('app')
    .config(config);

})();