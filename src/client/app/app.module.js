(function() {
  'use strict';

  /* @ngdoc overview
   * @name app
   *
   * @description
   * Main module for the application
   *
   * @requires
   * app.core, app.common, app.account, app.guild, app.admin
   */
  angular
    .module('app', [
      'app.core',
      'app.common',

      'app.account',
      'app.guild',
      'app.admin'
    ]);

  run.$inject = ['$rootScope', '$state', '$stateParams', '$timeout'];
  /* @ngInject */
  function run($rootScope, $state, $stateParams, $timeout) {
    $rootScope.$on('$stateChangeStart',
    function(e, toState, toParams, fromState, fromParams) {
      $state.toState = toState;
      $state.toParams = toParams;
      $state.fromState = fromState;
      $state.fromParams = fromParams;
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
