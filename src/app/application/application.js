(function() {

'use strict';

  function config ($stateProvider) {
    $stateProvider
      .state('application', {
        url: '/application',
        templateUrl: 'app/application/application.tpl.html',
        controller: 'ApplicationCtrl'
      });
    }

angular
  .module('app')
  .config(config);
})();