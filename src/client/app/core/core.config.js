(function () {
  'use strict';
  /**
   * @ngdoc object
   * @name core.config:cfg
   *
   * @requires ($urlRouterProvider, $locationProvider, $authProvider)
   * @propertyOf app
   *
   * @description
   * Configuration block for the app
   */

  angular
      .module('app.core')
      .config(authConfig)
      .run(authRun);

  authConfig.$inject = ['$authProvider'];

  function authConfig($authProvider) {
    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth/signup';
    $authProvider.tokenPrefix = 'topshelf'; // Local Storage name prefix
    $authProvider.storage = 'sessionStorage';
    $authProvider.facebook({
      clientId: '360173197505650'
    });

    $authProvider.google({
      clientId: '362136322942-k45h52q3uq56dc1gas1f52c0ulhg5190.apps.googleusercontent.com'
    });

    $authProvider.twitter({
      url: '/auth/twitter'
    });

    $authProvider.github({
      clientId: '9ff097299c86e524b10f'
    });
  }

  authRun.$inject = ['$rootScope', '$location', '$auth'];

  function authRun($rootScope, $location, $auth) {
    $rootScope.$on('$routeChangeStart', function(event, next) {
      if (next && next.$$route && next.$$route.secure &&
        !$auth.isAuthenticated()) {
        $rootScope.authPath = $location.path();

        $rootScope.$evalAsync(function() {
          // send user to login
          $location.path('/account/login');
        });
      }
    });
  }

}());
