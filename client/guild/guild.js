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
      .state('guild', {
        abstract: true,
        url: '/guild',
        templateUrl: '<ui-view />'
      })
      .state('guild.info', {
        url: '/info',
        templateUrl: 'guild/info/info.tpl.html',
        controller: 'InfoCtrl as info'
      })
      .state('guild.recruitment', {
        url: '/recruitment',
        templateUrl: 'guild/recruitment/recruitment.tpl.html',
        controller: 'RecruitmentCtrl as recruitment'
      })
      .state('guild.application', {
        url: '/recruitment/apply',
        templateUrl: 'guild/recruitment/application/application.tpl.html',
        controller: 'ApplicationCtrl as application'
      });
  }

})();
