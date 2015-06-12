(function() {
  'use strict';

  /* @ngdoc overview
   * @name app
   *
   * @description
   * Main module for the application
   *
   * @requires
   * app.core, app.components, app.account, app.guild, app.admin
   */
  angular
    .module('app', [
      'app.core',
      'app.components',

      'app.account',
      'app.guild',
      'app.admin'
    ]);

  run.$inject = ['$rootScope', '$state', '$stateParams', '$timeout'];
  /* @ngInject */
  function run($rootScope, $state, $stateParams, $timeout) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'account.logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });

    $rootScope.$on('$stateChangeSuccess',
    function(e, toState) {
      $timeout(function() {
        $rootScope.$emit('$stateChangeRender');
      });
      $rootScope.pageTitle = toState.title || 'Top Shelf';

    });
  }
  angular.module('app').run(run);
}());
