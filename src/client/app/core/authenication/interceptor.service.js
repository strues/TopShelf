(function() {
  /**
   * @ngdoc service
   * @name app.core.service: authInterceptor
   * @description < description placeholder >
   */

  angular
    .module('app.core')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', '$cookies', '$sessionStorage', '$location'];
  /* @ngInject */
  function authInterceptor($rootScope, $q, $cookies, $sessionStorage, $location) {

    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' +
            $sessionStorage.token;
        } else if ($cookies.token) {
          config.headers.Authorization = 'Bearer ' +
                      $cookies.get('token');
        }
        return config;
      },
      // Intercept 401s and redirect you to account-login
      responseError: function(response) {
        if (response.status === 401) {
          $location.path('/');
          // remove any stale tokens
          delete $sessionStorage.token;
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }
}());
