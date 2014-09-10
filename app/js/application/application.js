(function() {

'use strict';

  function config ($stateProvider) {
    $stateProvider
      .state('application', {
        url: '/application',
        templateUrl: 'js/application/application.tpl.html',
        controller: 'ApplicationCtrl'
      });
    }

angular
  .module('app')
  .config(config);
})();