(function () {
  'use strict';

angular
  .module('topshelf.core')
  .factory('PostFactory', PostFactory);

  function PostFactory ($http) {
     console.log('post.service.js');

    var urlBase = 'api/posts';
        var exports = {};

    exports.getAllPosts = function(){
      return $http.get('/api/posts');
    };

    exports.getPostById = function(postId){
      return $http.get(urlBase + postId);
    };

    exports.createPost = function(newPost){
      return $http.post(urlBase, newPost);
    };

    exports.updatePost = function(updatedPost){
      return $http.put(urlBase + updatedPost._id, updatedPost);
    };

    exports.removePost = function(postId){
      return $http.delete(urlBase + postId);
    };
    return exports;

  }
})();
