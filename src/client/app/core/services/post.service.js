(function () {
    'use strict';
    /**
     * @ngdoc Service
     * @name Post
     * @desc Communicates with backend returning posts
     * @memberOf app.core.services
     */
    angular.module('app.core.services').factory('Post', Post);
    /* @ngInject */
    function Post($http) {
        var urlBase = 'api/posts';
        var postFactory = {};
        postFactory.all = function () {
            console.log('Getting all posts');
            return $http.get(urlBase);
        };
        postFactory.get = function (id) {
            console.log('Getting the post with this id: ' + id);
            return $http.get(urlBase + '/' + id);
        };
        postFactory.create = function (postData) {
            console.log(postData);
            return $http.post(urlBase, postData);
        };
        postFactory.update = function (id, postData) {
            console.log('Updated post' + postData);
            return $http.put(urlBase + '/' + id, postData);
        };
        postFactory.delete = function (id) {
            console.log('Deleted post' + id);
            return $http.delete(urlBase + '/' + id);
        };
        return postFactory;
    }
}());
