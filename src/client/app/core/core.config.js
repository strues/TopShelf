(function() {

  angular
    .module('app.core')
    .config(configure)
    .run(authRun);

  configure
    .$inject = ['$urlRouterProvider', '$httpProvider', '$locationProvider'];
  /* @ngInject */
  function configure($urlRouterProvider, $httpProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true).hashPrefix('!');
    $httpProvider.interceptors.push('authInterceptor');
    // Enable CORS
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

  }

  authRun.$inject = ['$rootScope', '$location', 'Auth'];

  function authRun($rootScope, $location, Auth) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });

      if (!next.hasPermission) return false;

      Auth.hasPermission(next.hasPermission, function(hasPermission) {
        if (!hasPermission) {
          $location.path('/login');
        }
      });
    });
  }

}());
