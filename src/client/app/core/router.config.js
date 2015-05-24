(function() {

  'use strict';

  angular.module('app.core')
    .config(configuration)
    .run(routingEvents);

  configuration.$inject = ['$urlRouterProvider', '$locationProvider',
    '$httpProvider', '$sceProvider'
  ];
  /* @ngInject */
  function configuration($urlRouterProvider, $locationProvider,
    $httpProvider, $sceProvider) {

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
      enabled: true
    }).hashPrefix('!');
    $sceProvider.enabled(false);
    $httpProvider.interceptors.push('authInterceptor');
  }

  routingEvents.$inject = ['$rootScope', '$location', '$auth'];
  /* @ngInject */
  function routingEvents($rootScope, $auth, $location) {
    //on routing error
    $rootScope.$on('$stateNotFound',
      function(event, unfoundState, fromState) {
        //do some logging and toasting
      });

    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (next && next.$$route && next.$$route.secure &&
        !$auth.isAuthenticated()) {
        $rootScope.authPath = $location.path();
        $rootScope.$evalAsync(function() {
          // send user to login
          $location.path('/account/login');
        });
      }
    });

    //on routing error
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        //do some title setting
        $rootScope.pageTitle = toState.title || 'app';
      });
  }

}());
