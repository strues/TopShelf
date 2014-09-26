'use strict';

angular.module('guildApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('application', {
        url: '/application',
        templateUrl: 'app/application/application.html',
        controller: 'ApplicationCtrl'
      });
  });

  /*        authenticate: true */