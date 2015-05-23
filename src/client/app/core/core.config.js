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
      clientId: '100095293840-2um3nivdsb64d33c34tf9f64pbf8977t.apps.googleusercontent.com'
    });

    $authProvider.twitter({
      url: '/auth/twitter'
    });

    $authProvider.github({
      clientId: '9ff097299c86e524b10f'
    }); //

    $authProvider.oauth2({
      name: 'battlenet',
      url: '/auth/battlenet',
      clientId: '5m653qcbnr4h6rue7e4e4k7ryvcnpa9p',
      authorizationEndpoint: 'https://us.battle.net/oauth/authorize',
      redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
      scope: ['wow.profile'],
      scopeDelimiter: ' ',
      requiredUrlParams: ['scope'],
      display: 'popup',
      type: '2.0',
      popupOptions: { width: 452, height: 633 }
    });
  }

  authRun.$inject = ['$rootScope', '$location', '$auth'];

  function authRun($rootScope, $location, $auth) {
     $rootScope.$on('$stateChangeStart', function (event, next) {
      $auth.isAuthenticated(function (loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/account/login');
        }
      });
    });
  }

}());
