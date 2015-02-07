(function () {
    'use strict';

  /**
   * @ngdoc service
   * @name authInterceptor
   * @description Intercepts $http requests checking for auth token
   *
   */

    angular
      .module('app.core.services')
      .factory('authInterceptor', authInterceptor);

                              /* @ngInject */
    function authInterceptor($rootScope, $q, $localStorage, $location) {

        return {
      // Add authorization token to headers
      request: function (config) {
          config.headers = config.headers || {};
          if ($localStorage.token) {
              config.headers.Authorization = 'Bearer ' + $localStorage.token;
          }
          return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
          if (response.status === 401) {
              $location.path('/');
          // remove any stale tokens
              delete $localStorage.token;
              return $q.reject(response);
        }
          else {
              return $q.reject(response);
          }
      }
    };
    }

})();
