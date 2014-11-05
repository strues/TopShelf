'use strict';

angular.module('app')
   .config(function ($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/guild/info',
        templateUrl: 'views/guild/guildinfo.html',
        controller: 'GuildInfoCtrl'
      });
  });
