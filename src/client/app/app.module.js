(function() {
  'use strict';
  /* @ngdoc overview
   * @name app
   * @description
   * Main module for the Top Shelf guild website
   *
   */
  /* @ngInject */
  angular.module('app', [
      'ngStorage',
      'ngResource',
      'ngMessages',
      'ngCookies',
      'vModal',
      'ngAnimate',
      'ui.router',
      'ui.materialize',
      'ct.ui.router.extras',
      'angular-carousel',
      'toastr',
      'angularFileUpload',
      'app.core',
      'app.account',
      'app.guild',
      'app.admin'
  ]);

  run.$inject = ['$rootScope', '$state', '$stateParams', '$timeout', 'Auth'];
  /* @ngInject */
  function run($rootScope, $state, $stateParams, $timeout, Auth) {

    $rootScope.Auth = Auth;
    $rootScope.$state = $state;
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next, e, toState,
        toParams, fromState, fromParams) {

      $state.toState = toState;
      $state.toParams = toParams;
      $state.fromState = fromState;
      $state.fromParams = fromParams;

      $rootScope.$on('$stateChangeError', function() {
        // Redirect user to our login page
        $state.go('account.login');
      });

      if (!next.authenticate) {
        return;
      }
      Auth.isLoggedInAsync(function(loggedIn) {
        if (!loggedIn || next.role && !Auth.hasRole(next.role)) {
          $state.go('account.login');
        }
      });
    });
  }
  /* @ngInject */
  angular.module('app').run(run);
}());
