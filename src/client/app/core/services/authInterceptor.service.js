(function () {
    'use strict';
    /**
     * @ngdoc service
     * @name authInterceptor
     * @description
     * This interceptor will make sure that, after each $http request
     * if the user doesn't have access to something runs the according
     * event, given the response status codes from the server.
     *
     */
    angular.module('app.core.services').factory('authInterceptor', authInterceptor);
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
            // Intercept 401s and redirect you to account-login
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/');
                    // remove any stale tokens
                    delete $localStorage.token;
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            }
        };
    }
}());