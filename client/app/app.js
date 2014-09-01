'use strict';

angular.module('app', [

  'ngResource',
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'mgcrea.ngStrap',
  'satellizer',
  'formly',
  'restangular',
  'angular-loading-bar'
])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $authProvider, RestangularProvider, cfpLoadingBarProvider) {
      $urlRouterProvider
      .otherwise('/');
      
      RestangularProvider.setBaseUrl('/api');
      RestangularProvider.setRestangularFields({ 
          id: '_id.$oid',
          selfLink: 'self.link'
      });

      RestangularProvider.setRequestInterceptor(function (elem, operation) {
        if (operation === "remove") {
          return null;
        }
          return elem;
      });

      RestangularProvider.setRequestInterceptor(function (elem, operation, what) {
      
      if (operation === 'put') {
      elem._id = undefined;
      return elem;
      }
      return elem;
      });
      
      $locationProvider.html5Mode(false);
      cfpLoadingBarProvider.includeSpinner = true;
      cfpLoadingBarProvider.includeBar = true;

      $authProvider.facebook({
      clientId: '657854390977827'
      });
      
      $authProvider.google({
      clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
      });
      
      $authProvider.github({
      clientId: '0ba2600b1dbdb756688b'
      });
      
      $authProvider.linkedin({
      clientId: '77cw786yignpzj'
      });
      
      $authProvider.twitter({
      url: '/auth/twitter'
      });
});