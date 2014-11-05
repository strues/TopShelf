'use strict';

angular.module('app')
   .config(function ($stateProvider) {
    $stateProvider
      .state('recruitment', {
        url: '/guild/recruitment',
        templateUrl: 'views/recruitment/recruitment.html',
        controller: 'RecruitmentCtrl'
      });
  });
