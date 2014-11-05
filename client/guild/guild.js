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
      .state('apply', {
        url: '/guild/apply',
        templateUrl: 'guild/recruitment/application/application.tpl.html',
        controller: 'ApplicationCtrl'
      });
  }

})();
