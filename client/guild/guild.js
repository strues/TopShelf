(function () {
  'use strict';

  /* @ngdoc object
   * @name guild
   * @requires $stateProvider
   *
   * @description
   *
   */

  angular
    .module('topshelf.guild')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('guildinfo', {
        url: '/guild/info',
        templateUrl: 'guild/info/info.tpl.html',
        controller: 'InfoCtrl'
      })
      .state('guildrecruitment', {
        url: '/guild/recruitment',
        templateUrl: 'guild/recruitment/recruitment.tpl.html',
        controller: 'RecruitmentCtrl as recruitment'
      })
      .state('raidlist', {
        url: '/guild/raids',
        templateUrl: 'guild/raid/raidList.tpl.html',
        controller: 'RaidListCtrl'
      })
      .state('raidView', {
        url: '/guild/raids/:id',
        templateUrl: 'guild/raid/viewRaid.tpl.html',
        controller: 'RaidViewCtrl'
      })

      .state('apply', {
        url: '/guild/apply',
        templateUrl: 'guild/recruitment/application/application.tpl.html',
        controller: 'ApplicationCtrl'
      });
  }

})();
