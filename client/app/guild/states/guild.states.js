(function () {
    'use strict';

  /* @ngdoc object
   * @name guild
   * @requires $stateProvider
   *
   * @description
   *
   */
    function config($stateProvider) {
        $stateProvider
        .state('guildrecruitment', {
            url: '/recruitment',
            templateUrl: 'app/guild/states/recruitment/guild.recruitment.tpl.html',
            controller: 'RecruitmentCtrl as recruitment'
      })
       .state('apply', {
            url: '/apply',
            templateUrl: 'app/guild/states/application/guild.application.tpl.html',
            controller: 'ApplicationCtrl',
            authenticate: true
      })
       .state('streams', {
            url: '/streams',
            templateUrl: 'app/guild/states/streams/guild.streams.tpl.html',
            controller: 'StreamCtrl as vm'
      });
    }
    angular
        .module('topshelf.guild.states')
        .config(config);
})();
