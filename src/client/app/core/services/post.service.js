(function () {
    'use strict';
    /**
     * @ngdoc Service
     * @name Post
     * @desc Communicates with backend returning posts
     * @memberOf app.core.services
     */
    angular
        .module('app.core')
        .factory('Post', Post);
    /* @ngInject */
    function Post($http) {
        var urlBase = 'api/posts';
        var service = {
            all: all,
            get: get,
            create: create,
            update: update,
            destroy: destroy
        };
        return service;

        function all() {
            return $http.get(urlBase);
        }
        function get(id) {
            return $http.get(urlBase + '/' + id);
        }
        function create(postData) {
            return $http.post(urlBase, postData);
        }
        function update(id, postData) {
            return $http.put(urlBase + '/' + id, postData);
        }
        function destroy(id) {
            return $http.delete(urlBase + '/' + id);
        }

    }
}());
