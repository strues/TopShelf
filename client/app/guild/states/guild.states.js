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
            url: '/guild/recruitment',
            templateUrl: 'app/guild/states/recruitment/guild.recruitment.tpl.html',
            controller: 'RecruitmentCtrl as recruitment'
      })
       .state('apply', {
            url: '/guild/application',
            templateUrl: 'app/guild/states/application/guild.application.tpl.html',
            controller: 'ApplicationCtrl',
            authenticate: true
      })
       .state('roster', {
            url: '/guild/roster',
            templateUrl: 'app/guild/states/roster/guild.roster.tpl.html',
            controller: 'GuildRosterCtrl as roster'
       })
       .state('streams', {
            url: '/guild/streams',
            templateUrl: 'app/guild/states/streams/guild.streams.tpl.html',
            controller: 'StreamCtrl as vm'
      });
    }
    angular
        .module('topshelf.guild.states')
        .config(config);
})();
