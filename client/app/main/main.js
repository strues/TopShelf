'use strict';

angular.module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.tpl.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      });
  });