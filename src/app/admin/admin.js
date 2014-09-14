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
  function config($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
      $urlRouterProvider
          .otherwise('/admin/dashboard');
      $stateProvider
          .state('admin', {
              abstract: true,
              url: '/admin',
              templateUrl: 'app/admin/adminShell.tpl.html'
          })
          .state('admin.dashboard', {
              url: '/dashboard',
              templateUrl: 'app/admin/dashboard.tpl.html',
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
              controller: 'AppAdminListCtrl'
          })
          .state('appAdmin.edit', {
              url: '/edit/{id}',
              templateUrl: 'app/admin/applications/appAdminEdit.tpl.html',
              controller: 'AppAdminEditCtrl'
          })

          .state('appAdmin.item', {
              url: '/{id}',
              templateUrl: 'app/admin/applications/appAdminItem.tpl.html',
              controller: 'AppAdminItemCtrl'
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
          })
          .state('roster', {
              abstract: true,
              url: '/admin/roster',
              templateUrl: 'app/admin/roster/main.tpl.html'
          })
          .state('roster.list', {
              url: '',
              templateUrl: 'app/admin/roster/roster.tpl.html',
              controller: 'RosterCtrl'
          })
            .state('roster.add', {
              url: '/add',
              templateUrl: 'app/admin/roster/rosterEdit.tpl.html',
              controller: 'RosterAddCtrl'
          })
          .state('roster.edit', {
              url: '/edit/{id}',
              templateUrl: 'app/admin/roster/rosterEdit.tpl.html',
              controller: 'RosterEditCtrl'
          })
          .state('roster.item', {
              url: '/{id}',
              templateUrl: 'app/admin/roster/rosterItem.tpl.html',
              controller: 'RosterItemCtrl'
          });
  }

  angular
    .module('app')
    .config(config);

})();