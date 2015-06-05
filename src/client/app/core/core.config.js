(function() {

  'use strict';

  angular
    .module('app.core')
    .config(authConfig)
    .config(configure)
    .run(authRun);

  configure
    .$inject = ['$urlRouterProvider', '$locationProvider', 'toastrConfig'];
  /* @ngInject */
  function configure($urlRouterProvider, $locationProvider, toastrConfig) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true).hashPrefix('!');

    angular.extend(toastrConfig, {
      autoDismiss: true,
      closeButton: true,
      positionClass: 'toast-top-right',
      tapToDismiss: true,
      target: 'body',
      timeOut: 5000,
      titleClass: 'toast-title',
      toastClass: 'toast'
    });
  }

  authConfig.$inject = ['$authProvider'];
  /* @ngInject */
  function authConfig($authProvider) {
    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth/signup';
    $authProvider.tokenPrefix = 'topshelf'; // Local Storage name prefix
    $authProvider.storage = 'localStorage';
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
      redirectUri: window.location.origin || window.location.protocol +
        '//' + window.location.host,
      scope: ['wow.profile'],
      scopeDelimiter: ' ',
      requiredUrlParams: ['scope'],
      responseType: 'code',
      display: 'popup',
      type: '2.0',
      popupOptions: {
        width: 452,
        height: 633
      }
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
