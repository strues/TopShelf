'use strict';

angular.module('guildApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('inbox', {
        url: '/inbox',
        templateUrl: 'app/account/inbox/inbox.html',
        controller: 'InboxCtrl'
      });
  });