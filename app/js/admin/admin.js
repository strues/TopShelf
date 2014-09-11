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
              templateUrl: 'js/admin/admin.tpl.html',
              controller: 'AdminCtrl'
          })
          .state('appAdmin', {
              abstract: true,
              url: '/admin/applications',
              templateUrl: 'js/admin/applications/main.tpl.html'
          })

          .state('appAdmin.list', {
              url: '',
              templateUrl: 'js/admin/applications/appAdmin.tpl.html',
              controller: 'AppAdminListCtrl',
              view: 'adminCont'
          })
          .state('appAdmin.edit', {
              url: '/edit/{id}',
              templateUrl: 'js/admin/applications/appAdminEdit.tpl.html',
              controller: 'AppAdminEditCtrl'
          })

          .state('appAdmin.item', {
              url: '/{id}',
              templateUrl: 'js/admin/applications/appAdminItem.tpl.html',
              controller: 'AppAdminItemCtrl'
          })
          .state('recruit', {
              abstract: true,
              url: '/admin/recruit',
              templateUrl: 'js/admin/recruit/main.tpl.html'
          })
          .state('recruit.list', {
              url: '',
              templateUrl: 'js/admin/recruit/recruit.tpl.html',
              controller: 'RecruitListCtrl'
          })
          .state('recruit.edit', {
              url: '/edit/{id}',
              templateUrl: 'js/admin/recruit/recruitEdit.tpl.html',
              controller: 'RecruitEditCtrl'
          })
          .state('recruit.add', {
              url: '/add',
              templateUrl: 'js/admin/recruit/recruitEdit.tpl.html',
              controller: 'RecruitAddCtrl'
          })
          .state('recruit.item', {
              url: '/{id}',
              templateUrl: 'js/admin/recruit/recruitItem.tpl.html',
              controller: 'RecruitItemCtrl'
          })
          .state('roster', {
              abstract: true,
              url: '/admin/roster',
              templateUrl: 'js/admin/roster/main.tpl.html'
          })
          .state('roster.list', {
              url: '',
              templateUrl: 'js/admin/roster/roster.tpl.html',
              controller: 'RosterCtrl'
          })
            .state('roster.add', {
              url: '/add',
              templateUrl: 'js/admin/roster/rosterEdit.tpl.html',
              controller: 'RosterAddCtrl'
          })
          .state('roster.edit', {
              url: '/edit/{id}',
              templateUrl: 'js/admin/roster/rosterEdit.tpl.html',
              controller: 'RosterEditCtrl'
          })
          .state('roster.item', {
              url: '/{id}',
              templateUrl: 'js/admin/roster/rosterItem.tpl.html',
              controller: 'RosterItemCtrl'
          });
        
  }

  angular
    .module('app')
    .config(config);

})();