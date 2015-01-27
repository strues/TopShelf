(function () {
    'use strict';
  /**
   * @ngdoc Service
   * @name Post
   * @desc Communicates with backend returning posts
   * @memberOf topshelf.core.services
   */

    angular
        .module('topshelf.core.services')
        .factory('Post', Post);

    /* @ngInject */
    function Post ($http) {
        console.log('Post Factory: topshelf.core.services');

        var urlBase = 'api/posts';
        var postFactory = {};

        postFactory.all = function () {
            console.log('Getting all posts');
            return $http.get(urlBase);
        };

        postFactory.get = function(id) {
            console.log('Getting this ' + id);
            return $http.get(urlBase + '/' + id);
        };

        postFactory.create = function(postData) {
            console.log(postData);
            return $http.post(urlBase, postData);
        };

        postFactory.update = function(id, postData) {
            return $http.put(urlBase + '/' + id, postData);
        };

        postFactory.delete = function(id) {
            return $http.delete(urlBase + '/' + id);
        };

        return postFactory;

    }

})();
