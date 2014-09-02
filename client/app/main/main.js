(function() {

'use strict';

  function config ($stateProvider) {
    $stateProvider
        .state('main', {
          url: '/',
          templateUrl: 'app/main/main.tpl.html',
          controller: 'MainCtrl',
          controllerAs: 'vm'
        });
    }

angular
  .module('app')
  .config(config);
})();