'use strict';

angular.module('app')
.config(function($stateProvider) {
  
  $stateProvider
    // route to show our basic form (/form)
    .state('application', {
      url: '/application',
      templateUrl: 'app/application/application.tpl.html',
      controller: 'ApplicationCtrl'
    });
});
