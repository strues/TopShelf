(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.factory:authInterceptor
   *
   * @description
   *
   */
  angular
      .module('app.core')
      .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', '$cookieStore', '$location']

  function authInterceptor($rootScope, $q, $cookieStore, $location) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        var token = localStorage.getItem('topshelf_token');
        if (token && config.httpInterceptor) {
          token = config.authHeader ===
          'Authorization' ? 'Bearer ' + token : token;
          httpConfig.headers[config.authHeader] = token;
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401) {
          $location.path('/account/login');
          $cookieStore.remove('token');
        }
        return $q.reject(response);
      }
    };
  }
}());
