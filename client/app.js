(function () {
  'use strict';

  /* @ngdoc object
   * @name topshelf
   * @requires $urlRouterProvider
   *
   * @description
   *
   */
angular.module('topshelf.core', []);
angular.module('topshelf.guild', []);
angular.module('topshelf.user', []);
angular.module('topshelf.admin', []);

  angular
    .module('topshelf', [
      'ngStorage',
      'ngResource',
      'ngSanitize',
      'ngAnimate',
      'btford.socket-io',
      'ui.router',
      'ui.grid',
      'ui.grid.edit',
      'ngTable',
      'ui.bootstrap',
      'textAngular',
      'formly',
      'restangular',
      'ngToast',
      'httpi',
      'ngBattleNet',
      'topshelf.core',
      'topshelf.guild',
      'topshelf.admin',
      'topshelf.user'
    ]);

  angular
    .module('topshelf')
    .config(config)
    .run(run);


  function config($urlRouterProvider, $locationProvider, RestangularProvider, $httpProvider, battleNetConfigProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

    battleNetConfigProvider.setApiKey( 'h3enxjtkv2fvgcvts4qbx878hthr9ecp' );
    battleNetConfigProvider.setDefaultRegion('us');


  }

  function run($rootScope, $state, $stateParams, $location, Auth) {




     // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/');
        }
      });
    });
  }

})();
