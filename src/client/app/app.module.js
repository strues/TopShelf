(function () {
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
      'ngTouch',
      'ngAnimate',
      'ui.router',
      'ct.ui.router.extras',
      'angular-carousel',
      'mgcrea.ngStrap',
      'textAngular',
      'xeditable',
      'toastr',
      'angularFileUpload',
      'trNgGrid',
      'app.core',
      'app.account',
      'app.guild',
      'app.admin'
  ]);

  /* @ngInject */
  function run($rootScope, $state, $stateParams,
    $location, $timeout, Auth, editableOptions) {

    $rootScope.Auth = Auth;
    $rootScope.$state = $state;
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next, e, toState,
        toParams, fromState, fromParams) {

      $state.toState = toState;
      $state.toParams = toParams;
      $state.fromState = fromState;
      $state.fromParams = fromParams;

      $rootScope.$on('$stateChangeSuccess',
        function(e, toState, toParams, fromState, fromParams) {
        $timeout(function() {
          $rootScope.$emit('$stateChangeRender');
        });

      });

      if (!next.authenticate) {
        return;
      }
      Auth.isLoggedInAsync(function (loggedIn) {
        if (!loggedIn || next.role && !Auth.hasRole(next.role)) {
          $location.path('/login');
        }
      });
    });
    editableOptions.theme = 'bs3';
  }
  /* @ngInject */
  angular.module('app').run(run);
}());
